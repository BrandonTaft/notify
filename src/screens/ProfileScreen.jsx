import { View, Text } from "react-native";
import Menu from "../components/Menu";

function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Menu />
        <Text>Profile</Text>
      </View>
    )
  }
  
  export default ProfileScreen