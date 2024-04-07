import { useState } from "react";
import { View } from "react-native";
import { styles } from "../utils/styles";
import CreateChat from "../components/chatFeature/CreateChat";
import { IconButton, MD3Colors } from 'react-native-paper';
import ChatRoomPreview from "../components/chatFeature/ChatRoomPreview";

const ChatRoomListScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  
  return (
    <View style={styles.chatRoomListScreen}>
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
     <ChatRoomPreview />
  {
    visible &&
    <CreateChat setVisible={setVisible} />
  }
    </View >
  );
};
export default ChatRoomListScreen;