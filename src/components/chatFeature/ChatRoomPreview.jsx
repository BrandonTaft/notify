import { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { fetchGroups } from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { addChatRoom } from "../../redux/chatRoomSlice";
import ChatRoomListItem from "./ChatRoomListItem";
import Loader from "../Loader";
import { IconButton, MD3Colors, useTheme } from 'react-native-paper';
import socket from "../../utils/socket";
import { styles } from "../../utils/styles";

export default function ChatRoomPreview() {
  const [isLoading, setIsLoading] = useState(false)
  const [chatRooms, setChatRooms] = useState([]);
  const dispatch = useDispatch()
  // const theme = useTheme();

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
  useEffect(()=> {
    console.log("PREVIEW")
  },[])
  useEffect(() => {
    
    socket.on("chatRoomList", (rooms) => {
      setChatRooms(rooms)
      dispatch(addChatRoom(rooms))
    });
  }, [socket]);

  let chatScreenData;
  if (isLoading) {
    chatScreenData = <Loader />
  } else {
    chatScreenData = (
      <View style={{ flex: 1 }}>
        {chatRooms.length > 0 ? (
          <FlatList
            data={chatRooms}
            renderItem={({ item }) => <ChatRoomListItem item={item} />}
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
    <View style={[{ flex: 1 }]}>
     <View style={{ flex: 1 }}>
        {chatRooms.length > 0 ? (
          <FlatList
            data={chatRooms}
            renderItem={({ item }) => <ChatRoomListItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No rooms created!</Text>
            <Text>Click the icon above to create a Chat room</Text>
          </View>
        )}
      </View>
    </View >
  );
}