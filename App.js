import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider } from 'react-redux';
import store from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { StatusBar } from 'react-native';

// import ChatScreen from './src/screens/ChatScreen';
// import ProfileScreen from './src/screens/ProfileScreen';
// import ChatRoomScreen from './src/screens/ChatRoomScreen';
// import Layout from './src/components/Layout';

const Tab = createMaterialBottomTabNavigator();

export default function App() {

    return (
        <Provider store={store} >
            <StatusBar/>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="LoginScreen"
                        screenOptions={{ headerShown: false }}
                        barStyle={{ backgroundColor: '#121212' }}
                        swipeEnabled
                    >
                        <Tab.Screen
                            name='LoginScreen'
                            component={LoginScreen}
                        />

                        <Tab.Screen
                            name='HomeScreen'
                            component={HomeScreen}
                            initialParams={{ itemId: 42 }}
                        />

                        {/* <Tab.Screen
                            name='Reminder'
                            component={Reminder}
                            initialParams={{ itemId: 42 }}
                        /> */}

                        {/* <Tab.Screen
                        name='ChatScreen'
                        component={ChatScreen}
                        options={{
                            headerShown: true,
                            headerTitle: ""
                        }}
                    />
                    <Tab.Screen
                        name='ProfileScreen'
                        component={ProfileScreen}
                        options={{
                            headerShown: true,
                            headerTitle: ""
                        }} 
                    {/* <Tab.Screen
                    name='Messaging'
                    component={Messaging}
                    options={{
                        headerShown: true,
                        headerTitle: ""
                    }}
                /> */}
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}