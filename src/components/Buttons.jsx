import { Feather, FontAwesome } from "@expo/vector-icons";
import { Pressable, View, Text } from "react-native";
import { styles } from "../utils/styles";

function AvatarButton({ setVisible }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable >
                <FontAwesome name='user-circle-o' size={36} style={styles.headerAvatarIcon} />
            </Pressable>
        </View>
    )
}

function EditButton({ setVisible }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={() => setVisible(true)}>
                <Feather name='edit' size={38} style={styles.headerEditIcon} />
            </Pressable>
        </View>
    )
}

export { EditButton, AvatarButton }