import { Pressable, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import DeletedItems from "./DeletedItems";
import Notes from "./Notes";

export default function Menu({ reminders, onSucess, setShowPicker, close }) {
    
    return (
        <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: '#2e2e2f',
                            foreground: true,
                            borderLess: true
                        }
                    }
                    style={styles.drawerHeaderIcon}
                    onPress={() => close()}
                >
                    <MaterialCommunityIcons name="close-circle" color="#b804d1de" size={40} />
                </Pressable >
                <Text style={styles.drawerHeaderText}>NOTIFY</Text>
            </View>

            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: '#2e2e2f',
                        foreground: true,
                        borderLess: true
                    }
                }
                onPress={() => {
                   setShowPicker(prev => !prev)
                    close()
                }}
                    style={styles.menuBtn}
            >
                <MaterialCommunityIcons name="timer" size={30} color="#b804d1de" />
                <Text style={styles.menuBtnText}>Timer</Text>
                <FontAwesome5 name="chevron-circle-right" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: 5 }} />
            </Pressable>

            <Notes />

            <DeletedItems
                reminders={reminders}
                onSucess={onSucess}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        paddingLeft:5,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#000",
        marginTop: 16,
        paddingLeft: 20
    },
    drawerHeaderText: {
        fontFamily: "Rubik-Black",
        color: '#b804d1de',
        fontSize: 28,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    drawerHeaderIcon: {
        position: 'absolute',
        left: 15
    },
    menuBtn: {
        backgroundColor: '#2e2e2f',
        borderRadius: 16,
        borderWidth:5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10
    },
    menuBtnText: {
        fontFamily: 'Rubik-Bold',
        color: '#b804d1de',
        fontSize: 24,
        margin: 16,
        marginBottom: 8
    }
});