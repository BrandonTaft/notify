import { Feather, FontAwesome } from "@expo/vector-icons";
import { Pressable, View, Text } from "react-native";
import { Button, icon } from '@rneui/themed';


function AvatarButton({ setVisible, styles, handlePress }) {
    return (
            <Pressable style={styles} onPress={handlePress}>
                <FontAwesome name='user-circle-o' size={36} style={styles} />
            </Pressable>
    )
}

function EditButton({ setVisible }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Pressable onPress={() => setVisible(true)}>
                {/* <Feather name='edit' size={38} style={styles.headerEditIcon} /> */}
            </Pressable>
        </View>
    )
}

function AddButton({ setVisible }) {
    return (
        <Button
              icon={{
                name: 'home',
                type: 'font-awesome',
                size: 25,
                color: 'white',
              }}
              containerStyle={{
                
                
              }}
            />
    )
}



export { EditButton, AvatarButton, AddButton }