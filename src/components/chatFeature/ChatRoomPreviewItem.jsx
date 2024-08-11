import { View, Pressable, TextInput } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTheme, Text, TouchableRipple, Avatar, Button } from "react-native-paper";
import {socket} from "../../utils/socket";
import { styles } from "../../utils/styles";
import { BASE_URL } from "../../utils/api";

import * as Crypto from 'expo-crypto';

export const ChatRoomPreviewItem = ({ item }) => {
    const user = useSelector(state => state.user)
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);

    const [text, setText] = useState("");



    const theme = useTheme();

    useLayoutEffect(() => {
        if (item.messages.length > 1) {
            setMessages([item.messages[item.messages.length - 2], item.messages[item.messages.length - 1]]);
        } else if (item.messages.length) {
            setMessages([item.messages[item.messages.length - 1]]);
        }
    }, []);

    useEffect(() => {
        if (item.messages.length > 1) {
            setMessages([item.messages[item.messages.length - 2], item.messages[item.messages.length - 1]]);
        } else if (item.messages.length) {
            setMessages([item.messages[item.messages.length - 1]]);
        }
    }, [item]);

    const handleNewMessage = () => {
        let newMessage;
        const messageId = Crypto.randomUUID();
        const hour =
            new Date().getHours() < 10
                ? `0${new Date().getHours()}`
                : `${new Date().getHours()}`;

        const mins =
            new Date().getMinutes() < 10
                ? `0${new Date().getMinutes()}`
                : `${new Date().getMinutes()}`;

        if (user.userName) {
            if (item.roomId) {
             newMessage = {
                messageId,
                text,
                roomId: item.roomId,
                sender: user.userName,
                senderId: user._id,
                profileImage: user.profileImage,
                org: user.organization,
                reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0 },
                time: `${ hour } : ${ mins }`,
            }
            socket.emit("newMessage", newMessage);
        } else if (item.recipientId) {
            newMessage = {
                messageId,
                fromSelf: true,
                receiverId: item.recipientId,
                receiver: item.recipientName,
                sender: user.userName,
                senderId: user._id,
                profileImage: user.profileImage,
                time: `${hour}:${mins}`,
                text
            }
            setMessages([item.messages[item.messages.length - 1], newMessage])
            socket.emit("newPrivateMessage", {
                newMessage,
                to: item.recipientId,
              });


        }
            console.log("NEW MWSSAGE", newMessage)
            //socket.emit("newMessage", newMessage);
            //dispatch(addMessage(newMessage))
            //setChatMessages(chatMessages => [...chatMessages, newMessage])
        }
        setText("")
    };



    const handleNavigation = () => {
        if(item.roomId) {
            console.log("ROOM ITEM", item)
        navigation.navigate({
            name: 'ChatRoomScreen',
            params: {
                roomId: item.roomId,
                name: item.roomName,
            }
        });
    } else {
        navigation.navigate({
            name: 'PrivateScreen',
            params: {
                recipientId: item.recipientId,
                recipientName: item.recipientName
            }
        });
    }
    };

    function MessagePreview({ message }) {
        const isFromMe = message.senderId === user._id;
        return (
            <View
                style={
                    isFromMe
                        ? [styles.previewMessageWrapper, { alignItems: "flex-end" }]
                        : styles.previewMessageWrapper
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {isFromMe
                        ?
                        null
                        :
                        <>
                            {
                                message.profileImage
                                    ?
                                    <Avatar.Image
                                        size={40}
                                        source={{ uri: `${BASE_URL}/images/${message.senderId}.jpeg` }}
                                        style={{ position: 'relative', zIndex: 999 }}
                                    />
                                    :
                                    <Avatar.Text
                                        size={40}
                                        label={message.sender ? message.sender.charAt(0).toUpperCase() : "U"}
                                        style={{ backgroundColor: theme.colors.onPrimaryContainer, position: 'relative', zIndex: 999 }}
                                        labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
                                    />
                            }
                        </>
                    }
                    <View
                        style={[styles.previewMessage,
                        isFromMe
                            ? { backgroundColor: theme.colors.primary, marginRight: 5 }
                            : { backgroundColor: theme.colors.secondary }
                        ]}
                    >
                        {message.text &&
                            <Text variant='titleMedium' style={{ color: theme.colors.text }}>
                                {message.text}
                            </Text>
                        }

                        <Text variant="bodySmall" style={{ color: theme.colors.textMuted }}>
                            {message.time}
                        </Text>

                        <View
                            style={[
                                isFromMe
                                    ? [styles.rightArrow, { backgroundColor: theme.colors.primary }]
                                    : [styles.leftArrow, { backgroundColor: theme.colors.secondary }]
                            ]}
                        >
                        </View>
                        <View
                            style={[
                                isFromMe
                                    ? styles.rightArrowOverlap
                                    : styles.leftArrowOverlap,
                                { backgroundColor: theme.colors.primaryContainer }
                            ]}
                        >
                        </View>
                    </View>
                </View>
                {/* <Text style={{ marginLeft: 40 }}>{message.time}</Text> */}
            </View>

        );
    }

    return (
        <Pressable
            android_ripple={
                RippleConfig = {
                    borderless: false,
                    foreground: true
                }
            }
            style={[
                styles.chatRoomPreviewItemContainer,
                { backgroundColor: theme.colors.primaryContainer }
            ]}
            onPress={handleNavigation}
        >
            <View style={styles.chatRoomPreviewTitle}>
                <Ionicons
                    name='chatbubble-ellipses-sharp'
                    size={24}
                    color={theme.colors.onPrimaryContainer}
                />
              
                    <Text
                        style={{
                            color: theme.colors.onPrimaryContainer,
                            fontSize: 18,
                            fontWeight: 900,
                            marginLeft: 5
                        }}>

                        { item.roomName ? item.roomName : item.recipientName.toUpperCase()}
                    </Text>
            </View>

            <View style={styles.chatRoomPreviewContent}>
                {messages.length > 0 ?
                    <>
                        {messages.map((message, index) => {
                            return (
                                <View key={message.messageId} >
                                    <MessagePreview message={message} />
                                </View>
                            )
                        })}
                         <View style={[styles.messaginginputContainer, { backgroundColor: theme.colors.primaryContainer }]}>
                <TextInput
                    editable
                    multiline
                    style={styles.messaginginput}
                    onChangeText={(value) => setText(value)}
                    value={text}
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
                    </>
                    :
                    <Text variant="bodyMedium" style={{ color: theme.colors.text, opacity: .5 }}>
                        Tap to start chatting
                        <Text variant="bodyMedium" style={{ color: theme.colors.text, opacity: .5 }}>
                            now
                        </Text>
                    </Text>
                }
            </View>
        </Pressable>
    );
};