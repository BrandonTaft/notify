import { useState, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";
import { Dimensions, StyleSheet, FlatList } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon, TouchableRipple } from 'react-native-paper';
import { fetchAllUsers, BASE_URL } from "../utils/api";
import usePushNotification from "../hooks/usePushNotification";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../utils/socket";

import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('window');
const ELEMENT_WIDTH = width * .36

export const UserView = () => {
    const { sendPushNotification } = usePushNotification();
    const [allUsers, setAllUsers] = useState([]);
    const [showChatScreen, setShowChatScreen] = useState(false)
    const sender = useSelector(state => state.user);
    const navigation = useNavigation();
    const theme = useTheme();
    

    useLayoutEffect(() => {
        fetchAllUsers().then((data) => {
            setAllUsers(data.users)
        });
        socket.off("connect_error");
    }, []);

    useEffect(() => {
        socket.on("user connected", (user) => {
            console.log(`${user.userName} just connected`)
            //when a user connects get new list from db
            fetchAllUsers().then((data) => {
                setAllUsers(data.users)
            })
          });

        
    },[socket])

    const handleCreatePrivateRoom = async (user) => {
        navigation.navigate({
            name: 'DirectMessageScreen',
            params: {
                recipientId: user._id,
                recipientName: user.userName
            }
        })
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