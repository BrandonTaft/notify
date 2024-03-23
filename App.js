import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { StatusBar } from 'react-native';
import ChatRoomScreen from './src/screens/ChatRoomScreen';
import ChatListScreen from './src/screens/ChatListScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


export default function App() {

    function ChatListTab() {
        return (
            <Stack.Navigator initialRouteName="ChatListScreen">
                <Stack.Screen
                    name='ChatListScreen'
                    component={ChatListScreen}
                />
                <Stack.Screen
                    name="ChatRoomScreen"
                    component={ChatRoomScreen}
                />
            </Stack.Navigator>
        );
    }


    return (
        <Provider store={store} >
            <StatusBar />
            <SafeAreaProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="LoginScreen"
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

                        <Tab.Screen
                            name='ChatListTab'
                            component={ChatListTab}
                            options={{
                                headerShown: true,
                                headerTitle: "Chat Room"
                            }}
                        />
                    </Tab.Navigator>

                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}