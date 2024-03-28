import { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import socket from "../utils/socket";
import ChatItem from "../components/ChatItem";
import { styles } from "../utils/styles";
import Modal from "../components/Modal";
import { fetchGroups } from "../api";
import { IconButton, MD3Colors } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import { addChatRoom } from "../redux/chatRoomSlice";
import Loader from "../components/Loader";
const ChatListScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [chatRooms, setChatRooms] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()


  useLayoutEffect(() => {
    setIsLoading(true)
    fetchGroups()
      .then((data) => {
        setIsLoading(false)
        setChatRooms(data)
        dispatch(addChatRoom(data))
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setChatRooms(rooms)
      dispatch(addChatRoom(rooms))
    });
  }, [socket]);

  let chatScreenData;
  if (isLoading) {
    chatScreenData = <Loader />
  } else {
    chatScreenData = (
      <View style={styles.chatlistContainer}>
        {chatRooms.length > 0 ? (
          <FlatList
            data={chatRooms}
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
    )
  }
  return (
    <View style={styles.chatList}>

      {chatScreenData}
      {visible &&
        <Modal setVisible={setVisible} />
      }
    </View>
  );
};
export default ChatListScreen;