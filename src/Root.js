import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';
import { en, registerTranslation } from 'react-native-paper-dates'
import { useSelector } from 'react-redux';
import { StatusBar, View, useColorScheme } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import ChatRoomListScreen from './screens/ChatRoomListScreen';
import ProfileScreen from './screens/ProfileScreen';
import { darkColors, lightColors } from './utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Entypo } from '@expo/vector-icons';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
registerTranslation('en', en)

export default function Root() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    // const theme = useTheme();
    const colorScheme = useColorScheme();
    const LightTheme = {
        ...MD3LightTheme,
        colors: lightColors
    }
    const DarkTheme = {
        ...MD3DarkTheme,
        mode: 'adaptive',
        colors: darkColors
      };
    function ChatListTab() {
        return (
            <Stack.Navigator initialRouteName="Chat Rooms">
                <Stack.Screen
                    name='Chat Rooms'
                    component={ChatRoomListScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="ChatRoomScreen"
                    component={ChatRoomScreen}
                />
            </Stack.Navigator>
        );
    }

    function TabNavigator() {
        const theme = useTheme();
        return (
            <Tab.Navigator
                initialRouteName="HomeScreen"
                barStyle={{ backgroundColor: theme.colors.primaryContainer  }}
                swipeEnabled
                labeled={false}
                activeColor='blue'
                activeIndicatorStyle={{ backgroundColor:theme.colors.outline, height:50, borderRadius:999}}
            >
                <Tab.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    initialParams={{ itemId: 42 }}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => {
                          return <Icon name="house-user" size={26} color={theme.colors.onPrimaryContainer} />;
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
                    name='ChatListTab'
                    component={ChatListTab}
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
        <PaperProvider theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
            <NavigationContainer >
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
                        <Stack.Screen
                            name='TabNavigator'
                            component={TabNavigator}
                            options={{
                                headerShown: false
                            }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}