import { Pressable, View, Text, StyleSheet } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import DeletedItems from "./DeletedItems";
import Notes from "./Notes";

export default function Menu({
    setShowPicker,
    close,
    refresh,
    setRefresh,
    showDeleted,
    setShowDeleted,
    showNotes,
    setShowNotes
}) {
    return (
        <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: "#8789f7",
                            borderless: true,
                            foreground: false
                        }
                    }
                    style={styles.drawerHeaderIcon}
                    onPress={() => {
                        setShowDeleted(false)
                        setShowDeleted(false)
                        close()
                    }}
                >
                    <MaterialCommunityIcons name="close-circle" color="#8789f7" size={35} />
                </Pressable >
                <Text style={styles.drawerHeaderText}>
                    NOTIFY
                </Text>
            </View>
            <View style={styles.spacer}></View>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: "#8789f7",
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
                <MaterialCommunityIcons name="timer" size={34} color="#8789f7" />
                <Text style={styles.menuBtnText}>
                    Timer
                </Text>
                <FontAwesome5 name="chevron-circle-right" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: "auto", marginBottom: 'auto' }} />
            </Pressable>
            {/* <Notes
                showNotes={showNotes}
                setShowNotes={setShowNotes}
                showDeleted={showDeleted}
                setShowDeleted={setShowDeleted}
                refresh={refresh}
                setRefresh={setRefresh}
            />*/}
            {!showNotes &&
            <DeletedItems
                showDeleted={showDeleted}
                setShowDeleted={setShowDeleted}
                showNotes={showNotes}
                refresh={refresh}
                setRefresh={setRefresh}
            />
} 
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
        backgroundColor:'#15131d',
        paddingTop: 10,
        paddingLeft: 20
    },
    drawerHeaderText: {
        fontFamily: "Rubik-Black",
        color: '#8789f7',
        fontSize: 28,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    drawerHeaderIcon: {
        position: 'absolute',
        left: 15,
        top:20
    },
    spacer: {
        width: '95%',
        height: 4,
        borderRadius: 22,
        backgroundColor: '#cdcddd',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 14
    },
    menuBtn: {
        backgroundColor: '#312e3f',
        borderRadius: 16,
        borderWidth: 3,
        borderColor: '#312e3f',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical:4,
        marginHorizontal:4,
    },
    active: {
        borderColor: '#8789f7',
    },
    menuBtnText: {
        fontFamily: 'Rubik-Medium',
        color: '#8789f7',
        fontSize: 24,
        marginLeft: 20,
        marginTop:2
    },
});