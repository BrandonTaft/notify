import { useState, useLayoutEffect, useEffect } from "react";
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatRooms } from "../../redux/chatRoomSlice";
import ChatRoomListItem from "./ChatRoomListItem";
import { Text, useTheme, Chip, FAB } from 'react-native-paper';
import {socket} from "../../utils/socket";
import { CreateChatRoom } from "./CreateChatRoom";

export default function ChatRoomList() {
  const [showCreateChatComponent, setShowCreateChatComponent] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const dispatch = useDispatch()
  const theme = useTheme();
  const { rooms, loading } = useSelector(state => state.chatRooms);
  const user = useSelector(state => state.user)

  useLayoutEffect(() => {
    setChatRooms(user.privateRooms)
  }, []);

  return (
    <View style={[{ flex: 1 }]}>
      {rooms.length > 0 ? (
        <>
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatRoomListItem item={item} />}
            keyExtractor={(item) => item._id}
          />
           <FlatList
            data={chatRooms}
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
      <CreateChatRoom
        showCreateChatComponent={showCreateChatComponent}
        setShowCreateChatComponent={setShowCreateChatComponent}
      />
    </View >
  );
}