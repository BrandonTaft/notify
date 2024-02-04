import { Pressable, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ({ open }) {
    return (
        <View style={styles.header}>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: '#8789f7',
                        foreground: true,
                        borderLess: true
                    }
                }
                style={styles.menuIcon}
                onPress={() => open()}
            >
                <MaterialCommunityIcons name="menu" color="white" size={42} />
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
        justifyContent:'center'
    },
    headerTitle: {
        fontFamily: "Rubik-Black",
        color: '#8789f7',
        fontSize: 28,
    },
    menuIcon : {
        position:'absolute',
        left:15,
        top:15
    }
});