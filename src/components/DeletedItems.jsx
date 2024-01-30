import { useState, useEffect } from "react";
import { Pressable, View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { fetchReminders, wipeAll, restoreMany } from "../api";

export default function DeletedItems({ showDeleted, setShowDeleted, showList }) {
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetchReminders()
            .then(result => {
                if (result.success) {
                    setItems(result.deleted)
                    setSelected([])
                }
            })
        if (showList) setShowDeleted(false)
    }, [refresh, showList])

    const handleCheck = (reminder) => {
        let temp = items.map((item) => {
            if (reminder._id === item._id) {
                return { ...item, priority: !item.priority };
            }
            return item;
        });
        setSelected(temp.filter((item) => item.priority).map((item) => item["_id"]))
        setItems(temp);
    };

    const deleteForGood = () => {
        wipeAll(selected)
            .then(result => {
                if (result.success) {
                    setRefresh(!refresh)
                }
            })
    }

    const restoreDeleted = () => {
        restoreMany(selected)
            .then(result => {
                if (result.success) {
                    setRefresh(!refresh)
                }
            })
    }

    return (
        <>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: "#b804d1de",
                        borderless: false,
                        foreground: false
                    }
                }
                style={[styles.menuBtn, showDeleted && styles.active]}
                onPress={() => {
                    let cleared = items.map((item) => {
                        if (item.priority === true) {
                            item.priority = false
                        }
                        return item
                    })
                    setItems(cleared)
                    setShowDeleted(!showDeleted)
                    setSelected([])

                }}
            >
                <FontAwesome5 name="trash" size={28} color="#b804d1de" />
                <Text style={styles.menuBtnText}>
                    Deleted
                </Text>
                {showDeleted ?
                    <FontAwesome5
                        name="chevron-circle-down"
                        size={30} color="#fff"
                        style={{
                            marginLeft: 'auto',
                            marginTop: "auto",
                            marginBottom: 'auto'
                        }}
                    />
                    :
                    <FontAwesome5
                        name="chevron-circle-right"
                        size={30} color="#fff"
                        style={{
                            marginLeft: 'auto',
                            marginTop: "auto",
                            marginBottom: 'auto'
                        }}
                    />
                }
            </Pressable>
            {showDeleted &&
                <>
                    <ScrollView style={{ flex: 1 }}>
                        {items.map((reminder) => {
                            return (
                                <View key={reminder._id} style={styles.item}>
                                    <CheckBox
                                        checked={reminder.priority}
                                        onPress={() => { handleCheck(reminder) }}
                                        size={25}
                                        containerStyle={styles.checkBox}
                                        right={true}
                                        checkedIcon='check'
                                        checkedColor='#b804d1de'
                                        uncheckedIcon='circle-o'
                                        uncheckedColor='#b804d1de'
                                    />
                                    <View style={styles.vertical}>
                                        <Text style={styles.itemText}>
                                            {reminder.name}
                                        </Text>
                                        {reminder.notification &&
                                            <Text style={styles.time}>
                                                {new Date(reminder.notification).toLocaleDateString([], {
                                                    weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                })}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.horizontal}>
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: "#b804d1de",
                                    borderless: false,
                                    foreground: false
                                }
                            }
                            style={styles.wipeBtn}
                            onPress={() => restoreDeleted()}
                        >
                            <Text style={styles.wipeBtnText}>
                                Restore
                            </Text>
                        </Pressable>
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: "#b804d1de",
                                    borderless: false,
                                    foreground: false
                                }
                            }
                            style={styles.wipeBtn}
                            onPress={() => deleteForGood()}
                        >
                            <Text style={styles.wipeBtnText}>
                                Delete
                            </Text>
                        </Pressable>
                    </View>
                </>
            }
        </>
    )
}

const styles = StyleSheet.create({
    menuBtn: {
        backgroundColor: '#2e2e2f',
        borderRadius: 16,
        borderWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
        paddingRight: 20,
        paddingVertical:4,
        marginTop: 10,
        marginBottom: 3
    },
    active: {
        borderColor: '#b804d1de',
    },
    menuBtnText: {
        fontFamily: 'Rubik-Medium',
        color: '#b804d1de',
        fontSize: 24,
        marginLeft: 24,
    },
    item: {
        backgroundColor: '#2e2e2f',
        borderRadius: 16,
        flexDirection: 'row',
        margin: 3,
        marginLeft: 0,
        marginRight: 0,
        padding: 5,
        paddingLeft: 0
    },
    checkBox: {
        backgroundColor: '#2e2e2f',
        padding: 0,
    },
    vertical: {
        flexDirection: 'column',
        alignItems: 'start',
        width: 240
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 16,
        paddingVertical: 8,
        marginTop: 5
    },
    itemText: {
        fontFamily: "Rubik-Regular",
        color: 'white',
        fontSize: 18,
        paddingRight: 6,
    },
    time: {
        fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 17
    },
    wipeBtn: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: "40%",
        backgroundColor: '#b804d1de',
        padding: 6,
        borderRadius: 16,
        bottom: 0
    },
    wipeBtnText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 18
    },
});