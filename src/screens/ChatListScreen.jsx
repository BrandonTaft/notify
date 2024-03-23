import { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import socket from "../utils/socket";
import ChatItem from "../components/ChatItem";
import { styles } from "../utils/styles";
import Modal from "../components/Modal";
import { fetchGroups } from "../api";
import { IconButton, MD3Colors } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { fetchChats } from "../redux/chatSlice";

const ChatListScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const chats = useSelector(state => state.chats.chats)
  
  const chatStatus = useSelector(state => state.chats.status)

  // useLayoutEffect(() => {
  //   fetchGroups()
  //     .then((data) => setRooms(data))
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    if (chatStatus === 'idle') {
      dispatch(fetchChats())
    }
    setRooms(chats)
  }, [chatStatus, dispatch])

console.log("ROOMS",rooms)
  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);


  return (
    <View style={styles.chatList}>
       <IconButton
        icon="pencil-plus"
        iconColor={MD3Colors.primary100}
        size={40}
        onPress={() => setVisible(true)}
      />
      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} /> : ""}
    </View>
  );
};
export default ChatListScreen;