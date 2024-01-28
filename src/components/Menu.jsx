import { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import DeletedItems from "./DeletedItems";
import Notes from "./Notes";

export default function Menu({ setShowPicker, close }) {

    const [showDeleted, setShowDeleted] = useState(false);
    const [showList, setShowList] = useState(false);

    return (
        <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: "#b804d1de",
                            borderless: false,
                            foreground: false
                        }
                    }
                    style={styles.drawerHeaderIcon}
                    onPress={() => close()}
                >
                    <MaterialCommunityIcons name="close-circle" color="#b804d1de" size={40} />
                </Pressable >
                <Text style={styles.drawerHeaderText}>
                    NOTIFY
                </Text>
            </View>
            <View style={styles.spacer}></View>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: "#b804d1de",
                        borderless: false,
                        foreground: false
                    }
                }
                style={styles.menuBtn}
                onPress={() => {
                    setShowPicker(prev => !prev)
                    close()
                }}
            >
                <MaterialCommunityIcons name="timer" size={34} color="#b804d1de" />
                <Text style={styles.menuBtnText}>
                    Timer
                </Text>
                <FontAwesome5 name="chevron-circle-right" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: "auto", marginBottom: 'auto' }} />
            </Pressable>
            <Notes
                showList={showList}
                setShowList={setShowList}
                showDeleted={showDeleted}
            />
            <DeletedItems
                showDeleted={showDeleted}
                setShowDeleted={setShowDeleted}
                showList={showList}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    drawer: {
        flex: 1,
        paddingLeft: 5,
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#000",
        marginTop: 24,
        marginBottom: 12,
        paddingLeft: 20
    },
    spacer: {
        width: '90%',
        height: 6,
        borderRadius: 22,
        backgroundColor: '#b804d1de',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 24
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
        borderWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 3
    },
    active: {
        borderColor: '#b804d1de',
    },
    menuBtnText: {
        fontFamily: 'Rubik-Bold',
        color: '#b804d1de',
        fontSize: 22,
        margin: 8,
        marginLeft: 20,
        marginBottom: 4
    },
});