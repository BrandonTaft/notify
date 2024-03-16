import { useState, useEffect } from "react";
import { Pressable, View, Text, StyleSheet, ScrollView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { storeBackUpData } from "../api";
import useFetch from '../hooks/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DeletedItems({ showDeleted, setShowDeleted, showNotes, onSuccess }) {

    const [deletedItems, setDeletedItems] = useState([]);
    const [selected, setSelected] = useState([]);
    // const { reminders, isLoading } = useFetch();

    useEffect(() => {
        setSelected([])
        const getDeletedReminders = async () => {
            const jsonValue = await AsyncStorage.getItem('reminders');
            setDeletedItems(JSON.parse(jsonValue))
        }
        getDeletedReminders()
        if (showNotes) setShowDeleted(false)

        if(!showDeleted) {
            let cleared = deletedItems.map((item) => {
                if (item.isChecked === true) {
                    item.isChecked = false
                }
                return item
            })
            console.log("CLEARED", cleared)
            setDeletedItems(cleared)
        }

    }, [showNotes, showDeleted])

    const handleCheck = (reminder) => {
        let temp = deletedItems.map((item) => {
            if (reminder._id === item._id) {
                setSelected([...selected, item._id])
                return { ...item, isChecked: !item.isChecked };
            }
            return item;
        });
        
        setDeletedItems(temp)
    };

    const destroyReminder = () => {
        let remaining = deletedItems.filter(element => !selected.includes(element._id));
        storeBackUpData(remaining)
        .then(() => {
        setDeletedItems(remaining)
        
        setSelected([])
        onSuccess()
        })
    }
// console.log(deletedItems)
    const restoreDeleted = () => {
        let i = 0;
        let x = 0;
        while (i < deletedItems.length && x < selected.length) {
            if (selected.includes(deletedItems[i]._id)) {
                deletedItems[i].isDeleted = false
                deletedItems[i].isChecked = false
                x++
            }
            i++
        }
        storeBackUpData(deletedItems)
        setSelected([])
        onSuccess()
    }

    return (
        <>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: "#8789f7",
                        borderless: false,
                        foreground: false
                    }
                }
                style={[styles.menuBtn, showDeleted && styles.active]}
                onPress={() => {
                    
                    setShowDeleted(!showDeleted)
                }}
            >
                <FontAwesome5 name="trash" size={26} color="#8789f7" />
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
                    <ScrollView >
                        {deletedItems.filter((item) => item.isDeleted).map((reminder) => {
                            return (
                                <View key={reminder._id} style={reminder.notification ? styles.item : styles.altItem}>
                                    <CheckBox
                                        checked={reminder.isChecked}
                                        onPress={() => { handleCheck(reminder) }}
                                        size={25}
                                        containerStyle={styles.checkBox}
                                        right={true}
                                        checkedIcon='check'
                                        checkedColor='#8789f7'
                                        uncheckedIcon='circle-o'
                                        uncheckedColor='#8789f7'
                                    />
                                    <View>
                                        <Text style={styles.itemText} numberOfLines={1}>
                                            {reminder.title}
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
                                    color: "#15131d",
                                    borderless: true,
                                    foreground: false
                                }
                            }
                            style={styles.btn}
                            disabled={!selected.length}
                            onPress={() => restoreDeleted()}
                        >
                            <Text style={styles.btnText}>
                                Restore
                            </Text>
                        </Pressable>
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: "#15131d",
                                    borderless: true,
                                    foreground: false
                                }
                            }
                            style={styles.btn}
                            disabled={!selected.length}
                            onPress={() => destroyReminder()}
                        >
                            <Text style={styles.btnText}>
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
        backgroundColor: '#312e3f',
        borderRadius: 16,
        borderWidth: 3,
        borderColor: '#312e3f',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 22,
        paddingRight: 20,
        paddingVertical: 4,
        marginHorizontal: 4,
        marginTop: 10,
    },
    active: {
        borderColor: '#8789f7',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        marginBottom: 4
    },
    menuBtnText: {
        fontFamily: 'Rubik-Medium',
        color: '#8789f7',
        fontSize: 24,
        marginLeft: 25,
        marginTop: 2
    },
    item: {
        backgroundColor: '#312e3f',
        flexDirection: 'row',
        marginHorizontal: 4,
        marginBottom: 5,
        paddingVertical: 3,
        overflow: 'hidden',
        paddingRight: '15%'
    },
    altItem: {
        backgroundColor: '#312e3f',
        flexDirection: 'row',
        marginHorizontal: 4,
        marginBottom: 5,
        paddingTop: 12,
        paddingBottom: 16,
        overflow: 'hidden',
        paddingRight: '15%'
    },
    itemText: {
        fontFamily: "Rubik-Regular",
        color: 'white',
        fontSize: 18,
        marginRight: 15,
    },
    time: {
        fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 16
    },
    checkBox: {
        backgroundColor: '#2e2e2f',
        padding: 0,
        marginRight: 5,
        marginLeft: 10
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
        paddingVertical: 8,
        backgroundColor: '#15131d',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginHorizontal: 4,
    },
    btnText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 18
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "40%",
        backgroundColor: "#8789f7",
        padding: 7,
        borderRadius: 50,
        elevation: 4
    },
});