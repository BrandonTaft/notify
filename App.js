import { useState, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from './src/components/Loader';
import List from './src/components/List';
import Layout from './src/components/Layout';
import Alarm from './src/components/Alarm';
import TimePicker from "./src/components/TimePicker";
import useFetch from './src/hooks/useFetch';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


export default function App() {
  const { isLoading, reminders, setRefresh, refresh } = useFetch();
  const [showPicker, setShowPicker] = useState(false);
  
    const [fontsLoaded] = useFonts({
        'Rubik-Black': require('./assets/fonts/Rubik-Black.ttf'),
        'Rubik-Bold': require('./assets/fonts/Rubik-ExtraBold.ttf'),
        'Rubik-Medium': require('./assets/fonts/Rubik-Medium.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


  return (
    <SafeAreaProvider>
      {isLoading
        ?
        <Loader />
        :
        <Layout
          reminders={reminders}
          onSucess={() => setRefresh(!refresh)}
          setShowPicker={setShowPicker}
        >
          <List
            reminders={reminders}
            onSucess={() => setRefresh(!refresh)}
          />
          <TimePicker
            setShowPicker={setShowPicker}
            showPicker={showPicker}
          />

          <StatusBar backgroundColor='#b804d1de' />
        </Layout>
      }
    </SafeAreaProvider>
  );
}