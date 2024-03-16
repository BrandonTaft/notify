import { Pressable, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AvatarButton } from "./Buttons";
import { styles } from "../utils/styles";



export default function ({ open, navigation }) {
    return (
        <View style={styles.header}>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: '#8789f7',
                        foreground: true,
                        borderLess: false
                    }
                }
                style={styles.menuIcon}
                onPress={() => open()}
            >
                <MaterialCommunityIcons name="menu" color="white" size={44} />
            </Pressable >
            <AvatarButton styles={styles.headerAvatarIcon} handlePress={() => navigation.navigate("Messaging")} />
            {/* <Text style={styles.headerTitle}>NOTIFY</Text> */}
        </View>
    )
};