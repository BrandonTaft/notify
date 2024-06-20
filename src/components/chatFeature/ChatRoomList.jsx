import { useState, useLayoutEffect, useEffect } from "react";
import { View, FlatList } from "react-native";
import { fetchGroups } from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { addChatRoom, addAllRoomsFromServer } from "../../redux/chatRoomSlice";
import ChatRoomListItem from "./ChatRoomListItem";
import { Text, useTheme, Chip, FAB } from 'react-native-paper';
import {socket, publicSocket, privateSocket} from "../../utils/socket";
import { CreateChatComponent } from "./CreateChatComponent";

export default function ChatRoomList() {
  const [showCreateChatComponent, setShowCreateChatComponent] = useState(false);
  const dispatch = useDispatch()
  const theme = useTheme();
  const rooms = useSelector(state => state.chatRooms);

  useLayoutEffect(() => {
    fetchGroups()
      .then((result) => {
        if (result.success) {
          dispatch(addAllRoomsFromServer(result.chatRooms))
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  useEffect(() => {
    socket.on("chatRoomList", (rooms) => {
      dispatch(addChatRoom(rooms))
    });
  }, [socket]);


  return (
    <View style={[{ flex: 1 }]}>
      {rooms.length > 0 ? (
        <>
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatRoomListItem item={item} />}
            keyExtractor={(item) => item._id}
          />
          <FAB
            icon="plus"
            style={{
              position: 'absolute',
              margin: 8,
              right: 0,
              bottom: 0,
            }}
            onPress={() => setShowCreateChatComponent(true)}
          />
        </>
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