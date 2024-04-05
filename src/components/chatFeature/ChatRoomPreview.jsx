import { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { fetchGroups } from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { addChatRoom } from "../../redux/chatRoomSlice";
import CreateChat from "./CreateChat";
import ChatRoomListItem from "./ChatRoomListItem";
import Loader from "../Loader";
import { IconButton, MD3Colors } from 'react-native-paper';
import socket from "../../utils/socket";
import { useTheme } from '@react-navigation/native';
import { styles } from "../../utils/styles";

export default function ChatRoomPreview() {
    const [isLoading, setIsLoading] = useState(false)
  const [chatRooms, setChatRooms] = useState([]);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const { colors } = useTheme();

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
    socket.on("chatRoomList", (rooms) => {
      setChatRooms(rooms)
      dispatch(addChatRoom(rooms))
    });
    console.log("CHATLIST_ chatRoomList socket-", chatRooms)
  }, [socket]);
  let chatScreenData;
  if (isLoading) {
    chatScreenData = <Loader />
  } else {
    chatScreenData = (
      <View style={{flex:1}}>
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
    <View style={[styles.chatRoomListScreen, {backgroundColor: colors.primary} ]}>
      <View style={styles.chatRoomListScreenFabGroup} >
      <IconButton
        icon="comment-edit"
        iconColor={MD3Colors.primary0}
        containerColor='grey'
        style={styles.chatRoomListScreenFab}
        size={40}
        onPress={() => setVisible(true)}
      />
      <IconButton
        icon="location-exit"
        iconColor={MD3Colors.primary0}
        containerColor='grey'
        style={styles.chatRoomListScreenFab}
        size={40}
        onPress={() => navigation.navigate("HomeScreen")}
      />
    </View>
    <View style={{flex:1, backgroundColor:'pink'}}>
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
  {
    visible &&
    <CreateChat setVisible={setVisible} />
  }
    </View >
  );
}