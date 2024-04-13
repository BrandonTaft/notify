import { useState, useLayoutEffect, useEffect } from "react";
import { View, FlatList } from "react-native";
import { styles } from "../utils/styles";
import CreateChatComponent from "../components/chatFeature/CreateChatComponent";
import { IconButton, MD3Colors, Text, useTheme, FAB } from 'react-native-paper';
import ChatRoomPreview from "../components/chatFeature/ChatRoomPreview";
import { useSelector, useDispatch } from 'react-redux';
import ChatRoomListItem from "../components/chatFeature/ChatRoomListItem";

const ChatRoomListScreen = ({ navigation }) => {
  const [showCreateChatComponent, setShowCreateChatComponent] = useState(false);
  const rooms = useSelector(state => state.chatRooms);
  const [crooms, setCrooms] = useState([])
  const theme = useTheme();
  console.log("STATEROOMS", rooms)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: { backgroundColor: theme.colors.primaryContainer },
      headerBackTitleStyle : {color:"#FFF"}
      // headerRight: (props) => <RightHeaderButtons {...props} />,
      // headerLeft: (props) => <LeftHeaderButtons {...props} />
    });
    setCrooms(rooms)
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      setCrooms(rooms)
      console.log("RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const data = crooms.map((room) => {
    return(
    <View key={room.id}>
    <ChatRoomListItem item={room} />
    </View>
    )
  })
  return (
    <View style={{ flex: 1 }}>
      <FAB
        icon="plus"
        style={{bottom: 0, right: 0, zIndex:999, margin:20, position:'absolute'}}
        onPress={() => setShowCreateChatComponent(true)}
      />
      <Text variant="titleLarge" style={{ color: theme.colors.textMuted, textAlign: 'center' }}>Chat Rooms</Text>
      <ChatRoomPreview />
      {/* <FlatList
            data={rooms}
            extraData={crooms}
            renderItem={({ item }) => <ChatRoomListItem item={item} />}
            keyExtractor={(item) => item.id}
          /> */}

      <CreateChatComponent
        showCreateChatComponent={showCreateChatComponent}
        setShowCreateChatComponent={setShowCreateChatComponent}
      />

    </View >
  );
};
export default ChatRoomListScreen;