import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatRoomMessage from "../components/chatFeature/ChatRoomMessage";
import { styles } from "../utils/styles";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import { IconButton, MD3Colors, Avatar, useTheme } from "react-native-paper";
import { AvatarButton, LogOutButton, BackButton } from "../components/Buttons";


const ChatRoomScreen = ({ route, navigation }) => {

    const { name, id } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const notifyUser = useSelector(state => state.user)
    const rooms = useSelector(state => state.chatRooms)

    const user = useSelector(state => state.user);

    const theme = useTheme();
   
    const RightHeaderButtons = () => {
        return (
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <AvatarButton
                    styles={styles.avatarButtonImage}
                    size={50}
                    handlePress={() => navigation.navigate("ProfileScreen")}
                />
            <LogOutButton size={50} color = "#000" />
            </View>
        )
    };

    const LeftHeaderButtons = () => {
        return (
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <BackButton onPressButton={() => navigation.navigate('ChatListScreen')}/>
            </View>
        )
    }



    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: name,
            headerStyle: { backgroundColor: theme.colors.primaryContainer },
            headerRight: (props) => <RightHeaderButtons {...props} />,
            headerLeft: (props) => <LeftHeaderButtons {...props} />
        });
        socket.emit("findRoom", id);
        socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
    }, [id]);

    useEffect(() => {
        socket.on("newMessage", (roomChats) => setChatMessages(roomChats));
    }, [socket]);

    const handleNewMessage = () => {
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;

        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;

        if (notifyUser.userName) {
            socket.emit("newMessage", {
                message,
                room_id: id,
                user: notifyUser.userName,
                user_id: notifyUser.id,
                reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0, eyes: 0 },
                timestamp: { hour, mins },
            });
        }
        setMessage("")
    };


    return (
        <View style={{flex:1, backgroundColor:theme.colors.background}}>

            <View
                style={[
                    styles.messagingscreen,
                    { paddingVertical: 5, paddingHorizontal: 10 },
                ]}
            >

                {chatMessages[0] ? (
                    <FlatList
                        data={[...chatMessages].reverse()}
                        renderItem={({ item }) => (
                            <ChatRoomMessage message={item} user={notifyUser.userName} />
                        )}
                        inverted
                        keyExtractor={(item) => item.id}
                    />
                ) : (
                    ""
                )}
            </View>
            <View style={[styles.messaginginputContainer, {backgroundColor: theme.colors.primaryContainer }]}>
                <TextInput
                    autoFocus
                    editable
                    multiline
                    style={styles.messaginginput}
                    onChangeText={(value) => setMessage(value)}
                    value={message}
                />
                <Pressable
                    style={styles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default ChatRoomScreen;