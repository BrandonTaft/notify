import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, TextInput, FlatList, Keyboard } from "react-native";
import ChatRoomMessage from "../components/chatFeature/ChatRoomMessage";
import { styles } from "../utils/styles";
import {privateSocket} from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, IconButton, Button, Text } from "react-native-paper";
import { AvatarButton, BackButton } from "../components/Buttons";
import { addMessage } from "../redux/chatRoomSlice";

const DirectMessageScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { recipient } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState("");
    const notifyUser = useSelector(state => state.user)
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
            headerTitle: recipient.userName,
            headerTitleStyle: { color:theme.colors.primary, fontWeight:600, fontSize:24 },
            headerStyle: { backgroundColor: theme.colors.primaryContainer },
            headerRight: (props) => <RightHeaderButtons {...props} />,
            headerLeft: (props) => <LeftHeaderButtons {...props} />
        });
        
}, []);

useEffect(()=>{
    privateSocket.on("users", (users) => {
        users.forEach((user) => {
          user.self = user.userID === privateSocket.id;
          
        });
        // put the current user first, and then sort by username
       users = users.sort((a, b) => {
          if (a.self) return -1;
          if (b.self) return 1;
          if (a.username < b.username) return -1;
          return a.username > b.username ? 1 : 0;
        });
        console.log("USERSSS", users)
      });
},[privateSocket])

   
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
                fromSelf: true,
                // roomId: roomId,
                user: notifyUser.userName,
                userId: notifyUser.userId,
                profileImage: notifyUser.profileImage,
                org: notifyUser.organization,
                reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0 },
                timestamp: { hour, mins },
            }
            // privateSocket.emit("newMessage", newMessage);
            privateSocket.emit("newPrivateMessage", {
                newMessage,
                to: recipient
            });
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

export default DirectMessageScreen;