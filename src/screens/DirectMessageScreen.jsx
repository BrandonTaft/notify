import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, TextInput, FlatList, Keyboard } from "react-native";
import ChatRoomMessage from "../components/chatFeature/ChatRoomMessage";
import { styles } from "../utils/styles";
import {socket} from "../utils/socket";
import { useSelector, useDispatch } from "react-redux";
import { useTheme, IconButton, Button, Text } from "react-native-paper";
import { AvatarButton, BackButton } from "../components/Buttons";
import { addPrivateMessage } from "../redux/userSlice";
import * as Crypto from 'expo-crypto';

const DirectMessageScreen = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { recipient } = route.params;
    const [chatMessages, setChatMessages] = useState([]);
    const [privateRoom, setPrivateRoom] =useState({
        recipient: recipient,
        messages:[]
    })
    const [text, setText] = useState("");
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
        if(notifyUser.privateRooms){
        let existingChat = notifyUser.privateRooms.find(room => room.recipient === recipient._id)
        if(existingChat) {
            setChatMessages(existingChat.messages)
        }
        }
        //socket.emit('joinPrivateRoom', recipient._id);
}, []);

useEffect(()=>{
    socket.on("users", (users) => {
        users.forEach((user) => {
          user.self = user.userID === socket.id;
          
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
console.log("IRANNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN")
      socket.on("newPrivateMessage", ({ newPrivateMessage }) => {
        // for (let i = 0; i < this.users.length; i++) {
        //   const user = this.users[i];
        //   if (user.userID === from) {
        //     user.messages.push({
        //       newPrivateMessage,
        //       fromSelf: false,
        //     });
        //     if (user !== this.selectedUser) {
        //       user.hasNewPrivateMessages = true;
        //     }
        //     break;
        //   }
        // }
        console.log("newPrivateMessage", newPrivateMessage)
        if(newPrivateMessage.senderId === recipient._id){
        setChatMessages([...chatMessages, newPrivateMessage])
        console.log("CHATMESSSSS", chatMessages)
        }
        dispatch(addPrivateMessage(newPrivateMessage))
      });
},[socket])

const handleNewPrivateMessage = () => {
    const messageId = Crypto.randomUUID();
    const hour =
        new Date().getHours() < 10
            ? `0${new Date().getHours()}`
            : `${new Date().getHours()}`;

    const mins =
        new Date().getMinutes() < 10
            ? `0${new Date().getMinutes()}`
            : `${new Date().getMinutes()}`;

    if (notifyUser.userName) {
        const newPrivateMessage = {
            messageId,
            text,
            fromSelf: true,
            receiverId: recipient._id,
            sender: notifyUser.userName,
            senderId: notifyUser._id,
            profileImage: notifyUser.profileImage,
            time: `${hour}:${mins}`,
            reactions: { thumbsUp: 0, thumbsDown: 0, heart: 0 },
        }
        socket.emit("newPrivateMessage", {
            newPrivateMessage
        });
        setChatMessages([...chatMessages, newPrivateMessage])
        dispatch(addPrivateMessage(newPrivateMessage))
    }
    setText("")
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
                    onChangeText={(value) => setText(value)}
                    value={text}
                />
                <Button
                    style={{backgroundColor: theme.colors.primary, paddingHorizontal:5, justifyContent:'center'}}
                    labelStyle={{fontWeight:900}}
                    textColor={theme.colors.primaryContainer}
                    onPress={handleNewPrivateMessage}
                >
                    SEND
                </Button>
            </View>
        </View>
    );
};

export default DirectMessageScreen;