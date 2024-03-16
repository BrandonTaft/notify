import { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import socket from "../utils/socket";
import ChatComponent from "../components/ChatComponent";
import { styles } from "../utils/styles";
import Modal from "../components/Modal";
import { EditButton, AvatarButton } from "../components/Buttons";
import { fetchGroups } from "../api";

const ChatScreen = ({ navigation }) => {
  const [rooms, setRooms] = useState([]);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    fetchGroups()
      .then((data) => setRooms(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setRooms(rooms);
    });
  }, [socket]);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <>
  //         <AvatarButton setVisible={setVisible} />
  //         <EditButton setVisible={setVisible} />
  //       </>
  //     )
  //   });
  // }, [])

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chatlistContainer}>
      <>
        {/* <AvatarButton setVisible={setVisible} /> */}
         <EditButton setVisible={setVisible} />
       </>
        {rooms.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
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
    </SafeAreaView>
  );
};
export default ChatScreen;