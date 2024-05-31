import { View, Pressable } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useTheme, Text, TouchableRipple, Avatar } from "react-native-paper";
import { styles } from "../../utils/styles";
import { BASE_URL } from "../../utils/api";
import ChatRoomMessage from "./ChatRoomMessage";

export const ChatRoomPreviewItem = ({ item }) => {
    const user = useSelector(state => state.user)
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const theme = useTheme();
    // useLayoutEffect(() => {
    //     setMessages(item.messages[item.messages.length - 1]);
    // }, []);

    // useEffect(() => {
    //     setMessages(item.messages[item.messages.length - 1]);
    // }, [item]);
    
    useLayoutEffect(() => {
        if (item.messages.length > 1) {
            setMessages([ item.messages[item.messages.length - 2], item.messages[item.messages.length - 1]]);
        } else if (item.messages.length) {
            setMessages([item.messages[item.messages.length - 1]]);
        }
    }, []);

    useEffect(() => {
        if (item.messages.length > 1) {
            setMessages([ item.messages[item.messages.length - 2], item.messages[item.messages.length - 1]]);
        } else if (item.messages.length) {
            setMessages([item.messages[item.messages.length - 1]]);
        }
    }, [item]);


    const handleNavigation = () => {
        navigation.navigate({
            name: 'ChatRoomScreen',
            params: {
                _id: item._id,
                name: item.roomName,
            }
        });
    };

    function MessagePreview({ message }) {
        const isFromMe = message.user === user.userName;
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
                                        source={{ uri: `${BASE_URL}/images/${message.userId}.jpeg` }}
                                        style={{ position: 'relative', zIndex: 999 }}
                                    />
                                    :
                                    <Avatar.Text
                                        size={40}
                                        label={message.user.charAt(0).toUpperCase()}
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

                        <Text variant="bodySmall" style={{ color: theme.colors.textMuted }}>{message.time}</Text>

                        <View
                            style={[
                                isFromMe
                                    ? [styles.rightArrow, { backgroundColor: theme.colors.primary }]
                                    : [styles.leftArrow,{ backgroundColor: theme.colors.secondary }]
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
                    size={30}
                    color={theme.colors.onPrimaryContainer}
                />
                <Text 
                variant="headlineSmall" 
                style={{ 
                    color: theme.colors.onPrimaryContainer,
                    marginLeft:5
                 }}>
                    {item.roomName}
                </Text>
            </View>

            <View style={styles.chatRoomPreviewContent}>
                {messages.length > 0 ?
                    <>
                        {messages.map((message, index) => {
                            return (
                                <View key={message._id} >
                                    <MessagePreview message={message} />
                                </View>
                            )
                        })}
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