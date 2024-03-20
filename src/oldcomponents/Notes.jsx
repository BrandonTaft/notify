import { useEffect, useState } from "react";
import { Pressable, View, Text, StyleSheet, Modal, TextInput, ScrollView } from "react-native";
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import * as Crypto from 'expo-crypto';
import { storeBackUpData } from '../api';

export default function Notes({
    reminders,
    showNotes,
    setShowNotes,
    showDeleted,
    setShowDeleted,
    onSuccess
}) {
    const [showInput, setShowInput] = useState(false);
    const [note, setNote] = useState({});
    const [edit, setEdit] = useState(false);
    const [notes, setNotes] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);

    useEffect(() => {
        setSelected([])
        setNotes(reminders.filter((item) => item.isNote && !item.isDeleted))
    }, [reminders, showDeleted]);

    const handleNewNote = () => {
        const UUID = Crypto.randomUUID();
        let newDate = new Date()
        if (note) {
            reminders.push({
                _id: UUID,
                title: note.title,
                isChecked: false,
                isCompleted: false,
                isDeleted: false,
                isNote: true,
                time: newDate,
            })
            storeBackUpData(reminders)
            setShowInput(false)
            setNote({})
            onSuccess()
            setEdit(false)
        }
    };

    const handleNoteEdit = () => {
        let newDate = new Date()

        let temp = reminders.map((reminder) => {
            if (reminder._id === note._id) {
                reminder.title = note.title
                reminder.time = newDate
                return reminder
            }
            return reminder
        })
        storeBackUpData(temp)
        setIsUpdate(false)
        setShowInput(false)
        setNote({})
        onSuccess()
        setEdit(false)
    };

    const handleCheck = (note) => {
        let temp = notes.map((item) => {
            if (note._id === item._id) {
                if (item.isCompleted === false) {
                    setSelected([...selected, item._id]);
                } else if (item.isCompleted === true) {
                    setSelected(selected.filter(existing => existing !== item._id));
                }
                return { ...item, isCompleted: !item.isCompleted };
            }
            return item;
        });
        setNotes(temp)
    };

    const handleDelete = (checked) => {
        let i = 0;
        let x = 0;
        while (i < reminders.length && x < checked.length) {
            if (checked.includes(reminders[i]._id)) {
                reminders[i].isDeleted = true
                x++
            }
            i++
        }
        storeBackUpData(reminders)
        onSuccess()
        setShowInput(false)
        setNote({})
        setEdit(false)
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
                style={[styles.menuBtn, showNotes && styles.active]}
                onPress={() => {
                    setShowNotes(!showNotes)
                    if (showNotes) {
                        setShowDeleted(false)
                    }
                }}
            >
                <MaterialIcons
                    name="event-note"
                    size={28}
                    color="#8789f7"
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
                        {notes.map((note) => {
                            return (
                                <Pressable
                                    android_ripple={
                                        RippleConfig = {
                                            color: "#8789f7",
                                            borderless: false,
                                            foreground: true
                                        }
                                    }
                                    key={note._id}
                                    style={styles.item}
                                    onPress={() => {
                                        setIsUpdate(true)
                                        setShowInput(true)
                                        setNote(note)
                                    }}
                                >
                                    <CheckBox
                                        checked={note.isCompleted}
                                        onPress={() => handleCheck(note)}
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
                                            {note.title}
                                        </Text>
                                        <Text style={styles.time}>
                                            {new Date(note.time).toLocaleDateString([], {
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
                                    color: "#15131d",
                                    borderless: true,
                                    foreground: false
                                }
                            }
                            style={styles.btn}
                            onPress={() => setShowInput(true)}
                        >
                            <MaterialIcons
                                name="note-add"
                                size={36}
                                color="#fff"
                            />
                        </Pressable>
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: "#15131d",
                                    borderless: true,
                                    foreground: false
                                }
                            }
                            style={[styles.btn]}
                            disabled={!selected.length}
                            onPress={() => handleDelete(selected)}
                        >
                            <MaterialIcons
                                name="delete"
                                size={36}
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
                        onChangeText={(value) => setNote({ ...note, "title": value })}
                        onFocus={() => setEdit(true)}
                        value={note ? note.title : ""}
                    />
                    <View style={styles.inputPanel}>
                        {!edit ?
                            <>
                                <Pressable
                                    android_ripple={
                                        RippleConfig = {
                                            color: "#312e3f",
                                            borderless: true,
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
                                            color: "#312e3f",
                                            borderless: true,
                                            foreground: false,
                                        }
                                    }
                                    style={styles.editBtn}
                                    onPress={() => {
                                        setShowInput(false)
                                        setNote({})
                                        setIsUpdate(false)
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
                                            color: "#312e3f",
                                            borderless: true,
                                            foreground: false
                                        }
                                    }
                                    disabled={!note}
                                    style={[styles.round]}
                                    onPress={() => {
                                        if (isUpdate) {
                                            handleNoteEdit(note)
                                        } else {
                                            handleNewNote(note)
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
                                            color: "#312e3f",
                                            borderless: true,
                                            foreground: false
                                        }
                                    }
                                    style={[styles.round]}
                                    disabled={!note}
                                    onPress={() => handleDelete([note._id])}
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
                                            color: "#312e3f",
                                            borderless: true,
                                            foreground: false
                                        }
                                    }
                                    style={[styles.round]}
                                    onPress={() => {
                                        setEdit(false)
                                        setShowInput(false)
                                        setNote({})
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
    topHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#15131d',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginHorizontal: 4,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "35%",
        backgroundColor: "#8789f7",
        padding: 6,
        borderRadius: 50,
        elevation: 3
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
    checkBox: {
        backgroundColor: '#312e3f',
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
        fontSize: 16
    },
    notes: {
        flex: 1,
        backgroundColor: '#121212'
    },
    title: {
        fontFamily: 'Rubik-Bold',
        color: '#8789f7',
        fontSize: 40,
        textAlign: "center",
    },
    input: {
        fontSize: 19,
        fontFamily: 'Rubik-Light',
        flex: 4,
        color: '#fff',
        backgroundColor: '#312e3f',
        borderRadius: 10,
        margin: 12,
        marginVertical: 0,
        textAlignVertical: 'top',
        padding: 10
    },
    inputPanel: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 16,
        marginHorizontal: 15,
        marginVertical: 20,
        paddingVertical: 10,
        backgroundColor: '#312e3f',
    },
    editBtn: {
        backgroundColor: '#8789f7',
        flexDirection: 'row',
        width: '35%',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 6,
        elevation: 5
    },
    editBtnText: {
        fontFamily: 'Rubik-Medium',
        color: '#fff',
        fontSize: 18
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8789f7',
        borderRadius: 50,
        width: 70,
        height: 70,
        elevation: 5,
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