import { useState, useLayoutEffect, useEffect } from "react";
import { View, FlatList } from "react-native";
import { fetchGroups } from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { addChatRoom } from "../../redux/chatRoomSlice";
import ChatRoomListItem from "./ChatRoomListItem";
import Loader from "../Loader";
import { Text, useTheme, Chip } from 'react-native-paper';
import socket from "../../utils/socket";
import CreateChatComponent from "./CreateChatComponent";

export default function ChatRoomPreview() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [showCreateChatComponent, setShowCreateChatComponent] = useState(false);
  const dispatch = useDispatch()
  const theme = useTheme();
  const rooms = useSelector(state => state.chatRooms);


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
  }, [socket]);

  let chatRoomPreviewData;
  if (isLoading) {
    chatRoomPreviewData = <Loader />
  } else {
    chatRoomPreviewData = (
      <View style={{ flex: 1 }}>
        {chatRooms.length > 0 ? (
          <FlatList
            data={chatRooms}
            renderItem={({ item }) => <ChatRoomListItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text variant="headlineSmall" style={{ color: theme.colors.text }}>No rooms created!</Text>
            <Chip
              icon="chat"
              elevated={true}
              rippleColor="rgba(0, 0, 0, .25)"
              onPress={() => setShowCreateChatComponent(true)}
              style={{margin:20}}
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
      </View>
    )
  }
  return (
    <View style={[{ flex: 1 }]}>
      {chatRoomPreviewData}
    </View >
  );
}