import { useState, useLayoutEffect } from "react";
import { View } from "react-native";
import { styles } from "../utils/styles";
import CreateChatComponent from "../components/chatFeature/CreateChatComponent";
import { Text, useTheme, FAB } from 'react-native-paper';
import ChatRoomPreview from "../components/chatFeature/ChatRoomPreview";

const ChatRoomListScreen = ({ navigation }) => {
  const [showCreateChatComponent, setShowCreateChatComponent] = useState(false);
  const theme = useTheme();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: { backgroundColor: theme.colors.primaryContainer },
      headerBackTitleStyle : {color:"#FFF"}
      // headerRight: (props) => <RightHeaderButtons {...props} />,
      // headerLeft: (props) => <LeftHeaderButtons {...props} />
    });
  }, []);
  
  return (
    <View style={{ flex: 1 }}>
      <FAB
        icon="plus"
        style={{bottom: 0, right: 0, zIndex:999, margin:20, position:'absolute'}}
        onPress={() => setShowCreateChatComponent(true)}
      />
      <Text variant="titleLarge" style={{ color: theme.colors.textMuted, textAlign: 'center' }}>Chat Rooms</Text>
      <ChatRoomPreview />
      <CreateChatComponent
        showCreateChatComponent={showCreateChatComponent}
        setShowCreateChatComponent={setShowCreateChatComponent}
      />

    </View >
  );
};
export default ChatRoomListScreen;