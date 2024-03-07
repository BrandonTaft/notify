import { useState, useCallback, useReducer } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Create from './Create';
import Items from './Items';
import { Icon } from "@rneui/base";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { storeBackUpData } from '../api';
import usePushNotification from '../hooks/usePushNotification';
import Alarm from './Alarm';


export default function List({ reminders, onSuccess }) {
    const { notification, showAlarm, setShowAlarm, expoPushToken, sendPushNotification } = usePushNotification();
    const [editable, setEditable] = useState({});
    const [showChat, setShowChat] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [fontsLoaded] = useFonts({
        'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
        'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    });

    const initialState = {
        scheduled: reminders.filter((item) => item.notification && !item.isCompleted && !item.isDeleted).sort((a, b) => {
            if (a.notification !== null && b.notification !== null) {
                return new Date(a.notification) - new Date(b.notification);
            }
        }),
        unScheduled: reminders.filter((item) => !item.notification && !item.isCompleted && !item.isDeleted && !item.isNote),
        completed: reminders.filter((item) => item.isCompleted && !item.isDeleted && !item.isNote),
        deleted: reminders.filter((item) => item.isDeleted),
        selected: [],
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { selected, scheduled, unScheduled, completed, deleted } = state;

    function reducer(state, action) {
        switch (action.type) {
            case "UPDATESCHEDULED": {
                return ({
                    ...state,
                    scheduled: action.payload,
                })
            }
            case "UPDATEUNSCHEDULED": {
                return ({
                    ...state,
                    unScheduled: action.payload,
                })
            }
            case "UPDATESELECTED": {
                return ({
                    ...state,
                    selected: action.payload,
                })
            }
            case "COMPLETED": {
                return ({
                    ...state,
                    completed: action.payload,
                })
            }
            default:
                return state;
        }
    };

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const handleCheck = (reminder, list, type) => {
        let temp = list.map((item) => {
            if (reminder._id === item._id) {
                if (item.isChecked === false) {
                    dispatch({ type: "UPDATESELECTED", payload: [...selected, item._id] });
                } else if (item.isChecked === true) {
                    dispatch({ type: "UPDATESELECTED", payload: selected.filter(existing => existing._id !== item._id) });
                }
                return { ...item, isChecked: !item.isChecked };
            }
            return item;
        });
        dispatch({ type: type, payload: temp });
    };

    const handleCompleted = () => {
        let i = 0;
        let x = 0;
        while (i < reminders.length && x < selected.length) {
            if (selected.includes(reminders[i]._id)) {
                reminders[i].isCompleted = true
                x++
            }
            i++
        }
        storeBackUpData(reminders)
        onSuccess()
    }

    const deleteChecked = () => {
        let i = 0;
        let x = 0;
        while (i < reminders.length && x < selected.length) {
            if (selected.includes(reminders[i]._id)) {
                reminders[i].isDeleted = true
                x++
            }
            i++
        }
        storeBackUpData(reminders)
        onSuccess()
    }

    return (
        <View style={styles.container}>
            <Alarm
                notification={notification}
                showAlarm={showAlarm}
                setShowAlarm={setShowAlarm}
            />
            <View style={styles.listContainer}>
                <ScrollView>
                    <Text style={styles.title} >Scheduled</Text>
                    <Items
                        list={scheduled}
                        type={"UPDATESCHEDULED"}
                        setEditable={setEditable}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleCheck={handleCheck}
                    />
                    <Text style={styles.title} >Unscheduled</Text>
                    <Items
                        list={unScheduled}
                        type={"UPDATEUNSCHEDULED"}
                        setEditable={setEditable}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleCheck={handleCheck}
                    />
                    <Text style={styles.title} >Completed</Text>
                    <Items
                        list={completed}
                        type={"COMPLETED"}
                        setEditable={setEditable}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleCheck={handleCheck}
                    />
                </ScrollView>
                <Create
                    onSuccess={onSuccess}
                    reminders={reminders}
                    expoPushToken={expoPushToken}
                    editable={editable}
                    setEditable={setEditable}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                />
                
            </View>
            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.round}
                    onPress={() => setModalVisible(true)}
                    android_ripple={
                        RippleConfig = {
                            color: "#bb86fa",
                            borderless: true,
                            foreground: false
                        }
                    }
                >
                    <Icon name="add" color="#fff" size={34} />
                </Pressable>

                <Pressable
                    onPress={() => handleCompleted()}
                    android_ripple={
                        RippleConfig = {
                            color: "#bb86fa",
                            borderless: true,
                            foreground: false
                        }
                    }
                    disabled={selected.length ? false : true}
                >
                    <Icon name="check" color="#bb86fa" size={34} />
                    <Text style={styles.btn}>Complete</Text>
                </Pressable>

                <Pressable
                    // onPress={() => setModalVisible(true)}
                    onPress={() => setShowChat(true)}

                    // onPress={() => {
                    //     //setShowAlarm(true)
                    //     playSound()
                    // }}
                    android_ripple={
                        RippleConfig = {
                            color: "#bb86fa",
                            borderless: true,
                            foreground: false
                        }
                    }
                >
                    <Icon name="share" color="#bb86fa" size={34} />
                    <Text style={styles.btn}>Share</Text>
                </Pressable>

                <Pressable
                    onPress={() => deleteChecked()}
                    android_ripple={
                        RippleConfig = {
                            color: "#bb86fa",
                            borderless: true,
                            foreground: false
                        }
                    }
                    disabled={selected.length ? false : true}
                >
                    <Icon name="delete" color="#bb86fa" size={34} />
                    <Text style={styles.btn}>Delete</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#15131d'
    },
    listContainer: {
        flex: 10,
        padding: 10,
        paddingTop: 0,
        width: '100%'
    },
    title: {
        fontFamily: "Rubik-Medium",
        color: 'grey',
        fontSize: 17,
        marginTop: 10,
        marginLeft: 8
    },
    btnContainer: {
        flex: 1,
        padding: 12,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20,
        backgroundColor: '#312e3f',

    },
    btn: {
        color: '#fff',
        fontSize: 18,
        fontFamily: "Rubik-Regular"
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bb86fa',
        borderRadius: 50,
        width: 60,
        height: 60
    }
});