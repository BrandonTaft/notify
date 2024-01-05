import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
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
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  
    useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  const { isLoading, reminders, setRefresh, refresh } = useFetch();
  console.log(expoPushToken)
  return (
    <SafeAreaProvider>
      {isLoading ? <Loader /> :
        <Header reminders={reminders}>
            <List
              reminders={reminders}
              onSucess={() => setRefresh(!refresh)}
            />
          <StatusBar backgroundColor='#b804d1de' />
        </Header>
      }
    </SafeAreaProvider>
  );
}
// import { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';



// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });


// // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
// // async function sendPushNotification(expoPushToken) {
// //   const message = {
// //     to: expoPushToken,
// //     sound: 'default',
// //     title: 'TIME',
// //     body: 'IS UP',
// //     data: { someData: 'goes here' },
// //   };

// //   await fetch('https://exp.host/--/api/v2/push/send', {
// //     method: 'POST',
// //     headers: {
// //       Accept: 'application/json',
// //       'Accept-encoding': 'gzip, deflate',
// //       'Content-Type': 'application/json',
// //     },
// //     body: JSON.stringify(message),
// //   });
// // }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig.extra.eas.projectId,
//     });
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token.data;
// }

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   const [time, setTime] = useState(0);
//   const [started, setStarted] = useState(true)

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//       setNotification(notification);
//     });

//     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//       console.log(response);
//     });

//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener.current);
//       Notifications.removeNotificationSubscription(responseListener.current);
//     };
//   }, []);

//   // useEffect(() => {
//   //   let intervalId
//   //   if(time>500) {
//   //     setStarted(false)
//   //     sendPushNotification(expoPushToken);
//   //   }
//   //   if (started) {
//   //       intervalId = setInterval(() => setTime(time + 1), 10);
//   //   }
//   //   return () => clearInterval(intervalId);
   
//   // }, [started,time]);
  
//   const minutes = Math.floor((time % 360000) / 6000);
//   const seconds = Math.floor((time % 6000) / 100);
//   const milliseconds = time % 100;
  
//   async function schedulePushNotification() {
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "You've got mail! 📬",
//         body: 'Here is the notification body',
//         data: { data: 'goes here' },
//       },
//       trigger: { seconds: 20 },
//     });
//   }
  

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
//       <Text>Your expo push token: {expoPushToken}</Text>
//       <Button
//         title="Press to schedule a notification"
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       />
//       <View>
//       <Text>{minutes.toString().padStart(2, "0")}</Text>
//       <Text>:</Text>
//       <Text>{seconds.toString().padStart(2, "0")}</Text>
//             <Text>{time}</Text>
//             <Text> {milliseconds.toString().padStart(2, "0")}</Text>
//         </View>
//     </View>
//   );
// }
