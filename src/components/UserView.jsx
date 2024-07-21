import { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dimensions, StyleSheet, FlatList } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon, TouchableRipple } from 'react-native-paper';
import { fetchAllUsers, BASE_URL } from "../utils/api";
import usePushNotification from "../hooks/usePushNotification";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../utils/socket";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const ELEMENT_WIDTH = width * .36

export const UserView = () => {
    const { sendPushNotification } = usePushNotification();
    const [allUsers, setAllUsers] = useState([]);
    const self = useSelector(state => state.user);
    const navigation = useNavigation();
    const theme = useTheme();

    const sortUsers = (users) => {
        users.sort((a, b) => {
            if (a._id === self._id) return -1;
            if (b._id === self._id) return 1;
            if (a.userName.toUpperCase() < b.userName.toUpperCase()) return -1;
            return a.userName.toUpperCase() > b.userName.toUpperCase() ? 1 : 0;
        });
        setAllUsers(users)
    };

    useLayoutEffect(() => {
        //fetches users on layout
        fetchAllUsers().then(({ users }) => {
            if (users) {
                sortUsers(users)
            }
        });
        socket.off("connect_error");
    }, []);

   
    useEffect(() => {
         //refreshes list anytime a user logs in/out or is disco'd/connected from/to server
        socket.on("user connected", () => {
            console.log("someone else connected")
            fetchAllUsers().then(({ users }) => {
                if (users) {         
                        sortUsers(users)            
                }
            })
        });

          //refreshes list anytime a user logs in/out or is disco'd/connected from/to server
          socket.on("user disconnected", () => {
            console.log("someone disconnected")
            fetchAllUsers().then(({ users }) => {
                if (users) {
                        sortUsers(users)
                }
            })
        });

        //stores session once logged in
        socket.on("session", async ({ sessionID, userID }) => {
            // attach the session ID to the next reconnection attempts
            socket.auth = { sessionID };
            // store it in the localStorage
            await AsyncStorage.setItem("sessionID", sessionID);
            // save the ID of the user
            socket.userID = userID;
            console.log("SESSION STORED")
        });
       
    }, [socket])

    const handleCreatePrivateRoom = async (user) => {
        if (user._id !== self._id) {
            navigation.navigate({
                name: 'PrivateScreen',
                params: {
                    recipientId: user._id,
                    recipientName: user.userName,
                    recipientIsLogged: user.isLoggedIn
                }
            })
        }
    };

    const UserAvatar = ({ user }) => {
        return (
            <TouchableRipple
                background={{
                    radius: ELEMENT_WIDTH / 2,
                    color: theme.colors.onBackground
                }}
                onPress={() => handleCreatePrivateRoom(user)}
                style={{ justifyContent: 'center', alignItems: 'center', width: ELEMENT_WIDTH }}
            >
                <>
                    {
                        user.profileImage
                            ?
                            <Avatar.Image
                                size={ELEMENT_WIDTH * .75}
                                source={{ uri: `${BASE_URL}/images/${user._id}.jpeg` }}
                                style={{}}
                            />
                            :
                            <Avatar.Text
                                size={ELEMENT_WIDTH * .75}
                                label={user.userName.charAt(0).toUpperCase()}
                                style={{ backgroundColor: theme.colors.onPrimaryContainer }}
                                labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
                            />
                    }
                    {user.isLoggedIn
                        ?
                        <Badge style={{ position: 'absolute', top: 5, backgroundColor: 'green' }}>
                            <Icon
                                source="check"
                                color={"white"}

                            />
                        </Badge>
                        :
                        <Badge style={{ position: 'absolute', top: 5, backgroundColor: 'red' }}>
                            <Icon
                                source="close"
                                color={"white"}
                            />
                        </Badge>
                    }
                    <Text style={{ position: 'absolute', bottom: 0, borderRadius: 10, alignItems: 'center', paddingHorizontal: 15, backgroundColor: 'rgba(12,12,12, 0.6)' }}>
                        <Text style={{ color: "#fff", fontWeight: 900 }}>{user.userName}</Text>
                    </Text>
                </>
            </TouchableRipple>
        )
    }
    return (
        <FlatList
            horizontal
            data={allUsers}
            renderItem={({ item }) => <UserAvatar user={item} />}
            keyExtractor={(item) => item._id}
        />
    )
}

const styles = StyleSheet.create({

});