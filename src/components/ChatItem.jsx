import { View, Text, Pressable } from "react-native";
import { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../utils/styles";

const ChatItem = ({ item }) => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState({});

    //👇🏻 Retrieves the last message in the array from the item prop
    useLayoutEffect(() => {
        setMessages(item.messages[item.messages.length - 1]);
    }, []);

    ///👇🏻 Navigates to the Messaging screen
    const handleNavigation = () => {
        navigation.navigate("ChatRoomScreen", {
            id: item.id,
            name: item.name,
        });
    };

    return (
        <Pressable style={styles.cchat} onPress={handleNavigation}>
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={styles.cavatar}
            />

            <View style={styles.crightContainer}>
                <View>
                    <Text style={{color:'black', fontSize:33}}>{item.name}</Text>

                    <Text style={styles.cmessage}>
                        {messages?.text ? messages.text : "Tap to start chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={styles.ctime}>
                        {messages?.time ? messages.time : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatItem;