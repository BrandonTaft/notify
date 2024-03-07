import { useState , useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import socket from "../utils/socket";
import ChatComponent from "../components/ChatComponent";
import { styles } from "../utils/styles";
import Modal from "../components/Modal";
const Chat = () => {
  const [rooms, setRooms] = useState([]);
  const [visible, setVisible] = useState(false);
  //👇🏻 Runs when the component mounts
useLayoutEffect(() => {
  function fetchGroups() {
      fetch("https://64e3-75-131-25-248.ngrok-free.app/api")
          .then((res) => res.json())
          .then((data) => setRooms(data))
          .catch((err) => console.error(err));
  }
  fetchGroups();
}, []);

//👇🏻 Runs whenever there is new trigger from the backend
useEffect(() => {
  socket.on("roomsList", (rooms) => {
      setRooms(rooms);
  });visible
}, [socket]);
    //👇🏻 Dummy list of rooms
    // const rooms = [
    //     {
    //         id: "1",
    //         name: "Novu Hangouts",
    //         messages: [
    //             {
    //                 id: "1a",
    //                 text: "Hello guys, welcome!",
    //                 time: "07:50",
    //                 user: "Tomer",
    //             },
    //             {
    //                 id: "1b",
    //                 text: "Hi Tomer, thank you! 😇",
    //                 time: "08:50",
    //                 user: "David",
    //             },
    //         ],
    //     },
    //     {
    //         id: "2",
    //         name: "Hacksquad Team 1",
    //         messages: [
    //             {
    //                 id: "2a",
    //                 text: "Guys, who's awake? 🙏🏽",
    //                 time: "12:50",
    //                 user: "Team Leader",
    //             },
    //             {
    //                 id: "2b",
    //                 text: "What's up? 🧑🏻‍💻",
    //                 time: "03:50",
    //                 user: "Victoria",
    //             },
    //         ],
    //     },
    // ];

    return (
        <SafeAreaView style={styles.chatscreen}>
            <View style={styles.chattopContainer}>
                <View style={styles.chatheader}>
                    <Text style={styles.chatheading}>Chats</Text>

            {/* 👇🏻 Logs "ButtonPressed" to the console when the icon is clicked */}
            <Pressable onPress={() => setVisible(true)}>
                        <Feather name='edit' size={49} color='green' />
                    </Pressable>
                </View>
            </View>

            <View style={styles.chatlistContainer}>
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

export default Chat;