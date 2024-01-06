import { useState, useEffect, useRef } from 'react';
import { StatusBar, Modal, StyleSheet, View, Pressable, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Audio } from 'expo-av';
import Loader from './src/components/Loader';
import List from './src/components/List';
import useFetch from './src/components/useFetch';
import Header from './src/components/Header';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [sound, setSound] = useState();
  const [showAlarm, setShowAlarm] = useState(false)
  const notificationListener = useRef();
  const responseListener = useRef();
  const { isLoading, reminders, setRefresh, refresh } = useFetch();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification.request.content.body)
      console.log(notification.request.content.body)
      playSound()
      setShowAlarm(true)
     
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("SOUND ALARM")
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('./assets/alarm.wav')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (
    <SafeAreaProvider>
      {isLoading ? <Loader /> :
        <Header reminders={reminders}>
          <List
            reminders={reminders}
            expoPushToken={expoPushToken}
            onSucess={() => setRefresh(!refresh)}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={showAlarm}
            style={styles.alarmContainer}
            onRequestClose={() => {
              setShowAlarm(!showAlarm);
            }}>
            <View style={styles.alarm}>
            <Text style={{ color: 'white', fontSize: 19 }}>{notification}</Text>
              <Pressable android_ripple={
                RippleConfig = {
                  color: '#121212',
                  foreground: true,
                  borderLess: true
                }
              }
                style={styles.alarmBtn}
                onPress={() => {
                  setSound()
                  setShowAlarm(false)
                }}
              >
                <Text style={{ color: 'white', fontSize: 19 }}>complete</Text>
              </Pressable>
            </View>
          </Modal>
          <StatusBar backgroundColor='#b804d1de' />
        </Header>
      }
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  alarmContainer: {
    flex: 1
  },
  alarm: {
    backgroundColor: '#00030ae0',
    flex:.25,
    margin:20,
    borderRadius:20,
    marginTop:'auto',
    marginBottom:'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarmBtn: {
    width: 200,
    height: 60,
    backgroundColor: 'blue'
  }
})