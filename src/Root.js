import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';
import { en, registerTranslation } from 'react-native-paper-dates'
import { useSelector, useDispatch } from 'react-redux';
import { socket } from "./utils/socket";
import { addPrivateMessage } from "./redux/userSlice";
import { StatusBar, View, useColorScheme } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import ChatRoomListScreen from './screens/ChatRoomListScreen';
import ProfileScreen from './screens/ProfileScreen';
import { darkColors, lightColors } from './utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Entypo } from '@expo/vector-icons';
// import DirectMessageScreen from './screens/DirectMessageScreen';
import PrivateScreen from './screens/PrivateScreen';
import ChatRoomList from './components/chatFeature/ChatRoomList';
import { addChatRooms } from './redux/chatRoomSlice';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
registerTranslation('en', en)

export default function Root() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const LightTheme = {
        ...MD3LightTheme,
        colors: lightColors,
        roundness: 16,
        buttonRoundness: { isV3: false, roundness: 16 }
    }
    const DarkTheme = {
        ...MD3DarkTheme,
        mode: 'adaptive',
        colors: darkColors,
        roundness: 16,
        buttonRoundness: { isV3: false, roundness: 16 }
    };
    const appTheme = colorScheme === 'dark' ? DarkTheme : LightTheme;

    useEffect(() => {
        function addNewPrivateMessage({ newMessage }) {
            dispatch(addPrivateMessage(newMessage))
          }

        socket.on("newPrivateMessage", addNewPrivateMessage);

        return () => {
            socket.off("newPrivateMessage", addNewPrivateMessage);
          };
    },[socket]);

    useEffect(() => {
        function refreshRoomList(rooms) {
            dispatch(addChatRooms(rooms))
          }

        socket.on("chatRoomList", refreshRoomList);

        return () => {
            socket.off("chatRoomList", refreshRoomList);
          };
    },[socket])

    
    function TabNavigator() {
        const theme = useTheme();
        return (
            <Tab.Navigator
                initialRouteName="HomeScreen"
                swipeEnabled
                labeled={false}
                activeColor='blue'
                activeIndicatorStyle={{ backgroundColor: theme.colors.outline, borderRadius:100 }}
            >
                <Tab.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    initialParams={{ itemId: 42 }}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon name="house-user" size={30} color={theme.colors.onPrimaryContainer} />;
                        },
                    }}
                />

                <Tab.Screen
                    name='ProfileScreen'
                    component={ProfileScreen}
                    initialParams={{ itemId: 42 }}
                    options={{
                        tabBarLabel: 'Profile',
                        tabBarIcon: ({ color, size }) => {
                            return <Icon name="user" size={30} color={theme.colors.onPrimaryContainer} />;
                        },
                    }}
                />

                <Tab.Screen
                    name='ChatRoomListScreen'
                    component={ChatRoomListScreen}
                    options={{
                        headerShown: true,
                        headerTitle: "Chat Room",
                        tabBarLabel: 'Chat',
                        tabBarIcon: ({ color, size }) => {
                            return <Entypo name="chat" size={30} color={theme.colors.onPrimaryContainer} />;
                        },
                    }}
                />
            </Tab.Navigator>
        )
    }
    
    return (
        <PaperProvider theme={appTheme}>
            <NavigationContainer theme={appTheme}>
                <StatusBar />
                <Stack.Navigator
                    initialRouteName="LoginScreen"
                >
                    {!isLoggedIn ? (
                        <Stack.Screen
                            name='LoginScreen'
                            component={LoginScreen}
                            options={{
                                headerShown: false
                            }}
                        />
                    ) : (
                        <>
                            <Stack.Screen
                                name='TabNavigator'
                                component={TabNavigator}
                                options={{
                                    headerShown: false
                                }}
                            />
                            <Stack.Screen
                                name="ChatRoomScreen"
                                component={ChatRoomScreen}
                            />
                            <Stack.Screen
                                name="PrivateScreen"
                                component={PrivateScreen}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}