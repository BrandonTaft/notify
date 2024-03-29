import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatRoomMessages from "../components/ChatRoomMessages";
import { AvatarButton } from "../components/buttons/AvatarButton";
import { styles } from "../utils/styles";
import socket from "../utils/socket";

const ChatRoomScreen = ({ route, navigation }) => {
    const [user, setUser] = useState("");
    const { name, id } = route.params;

    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");

    const getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem("username");
            if (value !== null) {
                setUser(value);
            }
        } catch (e) {
            console.error("Error while loading username!");
        }
    };

    const handleNewMessage = () => {
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;

        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;

        if (user) {
            socket.emit("newMessage", {
                message,
                room_id: id,
                user,
                timestamp: { hour, mins },
            });
        }
        setMessage("")
    };

    useLayoutEffect(() => {
        navigation.setOptions({ title: name });
        getUsername();
        socket.emit("findRoom", id);
        socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
    }, []);

    useEffect(() => {
        console.log("IRAN")
        socket.on("newMessage", (roomChats) => setChatMessages(roomChats));
    }, [socket]);


    return (
        <View style={styles.messagingscreen}>
            <View
                style={[
                    styles.messagingscreen,
                    { paddingVertical: 5, paddingHorizontal: 10 },
                ]}
            >
                <AvatarButton styles={{color:"black"}} handlePress={() => navigation.navigate("ChatListScreen")} />
                {chatMessages[0] ? (
                    <FlatList
                        //data={chatMessages}
                        renderItem={({ item }) => (
                            <ChatRoomMessages item={item} user={user} />
                        )}
                        inverted
                        data={[...chatMessages].reverse()}
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