import { useState } from 'react';
import List from './src/components/List';
import Layout from './src/components/Layout';
import TimePicker from "./src/components/TimePicker";
import useFetch from './src/hooks/useFetch';
import Loader from './src/components/Loader';
import Login from './src/screens/Login';
import Chat from './src/screens/Chat';
import Messaging from './src/screens/Messaging';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  // const {isLoading, reminders, setRefresh, refresh} = useFetch()
  // const [showPicker, setShowPicker] = useState(false);
  return (
    <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name='Chat'
            component={Chat}
            options={{
                title: "Chats",
                headerShown: false,
            }}
        />
        <Stack.Screen name='Messaging' component={Messaging} />
    </Stack.Navigator>
</NavigationContainer>
  //   <Layout
  //     setShowPicker={setShowPicker}
  //     reminders={reminders}
  //     onSuccess={() => setRefresh(!refresh)}
  //   >
  //     {isLoading ? <Loader /> :
  //     <List reminders={reminders} onSuccess={() => setRefresh(!refresh)}/>
  // }
  //     <TimePicker
  //       setShowPicker={setShowPicker}
  //       showPicker={showPicker}
  //     />
  //   </Layout>
  );
}