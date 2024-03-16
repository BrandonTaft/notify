import 'react-native-gesture-handler';
import LoginScreen from './src/screens/LoginScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatRoomScreen from './src/screens/ChatRoomScreen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeTabNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Layout from './src/components/Layout';
import DrawerNavigator from './src/navigation/DrawerNavigator';
import { Provider } from 'react-redux';
import store from './src/store/store';
import Reminder from './src/features/reminder/Reminder';

const Tab = createMaterialBottomTabNavigator();

export default function App() {

    return (
        <Provider store={store} >
            <PaperProvider>

                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="LoginScreen"
                        screenOptions={{ headerShown: false }}
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

                        <Tab.Screen
                            name='Reminder'
                            component={Reminder}
                            initialParams={{ itemId: 42 }}
                        />

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

            </PaperProvider>
        </Provider>
    );
}