import { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { addNote, updateNote, fetchNotes, wipeAll } from '../api';

function Notes() {
    const [showList, setShowList] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [note, setNote] = useState();
    const [items, setItems] = useState([]);
    const [selected, setSelected] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        fetchNotes()
            .then(result => {
                if (result.success) {
                    setItems(result.notes)
                    setSelected([])
                }
            })
    }, [refresh, showList])

    const handleNote = () => {
        if (note) {
            addNote(note)
                .then(result => {
                    if (result.success) {
                        setShowNotes(false)
                        setNote()
                        setRefresh(!refresh)
                    }
                })
        }
    };

    const handleUpdate = () => {
        if (note) {
            updateNote(note)
                .then(result => {
                    if (result.success) {
                        setIsUpdate(false)
                        setShowNotes(false)
                        setNote()
                        setRefresh(!refresh)
                    }
                })
        }
    };

    const handleCheck = (reminder) => {
        let temp = items.map((item) => {
            if (reminder._id === item._id) {
                if (item.priority === false) {
                    setSelected([...selected, item._id]);
                } else if (item.priority === true) {
                    setSelected(selected.filter(existing => existing !== item._id));
                }
                return { ...item, priority: !item.priority };
            }
            return item;
        });
        setItems(temp)
    };

    const deleteChecked = () => {
        wipeAll(selected)
            .then(result => {
                if (result.success) {
                    setRefresh(!refresh)
                }
            })
    }

    const deleteNote = () => {
        wipeAll([note._id])
            .then(result => {
                if (result.success) {
                    setRefresh(!refresh)
                    setShowNotes(false)
                    setNote()
                }
            })
    }

    return (
        <>
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: '#2e2e2f',
                        foreground: true,
                        borderLess: true
                    }
                }
                onPress={() => {
                    setShowList(!showList)
                }}
                style={[styles.menuBtn, showList && styles.active]}
            >
                <MaterialIcons
                    name="event-note"
                    size={30}
                    color="#b804d1de"
                />
                <Text style={styles.menuBtnText}>
                    Notes
                </Text>
                <FontAwesome5
                    name="chevron-circle-right"
                    size={30} color="#fff"
                    style={{
                        marginLeft: 'auto',
                        marginTop: 5
                    }}
                />
            </Pressable>
            {showList &&
                <>
                    <ScrollView style={{ flex: 1 }}>
                        {items.map((reminder) => {
                            return (
                                <Pressable android_ripple={
                                    RippleConfig = {
                                        color: '#2e2e2f',
                                        foreground: true,
                                        borderLess: true
                                    }
                                }
                                    key={reminder._id}
                                    style={styles.item}
                                    onPress={() => {
                                        setIsUpdate(true)
                                        setShowNotes(true)
                                        setNote(reminder)
                                    }}
                                >
                                    <CheckBox
                                        checked={reminder.priority}
                                        onPress={() => handleCheck(reminder)}
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
                                            {reminder.name.split('\n')[0] + '...'}
                                        </Text>
                                        <Text style={styles.time}>
                                            {new Date(reminder.time).toLocaleDateString([], {
                                                weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.horizontal}>
                        <Pressable android_ripple={
                            RippleConfig = {
                                color: '#2e2e2f',
                                foreground: true,
                                borderLess: true
                            }
                        }
                            style={styles.round}
                            onPress={() => setShowNotes(true)}
                        >
                            <MaterialIcons
                                name="note-add"
                                size={40}
                                color="#b804d1de"
                            />

                        </Pressable>
                        <Pressable android_ripple={
                            RippleConfig = {
                                color: '#2e2e2f',
                                foreground: true,
                                borderLess: true
                            }
                        }
                            onPress={() => deleteChecked()}
                            style={styles.round}
                            disabled={selected.length === 0}
                        >
                            <MaterialIcons
                                name="delete"
                                size={40}
                                color="#b804d1de"
                            />
                        </Pressable>
                    </View>
                </>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={showNotes}
                onRequestClose={() => {
                }}>
                <View style={styles.notes}>
                    <Text style={styles.title}>Notes</Text>
                    <TextInput
                        autoFocus={!note}
                        multiline={true}
                        numberOfLines={6}
                        placeholderTextColor="#fff"
                        style={styles.input}
                        onChangeText={(value) => setNote({ ...note, "name": value })}
                        value={note ? note.name : ""}
                    />
                    <View style={[styles.horizontal, styles.inputPanel]}>
                        <Pressable android_ripple={
                            RippleConfig = {
                                color: '#2e2e2f',
                                foreground: true,
                                borderLess: true
                            }
                        }
                            disabled={!note}
                            style={[styles.round, styles.pink]}
                            onPress={() => {
                                if (isUpdate) {
                                    handleUpdate(note)
                                } else {
                                    handleNote(note.name)
                                }
                            }}
                        >
                            <Text style={styles.btnText}>
                                Save
                            </Text>
                        </Pressable>
                        <Pressable android_ripple={
                            RippleConfig = {
                                color: '#2e2e2f',
                                foreground: true,
                                borderLess: true
                            }
                        }
                            onPress={() => deleteNote()}
                            style={[styles.round, styles.pink]}
                           disabled={!note}
                        >
                            <MaterialIcons
                                name="delete"
                                size={40}
                                color="#fff"
                            />
                        </Pressable>
                        <Pressable android_ripple={
                            RippleConfig = {
                                color: '#2e2e2f',
                                foreground: true,
                                borderLess: true
                            }
                        }
                            style={[styles.round, styles.pink]}
                            onPress={() => {
                                setShowNotes(false)
                                setNote()
                                setIsUpdate(false)
                            }}
                        >
                            <Text style={[styles.btnText, styles.x]}>
                                x
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default Notes

const styles = StyleSheet.create({
    notes: {
        flex: 1,
        backgroundColor: '#121212'
    },
    menuBtn: {
        backgroundColor: '#2e2e2f',
        borderRadius: 16,
        borderWidth: 5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
    },
    active: {
        borderColor: '#b804d1de',
    },
    menuBtnText: {
        fontFamily: 'Rubik-Bold',
        color: '#b804d1de',
        fontSize: 24,
        margin: 16,
        marginBottom: 8
    },
    time: {
        fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 17
    },
    title: {
        fontFamily: 'Rubik-Black',
        color: '#b804d1de',
        fontSize: 40,
        textAlign: "center",
    },
    input: {
        fontSize: 20,
        flex: 4,
        color: '#fff',
        backgroundColor: '#2e2e2f',
        borderRadius: 10,
        margin: 15,
        marginTop: 0,
        textAlignVertical: 'top',
        paddingVertical: 22,
        paddingHorizontal: 10
    },
    horizontal: {
        backgroundColor: '#b804d1de',
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        
        borderRadius: 10,
        borderBottomWidth: 0,
    },
    inputPanel: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom:50,
        marginTop:20,
        paddingVertical: 12,
        backgroundColor: '#2e2e2f',
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 60,
        height: 60,
        elevation: 2,
    },
    pink: {
        backgroundColor: '#b804d1de',
        width: 80,
        height: 80,
    },
    btnText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: 'Rubik-Bold',
    },
    x: {
        fontSize: 32,
        fontFamily: 'Rubik-Regular',
    },
    item: {
        backgroundColor: '#2e2e2f',
        borderRadius: 12,
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 8,
        paddingBottom: 8,
        overflow: 'hidden',
    },
    checkBox: {
        backgroundColor: '#2e2e2f',
        padding: 0,
        marginRight: 2,
        marginLeft: 10
    },
    vertical: {
        flexDirection: 'column',
        alignItems: 'stat',
        paddingRight: 30
    },
    itemText: {
        fontFamily: "Rubik-Regular",
        color: 'white',
        fontSize: 19,
        marginRight: 15
    }
})