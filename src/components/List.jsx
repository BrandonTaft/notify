import { useState, useCallback, useReducer } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Create from './Create';
import Item from './Item';
import { Icon } from "@rneui/base";
import config from '../../config';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function List({ reminders, onSucess }) {
    const [editable, setEditable] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [fontsLoaded] = useFonts({
        'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
        'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    });

    const initialState = {
        scheduled: [...reminders.scheduled],
        unScheduled: [...reminders.unScheduled],
        completed: [...reminders.completed],
        selected: []
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { scheduled, unScheduled, selected, completed } = state;

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

    //Marks all checked reminders as priority: true
    const handleCheck = (reminder, list, type) => {
        let temp = list.map((item) => {
            if (reminder._id === item._id) {
                if (item.priority === false) {
                    dispatch({ type: "UPDATESELECTED", payload: [...selected, item._id] });
                } else if (item.priority === true) {
                    dispatch({ type: "UPDATESELECTED", payload: selected.filter(existing => existing !== item._id) });
                }
                return { ...item, priority: !item.priority };
            }
            return item;
        });
        dispatch({ type: type, payload: temp });
    };

    //Sends all selected reminders to server to be marked as done
    const handleCompleted = () => {
        dispatch({ type: 'COMPLETE', payload: selected });
        fetch(config.BASE_URL + '/complete', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selected: selected
            })
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    onSucess()
                }
            })
    }

    //Sends all selected reminders to server to be deleted
    const deleteChecked = () => {
        fetch(config.BASE_URL + "/delete", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selected: selected
            })
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    onSucess()
                }
            })
    }

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <ScrollView>
                    <Text style={styles.title} >SCHEDULED</Text>
                    <Item
                        list={scheduled}
                        type={"UPDATESCHEDULED"}
                        setEditable={setEditable}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleCheck={handleCheck}
                    />
                    <Text style={styles.title} >UNSCHEDULED</Text>
                    <Item
                        list={unScheduled}
                        type={"UPDATEUNSCHEDULED"}
                        setEditable={setEditable}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleCheck={handleCheck}
                    />
                    <Text style={styles.title} >COMPLETED</Text>
                    <Item
                        list={completed}
                        type={"COMPLETED"}
                        setEditable={setEditable}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleCheck={handleCheck}
                    />
                </ScrollView>
                <Create
                    onSucess={onSucess}
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
                            color: 'purple',
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
                            color: 'purple',
                            borderless: true,
                            foreground: false
                        }
                    }
                 disabled={selected.length ? false : true}
                >
                    <Icon name="check" color="#b804d1de" size={34} />
                    <Text style={styles.btn}>Done</Text>
                </Pressable>

                <Pressable
                    onPress={() => setModalVisible(true)}
                    android_ripple={
                        RippleConfig = {
                            color: 'purple',
                            borderless: true,
                            foreground: false
                        }
                    }
                >
                    <Icon name="share" color="#b804d1de" size={34} />
                    <Text style={styles.btn}>Share</Text>
                </Pressable>

                <Pressable
                    onPress={() => deleteChecked()}
                    android_ripple={
                        RippleConfig = {
                            color: 'purple',
                            borderless: true,
                            foreground: false
                        }
                    }
                disabled={selected.length ? false : true}
                >
                    <Icon name="delete" color="#b804d1de" size={34} />
                    <Text style={styles.btn}>Delete</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    listContainer: {
        flex: 10,
        padding: 4,
        paddingTop: 0,
        width: '100%'
    },
    title: {
        fontFamily: "Rubik-Medium",
        color: 'grey',
        fontSize: 19,
        margin: 0,
    },
    btnContainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 20,
        backgroundColor: '#121212',
        width: '100%',
    },
    btn: {
        color: '#fff',
        fontSize: 18,
        fontFamily: "Rubik-Regular"
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b804d1de',
        borderRadius: 50,
        width: 60,
        height: 60
    }
});