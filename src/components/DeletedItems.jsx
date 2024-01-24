import { useRef, useState, useCallback, useEffect } from "react";
import { Pressable, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { fetchReminders, wipeAll } from "../api";

function DeletedItems() {
    const [showDeleted, setShowDeleted] = useState(false);
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
    }, [refresh, showDeleted])

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
    
    return (
        <>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: '#121212',
                        foreground: true,
                        borderLess: true
                    }
                }
                onPress={() => {
                    let cleared = items.map((item) => {
                        if(item.priority === true) {
                            item.priority = false
                        }
                        return item
                    })
                    setItems(cleared)
                    setShowDeleted(!showDeleted)
                    setSelected([])
                    
                }}
                style={[styles.menuBtn, showDeleted && styles.active]}
            >
                <FontAwesome5 name="trash" size={28} color="#b804d1de" />
                <Text style={styles.menuBtnText}>Deleted</Text>
                {showDeleted ?
                    <FontAwesome5 name="chevron-circle-down" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: 5 }} />
                    :
                    <FontAwesome5 name="chevron-circle-right" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: 5 }} />
                }
            </Pressable>
            {showDeleted &&
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
                                <View style={styles.horizontal}>
                                    <Text style={styles.itemText}>{reminder.name}</Text>

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
            }
            {selected.length > 0 ?

                <Pressable
                    onPress={() => deleteForGood()}
                    style={styles.wipeBtn}
                >
                    <FontAwesome5 name="trash" size={28} color="#fff" />
                    <Text style={styles.wipeBtnText}>Delete for good</Text>
                </Pressable>
                : ""
            }
        </>
    )
}

const styles = StyleSheet.create({
    menuBtn: {
        backgroundColor: '#2e2e2f',
        borderRadius: 16,
        borderWidth:5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom:3
    },
    active: {
        borderColor:'#b804d1de',
    },
    menuBtnText: {
        fontFamily: 'Rubik-Bold',
        color: '#b804d1de',
        fontSize: 24,
        margin: 16,
        marginBottom: 8
    },
    item: {
        backgroundColor: '#2e2e2f',
        borderRadius: 16,
        flexDirection: 'row',
        margin: 3,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 16,
        paddingBottom: 16
    },
    checkBox: {
        backgroundColor: '#2e2e2f',
        padding: 0,
    },
    horizontal: {
        flexDirection: 'column',
        alignItems: 'stat',
    },
    itemText: {
        fontFamily: "Rubik-Regular",
        color: 'white',
        fontSize: 19,
    },
    time: {
        fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 17
    },
    wipeBtn: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
       width:"100%",
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 5,
        position: "absolute",
        zIndex: 99,
       marginLeft:5,
        bottom: 0
    },
    wipeBtnText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 20
    },

});

export default DeletedItems