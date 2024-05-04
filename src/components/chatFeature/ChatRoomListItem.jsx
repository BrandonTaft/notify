import { View, StyleSheet, Pressable } from "react-native";
import { useLayoutEffect, useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import { styles } from "../../utils/styles";
import { useTheme, Text, TouchableRipple } from "react-native-paper";

const ChatRoomListItem = ({ item }) => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState({});
    const theme = useTheme();
console.log("ITEM", item.messages[item.messages.length - 1])
    useLayoutEffect(() => {
        setMessages(item.messages[item.messages.length - 1]);
    }, []);

    useEffect(() => {
        setMessages(item.messages[item.messages.length - 1]);
    }, [item]);


    const handleNavigation = () => {
        console.log("Idddd", item.roomId)
        navigation.navigate( {
            name: 'ChatRoomScreen',
            params: {
                roomId: item.roomId,
                name: item.roomName,
            }
        });
    };

    return (
        <Pressable
                    android_ripple={
                        RippleConfig = {
                            
                            borderless: false,
                            foreground: true
                        }
                    }
        // <TouchableRipple
        //     rippleColor="rgba(0, 0, 0, .25)"
        //     borderless={false}
        //     background = {{
                
        //         foreground: false
                
        //     }}
            style={
                [
                    styles.chatRoomListItem,
                    {
                        backgroundColor: theme.colors.primary,
                    }
                ]
            }
            onPress={handleNavigation}
        >
            <>
                <Ionicons
                    name='chatbubble-ellipses-sharp'
                    size={40}
                    color={theme.colors.onPrimary}
                    style={styles.chatRoomListItemIcon}
                />

                <View style={styles.chatRoomListItemText}>
                    <View>
                        <Text variant="headlineSmall" style={{ color: theme.colors.text }}>{item.roomName}</Text>

                        <Text variant="bodyMedium" style={{ color: theme.colors.text, opacity: .5 }}>
                            {messages?.text ? messages.text : "Tap to start chatting"}
                        </Text>
                    </View>
                    <View>
                        <Text variant="bodyMedium" style={{ color: theme.colors.text, opacity: .5 }}>
                            {messages?.time ? messages.time : "now"}
                        </Text>
                    </View>
                </View>
            </>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    chatRoomListItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        paddingHorizontal: 15,
        backgroundColor: "#312e3f",
        height: 80,
        margin: 5,
        elevation:4,
        overflow: 'hidden'
    },
    chatRoomListItemText: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
    },
    chatRoomListItemIcon: {
        marginRight: 15,
    },
})

export default ChatRoomListItem;