import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "react-native";


export function AvatarButton({ styles, handlePress }) {
    return (
            <Pressable style={styles} onPress={handlePress}>
                <FontAwesome name='user-circle-o' size={36} style={styles} />
            </Pressable>
    )
}