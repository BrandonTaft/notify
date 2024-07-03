import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, TextInput, FlatList, Keyboard } from "react-native";
import ChatRoomMessage from "../components/chatFeature/ChatRoomMessage";
import { styles } from "../utils/styles";
import {socket} from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, IconButton, Button, Text } from "react-native-paper";
import { AvatarButton, BackButton } from "../components/Buttons";
import { addMessage } from "../redux/chatRoomSlice";

const ChatRoomScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { name, roomId } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const notifyUser = useSelector(state => state.user)
    const chats = useSelector(state => state.chatRooms)
    const theme = useTheme();
    
    const RightHeaderButtons = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal:10 }}>
                <IconButton
                    icon="home"
                    iconColor={theme.colors.onPrimaryContainer}
                    size={40}
                    onPress={() => {
                        Keyboard.dismiss()
                        navigation.navigate("HomeScreen")
                    }}
                />
                <AvatarButton
                    size={40}
                    handlePress={() => {
                        Keyboard.dismiss()
                        navigation.navigate("ProfileScreen")
                    }}
                />
            </View>
        )
    };

    const LeftHeaderButtons = () => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BackButton
                    onPressButton={() => {
                        navigation.navigate('TabNavigator', { screen: 'ChatRoomListScreen' })
                    }}
                />
            </View>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: name,
            headerTitleStyle: { color:theme.colors.primary, fontWeight:600, fontSize:24 },
            headerStyle: { backgroundColor: theme.colors.primaryContainer },
            headerRight: (props) => <RightHeaderButtons {...props} />,
            headerLeft: (props) => <LeftHeaderButtons {...props} />
        });
        socket.emit("findRoom", roomId);
        socket.on("foundRoom", (roomChats) => setChatMessages(roomChats));
    }, [roomId]);

    useEffect(() => {
        socket.on("newMessage", (roomChats) => {
            setChatMessages(roomChats)
        })
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
            const newMessage = {
                message,
                roomId: roomId,
                user: notifyUser.userName,
                userId: notifyUser._id,
                profileImage: notifyUser.profileImage,
                org: notifyUser.organization,
                reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0 },
                timestamp: { hour, mins },
            }
            console.log("NEW MWSSAGE", newMessage)
            socket.emit("newMessage", newMessage);
            dispatch(addMessage(newMessage))
        }
        setMessage("")
    };

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <View
                style={[
                    styles.messagingscreen,
                    { paddingHorizontal: 10 },
                ]}
            >
                {chatMessages[0] ? (
                    <FlatList
                        data={[...chatMessages].reverse()}
                        renderItem={({ item }) => (
                            <ChatRoomMessage message={item} />
                        )}
                        inverted
                        keyExtractor={(item) => item.messageId}
                    />
                ) : (""
                )}
            </View>
            <View style={[styles.messaginginputContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                <TextInput
                    autoFocus
                    editable
                    multiline
                    style={styles.messaginginput}
                    onChangeText={(value) => setMessage(value)}
                    value={message}
                />
                <Button
                    style={{backgroundColor: theme.colors.primary, paddingHorizontal:5, justifyContent:'center'}}
                    labelStyle={{fontWeight:900}}
                    textColor={theme.colors.primaryContainer}
                    onPress={handleNewMessage}
                >
                    SEND
                </Button>
            </View>
        </View>
    );
};

export default ChatRoomScreen;