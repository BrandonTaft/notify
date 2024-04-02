import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatRoomMessage from "../components/ChatRoomMessage";
import { AvatarButton } from "../components/buttons/AvatarButton";
import { styles } from "../utils/styles";
import socket from "../utils/socket";
import { useSelector } from "react-redux";
import { IconButton, MD3Colors } from "react-native-paper";

const ChatRoomScreen = ({ route, navigation }) => {
    const [user, setUser] = useState("");
    const { name, id } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const notifyUser = useSelector(state => state.user)
    const rooms = useSelector(state => state.chatRooms)





    useLayoutEffect(() => {
        navigation.setOptions({ headerTitle: name, headerLeft: () => (
                        <IconButton
                        icon="comment-edit"
                        iconColor={MD3Colors.primary0}
                        containerColor='grey'
                        
                        size={40}
                        onPress={() => navigation.navigate("ChatListTab", {screen: 'ChatListScreen'})}
                      />
                    ), });
        socket.emit("findRoom", id);
        socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
    }, []);

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
                reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0, eyes: 0 },
                timestamp: { hour, mins },
            });
        }
        setMessage("")
    };


    return (
        <View style={styles.messagingscreen}>
            <View
                style={[
                    styles.messagingscreen,
                    { paddingVertical: 5, paddingHorizontal: 10 },
                ]}
            >
                <AvatarButton styles={{ color: "black" }} handlePress={() => navigation.navigate("ChatListScreen")} />
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
            <View style={styles.messaginginputContainer}>
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