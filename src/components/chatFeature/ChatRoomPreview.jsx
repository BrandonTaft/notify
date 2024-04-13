import { useState, useLayoutEffect, useEffect } from "react";
import { View, FlatList } from "react-native";
import { fetchGroups } from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { addChatRoom, addAllRoomsFromServer } from "../../redux/chatRoomSlice";
import ChatRoomListItem from "./ChatRoomListItem";
import Loader from "../Loader";
import { Text, useTheme, Chip } from 'react-native-paper';
import socket from "../../utils/socket";
import CreateChatComponent from "./CreateChatComponent";
import { ScrollView } from "react-native";

export default function ChatRoomPreview() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [showCreateChatComponent, setShowCreateChatComponent] = useState(false);
  const dispatch = useDispatch()
  const theme = useTheme();
  const rooms = useSelector(state => state.chatRooms);

  console.log("previewwwww", rooms)
  console.log("previewwwwwSTATEEE", chatRooms)

  useLayoutEffect(() => {
    setIsLoading(true)
    fetchGroups()
      .then((rooms) => {
        setIsLoading(false)
        setChatRooms(rooms)
        dispatch(addAllRoomsFromServer(rooms))
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
  }, [socket]);


  return (
    <View style={[{ flex: 1 }]}>
      {rooms.length > 0 ? (
        <FlatList
          data={rooms}
          renderItem={({ item }) => <ChatRoomListItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="headlineSmall" style={{ color: theme.colors.text }}>No rooms created!</Text>
          <Chip
            icon="chat"
            elevated={true}
            rippleColor="rgba(0, 0, 0, .25)"
            onPress={() => setShowCreateChatComponent(true)}
            style={{ margin: 20 }}
            textStyle={{ fontSize: 17, fontWeight: 'bold' }}
          >
            Create Room
          </Chip>
        </View>
      )}
      <CreateChatComponent
        showCreateChatComponent={showCreateChatComponent}
        setShowCreateChatComponent={setShowCreateChatComponent}
      />
    </View >
  );
}