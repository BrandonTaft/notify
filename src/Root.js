import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StatusBar, useColorScheme } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import ChatRoomListScreen from './screens/ChatRoomListScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();


export default function Root() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const colorScheme = useColorScheme();
    const LightTheme = {
        ...MD3LightTheme,
        colors: {
            "primary": "rgb(0, 103, 131)",
            "onPrimary": "rgb(255, 255, 255)",
            "primaryContainer": "rgb(188, 233, 255)",
            "onPrimaryContainer": "rgb(0, 31, 42)",
            "secondary": "rgb(77, 97, 107)",
            "onSecondary": "rgb(255, 255, 255)",
            "secondaryContainer": "rgb(208, 230, 242)",
            "onSecondaryContainer": "rgb(8, 30, 39)",
            "tertiary": "rgb(92, 91, 125)",
            "onTertiary": "rgb(255, 255, 255)",
            "tertiaryContainer": "rgb(226, 223, 255)",
            "onTertiaryContainer": "rgb(25, 24, 54)",
            "error": "rgb(186, 26, 26)",
            "onError": "rgb(255, 255, 255)",
            "errorContainer": "rgb(255, 218, 214)",
            "onErrorContainer": "rgb(65, 0, 2)",
            "background": "rgb(251, 252, 254)",
            "onBackground": "rgb(25, 28, 30)",
            "surface": "rgb(251, 252, 254)",
            "onSurface": "rgb(25, 28, 30)",
            "surfaceVariant": "rgb(220, 228, 233)",
            "onSurfaceVariant": "rgb(64, 72, 76)",
            "outline": "rgb(112, 120, 125)",
            "outlineVariant": "rgb(192, 200, 205)",
            "shadow": "rgb(0, 0, 0)",
            "scrim": "rgb(0, 0, 0)",
            "inverseSurface": "rgb(46, 49, 50)",
            "inverseOnSurface": "rgb(239, 241, 243)",
            "inversePrimary": "rgb(99, 211, 255)",
            "elevation": {
              "level0": "transparent",
              "level1": "rgb(238, 245, 248)",
              "level2": "rgb(231, 240, 244)",
              "level3": "rgb(223, 236, 241)",
              "level4": "rgb(221, 234, 239)",
              "level5": "rgb(216, 231, 237)"
            },
            "surfaceDisabled": "rgba(25, 28, 30, 0.12)",
            "onSurfaceDisabled": "rgba(25, 28, 30, 0.38)",
            "backdrop": "rgba(42, 50, 53, 0.4)"
          }
    }
    const DarkTheme = {
        ...MD3DarkTheme,
        mode: 'adaptive',
        colors: {
           
              "primary": "rgb(99, 211, 255)",
              "onPrimary": "rgb(0, 53, 69)",
              "primaryContainer": "rgb(0, 77, 99)",
              "onPrimaryContainer": "rgb(188, 233, 255)",
              "secondary": "rgb(180, 202, 213)",
              "onSecondary": "rgb(30, 51, 60)",
              "secondaryContainer": "rgb(53, 74, 83)",
              "onSecondaryContainer": "rgb(208, 230, 242)",
              "tertiary": "rgb(197, 194, 234)",
              "onTertiary": "rgb(46, 45, 77)",
              "tertiaryContainer": "rgb(69, 67, 100)",
              "onTertiaryContainer": "rgb(226, 223, 255)",
              "error": "rgb(255, 180, 171)",
              "onError": "rgb(105, 0, 5)",
              "errorContainer": "rgb(147, 0, 10)",
              "onErrorContainer": "rgb(255, 180, 171)",
              "background": "rgb(25, 28, 30)",
              "onBackground": "rgb(225, 226, 228)",
              "surface": "rgb(25, 28, 30)",
              "onSurface": "rgb(225, 226, 228)",
              "surfaceVariant": "rgb(64, 72, 76)",
              "onSurfaceVariant": "rgb(192, 200, 205)",
              "outline": "rgb(138, 146, 151)",
              "outlineVariant": "rgb(64, 72, 76)",
              "shadow": "rgb(0, 0, 0)",
              "scrim": "rgb(0, 0, 0)",
              "inverseSurface": "rgb(225, 226, 228)",
              "inverseOnSurface": "rgb(46, 49, 50)",
              "inversePrimary": "rgb(0, 103, 131)",
              "elevation": {
                "level0": "transparent",
                "level1": "rgb(29, 37, 41)",
                "level2": "rgb(31, 43, 48)",
                "level3": "rgb(33, 48, 55)",
                "level4": "rgb(34, 50, 57)",
                "level5": "rgb(35, 54, 62)"
              },
              "surfaceDisabled": "rgba(225, 226, 228, 0.12)",
              "onSurfaceDisabled": "rgba(225, 226, 228, 0.38)",
              "backdrop": "rgba(42, 50, 53, 0.4)"
          
          }
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
                barStyle={{ backgroundColor: theme.colors.onPrimaryContainer  }}
                swipeEnabled
            >
                <Tab.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    initialParams={{ itemId: 42 }}
                />

                <Tab.Screen
                    name='ProfileScreen'
                    component={ProfileScreen}
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
                {/* <Tab.Navigator
                        initialRouteName="LoginScreen"
                        barStyle={{ backgroundColor: '#121212' }}
                        swipeEnabled
                    >
                        <Tab.Screen
                            name='LoginScreen'
                            component={LoginScreen}
                            options={{
                                barStyle: { display: "none" },
                              }}
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
                    </Tab.Navigator> */}

            </NavigationContainer>
        </PaperProvider>
    );
}