import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ChatRoomScreen from './screens/ChatRoomScreen';
import ChatRoomListScreen from './screens/ChatRoomListScreen';
import ProfileScreen from './screens/ProfileScreen';
import { IconButton, MD3Colors } from 'react-native-paper';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

export default function Root() {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)

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
                //     options={{
                        
                //         headerLeft: () => (
                //             <IconButton
                //             icon="comment-edit"
                //             iconColor={MD3Colors.primary0}
                //             containerColor='grey'
                            
                //             size={40}
                //             onPress={() => {}}
                //           />
                //         ),
                //       }}
                 />
            </Stack.Navigator>
        );
    }

    function TabNavigator() {
        return (
            <Tab.Navigator
                initialRouteName="HomeScreen"
                barStyle={{ backgroundColor: '#121212' }}
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

        <NavigationContainer>
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

    );
}