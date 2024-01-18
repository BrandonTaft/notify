import { Pressable, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ({ open }) {
    return (
        <View style={styles.header}>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: '#121212',
                        foreground: true,
                        borderLess: true
                    }
                }
                style={{ marginRight: 'auto' }}
                onPress={() => open()}
            >
                <MaterialCommunityIcons name="menu" color="white" size={40} />
            </Pressable >
            <Text style={styles.headerTitle}>NOTIFY</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: "Rubik-Black",
        color: '#b804d1de',
        fontSize: 28,
        marginRight: 'auto',
    }
});