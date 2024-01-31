import { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { addNote, updateNote, fetchNotes, deleteMany } from '../api';

export default function Notes({ showNotes, setShowNotes, showDeleted }) {
    const [showInput, setShowInput] = useState(false);
    const [note, setNote] = useState();
    const [edit, setEdit] = useState(false);
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
        if (showDeleted) setShowNotes(false);
    }, [refresh, showDeleted]);

    const handleNote = () => {
        if (note) {
            addNote(note)
                .then(result => {
                    if (result.success) {
                        setShowInput(false)
                        setNote()
                        setRefresh(!refresh)
                        setEdit(false)
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
                        setShowInput(false)
                        setNote()
                        setRefresh(!refresh)
                        setEdit(false)
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
        deleteMany(selected)
            .then(result => {
                if (result.success) {
                    setRefresh(!refresh)
                }
            })
    }

    const handleDelete = () => {
        deleteMany([note._id])
            .then(result => {
                if (result.success) {
                    setRefresh(!refresh)
                    setShowInput(false)
                    setNote()
                    setEdit(false)
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
                style={[styles.menuBtn, showNotes && styles.active]}
                onPress={() => {
                    setShowNotes(!showNotes)
                }}
            >
                <MaterialIcons
                    name="event-note"
                    size={28}
                    color="#b804d1de"
                />
                <Text style={styles.menuBtnText}>
                    Notes
                </Text>
                {showNotes ?
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
            {showNotes &&
                <>
                    <ScrollView>
                        {items.map((reminder) => {
                            return (
                                <Pressable
                                    android_ripple={
                                        RippleConfig = {
                                            color: "#b804d1de",
                                            borderless: false,
                                            foreground: false
                                        }
                                    }
                                    key={reminder._id}
                                    style={styles.item}
                                    onPress={() => {
                                        setIsUpdate(true)
                                        setShowInput(true)
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
                                    <View>
                                        <Text style={styles.itemText}>
                                            {reminder.name}
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
                    <View style={styles.topHorizontal}>
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: "#b804d1de",
                                    borderless: false,
                                    foreground: false
                                }
                            }
                            style={styles.btn}
                            onPress={() => setShowInput(true)}
                        >
                            <MaterialIcons
                                name="note-add"
                                size={34}
                                color="#fff"
                            />
                        </Pressable>
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: "#b804d1de",
                                    borderless: false,
                                    foreground: false
                                }
                            }
                            style={styles.btn}
                            disabled={selected.length === 0}
                            onPress={() => deleteChecked()}
                        >
                            <MaterialIcons
                                name="delete"
                                size={34}
                                color="#fff"
                            />
                        </Pressable>
                    </View>
                </>
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={showInput}
                onRequestClose={() => {
                }}>
                <View style={styles.notes}>
                    <Text style={styles.title}>
                        Notes
                    </Text>
                    <TextInput
                        autoFocus={!note}
                        multiline={true}
                        numberOfLines={6}
                        placeholderTextColor="#fff"
                        style={styles.input}
                        onChangeText={(value) => setNote({ ...note, "name": value })}
                        onFocus={() => setEdit(true)}
                        value={note ? note.name : ""}
                    />
                    <View style={ styles.inputPanel }>
                        {!edit ?
                            <>
                                <Pressable
                                    android_ripple={
                                        RippleConfig = {
                                            color: "#b804d1de",
                                            borderless: false,
                                            foreground: false
                                        }
                                    }
                                    style={styles.editBtn}
                                    onPress={() => setEdit(true)}
                                >
                                    <Text style={[styles.editBtnText]}>
                                        Edit
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
                                    style={styles.editBtn}
                                    onPress={() => {
                                        setShowInput(false)
                                        setNote()
                                    }}
                                >
                                    <Text style={[styles.editBtnText]}>
                                        Cancel
                                    </Text>
                                </Pressable>
                            </>
                            :
                            <>
                                <Pressable
                                    android_ripple={
                                        RippleConfig = {
                                            color: "#b804d1de",
                                            borderless: false,
                                            foreground: false
                                        }
                                    }
                                    disabled={!note}
                                    style={[styles.round]}
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
                                <Pressable
                                    android_ripple={
                                        RippleConfig = {
                                            color: "#b804d1de",
                                            borderless: false,
                                            foreground: false
                                        }
                                    }
                                    style={[styles.round]}
                                    disabled={!note}
                                    onPress={() => handleDelete()}
                                >
                                    <MaterialIcons
                                        name="delete"
                                        size={36}
                                        color="#fff"
                                    />
                                </Pressable>
                                <Pressable
                                    android_ripple={
                                        RippleConfig = {
                                            color: "#b804d1de",
                                            borderless: false,
                                            foreground: false
                                        }
                                    }
                                    style={[styles.round]}
                                    onPress={() => {
                                        setEdit(false)
                                        setShowInput(false)
                                        setNote()
                                        setIsUpdate(false)
                                    }}
                                >
                                    <Text style={[styles.btnText, styles.x]}>
                                        x
                                    </Text>
                                </Pressable>
                            </>
                        }
                    </View>
                </View>
            </Modal>
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
        marginLeft: 22,
    },
    
    
    
    topHorizontal: {
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 16,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "35%",
        backgroundColor: '#b804d1de',
        padding: 6,
        borderRadius: 16,
    },
    
    
    
    
    
   
    
    item: {
        backgroundColor: '#2e2e2f',
        borderRadius: 16,
        flexDirection: 'row',
        margin: 5,
        marginBottom:1,
        paddingVertical: 3,
        overflow: 'hidden',
    },
    checkBox: {
        backgroundColor: '#2e2e2f',
        padding: 0,
        marginRight: 5,
        marginLeft: 10
    },
    itemText: {
        fontFamily: "Rubik-Regular",
        color: 'white',
        fontSize: 18,
        marginRight: 15
    },
    time: {
        fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 15
    },
    notes: {
        flex: 1,
        backgroundColor: '#121212'
    },
    title: {
        fontFamily: 'Rubik-Bold',
        color: '#b804d1de',
        fontSize: 40,
        textAlign: "center",
    },
    input: {
        fontSize: 18,
        fontFamily: 'Rubik-Light',
        flex: 4,
        color: '#fff',
        backgroundColor: '#2e2e2f',
        borderRadius: 10,
        margin: 12,
        marginVertical: 0,
        textAlignVertical: 'top',
        padding:10
    },
    inputPanel: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 16,
        marginHorizontal: 15,
        marginVertical: 20,
        paddingVertical: 10,
        backgroundColor: '#2e2e2f',
    },
    editBtn: {
        backgroundColor: '#b804d1de',
        flexDirection: 'row',
        width: '45%',
        justifyContent: 'center',
        borderRadius: 16,
        paddingVertical: 4
    },
    editBtnText: {
        fontFamily: 'Rubik-Medium',
        color: '#fff',
        fontSize: 20,
        marginHorizontal: 32,
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b804d1de',
        borderRadius: 50,
        width: 70,
        height: 70,
        elevation: 2,
    },
    x: {
        fontSize: 32,
    },
    btnText: {
        fontSize: 18,
        color: "#fff",
        fontFamily: 'Rubik-Medium',
    }
})