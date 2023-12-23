import { useState, useCallback } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import Create from './Create';
import { CheckBox, Button } from '@rneui/themed';
import { Icon } from "@rneui/base";
import config from '../../config';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function List({ reminders, onSucess }) {
    const [editable, setEditable] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState(reminders);
    const [scheduled, setScheduled] = useState(reminders.scheduled)
    const [fontsLoaded] = useFonts({
        'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
        'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    //Marks all checked reminders as priority: true
    const handleCheck = (reminder) => {
        console.log(reminder._id)
        console.log(items.scheduled)
        let temp = scheduled.map((item) => {
            console.log("ITEM",item._id)
            if (reminder._id === item._id) {
                console.log("RETURN", { ...item, priority: !item.priority })
                return { ...item, priority: !item.priority };
            }
            console.log("ITEMMM", item)
            return item;
        });
       console.log("TEMPPPPP", temp)
        setScheduled(temp);
        //updateReminder(reminder)
    };

    //Filters all checked reminders into  an array
    //const selected = items.filter((item) => item.priority).map((item) => item["_id"])
    // const scheduled = items.filter((item) => item.notification && !item.done && !item.isDeleted)
    // const unScheduled = items.filter((item) => !item.notification && !item.done && !item.isDeleted)
    // const completed = items.filter((item) => item.done && !item.isDeleted)

    //Sends all selected reminders to server to be marked as done
    // const handleCompleted = () => {
    //     fetch(config.BASE_URL + '/complete', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             selected: selected
    //         })
    //     }).then(response => response.json())
    //         .then(result => {
    //             if (result.success) {
    //                 onSucess()
    //             }
    //         })
    // }

    //Sends all selected reminders to server to be marked as done as soon as checked
    // const updateReminder = (reminder) => {
    //     try {
    //         fetch("https://8a2b-2600-6c5a-4a7f-463a-65d7-decf-3555-933b.ngrok.io", {
    //             method: 'PUT',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 id: reminder._id,
    //                 done: !reminder.done
    //             })
    //         }).then(response => response.json())
    //             .then(result => {
    //                 if (result.success) {

    //                 }
    //             })
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    //Sends all selected reminders to server to be deleted
    // const deleteChecked = () => {
    //     fetch(config.BASE_URL + "/delete", {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             selected: selected
    //         })
    //     }).then(response => response.json())
    //         .then(result => {
    //             if (result.success) {
    //                 onSucess()
    //             }
    //         })
    // }

    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <ScrollView>
                    <Text style={styles.title} >SCHEDULED</Text>
                    {scheduled.length > 0 ?
                        <>
                            {scheduled.sort((a, b) => {
                                if (a.notification !== null && b.notification !== null) {
                                    return new Date(a.notification) - new Date(b.notification);
                                }
                            }).map((reminder) => {
                                return (
                                    <View key={reminder._id}>

                                        <Pressable
                                            android_ripple={
                                                RippleConfig = {
                                                    color: '#b804d1de',
                                                    foreground: false
                                                }
                                            }
                                            onPress={() => {
                                                setEditable(reminder)
                                                setModalVisible(!modalVisible)
                                            }}
                                            style={styles.item}
                                        >
                                            <CheckBox
                                                checked={reminder.priority}
                                                onPress={() => { handleCheck(reminder) }}
                                                size={25}
                                                containerStyle={styles.checkBox}
                                                right={false}
                                                checkedIcon='check'
                                                checkedColor='#b804d1de'
                                                uncheckedIcon='circle-o'
                                                uncheckedColor='#b804d1de'
                                            />
                                            <View style={styles.horizontal}>
                                                <Text style={styles.itemText}>
                                                    {reminder.name}
                                                </Text>
                                                <Text style={styles.time}>
                                                    {new Date(reminder.notification).toLocaleDateString([], {
                                                        weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                    })}
                                                </Text>
                                            </View>
                                        </Pressable>

                                    </View>
                                );
                            })}
                        </>
                        :
                        <View style={[styles.item, styles.empty]}>
                            <Text style={styles.emptyText} >YOU ARE ALL CAUGHT UP</Text>
                        </View>}
                    <Text style={styles.title} >UNSCHEDULED</Text>
                    {reminders.unScheduled.length > 0 ?
                        <>
                            {reminders.unScheduled.map((reminder) => {
                                return (
                                    <View key={reminder._id}>
                                        <Pressable
                                            android_ripple={
                                                RippleConfig = {
                                                    color: '#b804d1de',
                                                    foreground: true
                                                }
                                            }
                                            onPress={() => {
                                                setEditable(reminder)
                                                setModalVisible(!modalVisible)
                                            }}
                                            style={[styles.item, styles.unscheduledItem]}
                                        >
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
                                            </View>
                                        </Pressable>
                                    </View>
                                );
                            })}
                        </>
                        :
                        <View style={[styles.item, styles.empty]}>
                            <Text style={styles.emptyText} >YOU ARE ALL CAUGHT UP</Text>
                        </View>}
                    <Text style={styles.title} >COMPLETED</Text>
                    {reminders.completed.length > 0 ?
                        <>
                            {reminders.completed.map((reminder) => {
                                return (
                                    <View key={reminder._id}>
                                        <Pressable
                                            android_ripple={
                                                RippleConfig = {
                                                    color: '#b804d1de',
                                                    foreground: true
                                                }
                                            }
                                            onPress={() => {
                                                setEditable(reminder)
                                                setModalVisible(!modalVisible)
                                            }}
                                            style={[styles.item, styles.unscheduledItem]}
                                        >
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
                                            </View>
                                        </Pressable>
                                    </View>
                                );
                            })}
                        </>
                        :
                        <View style={[styles.item, styles.empty]}>

                        </View>}
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
                    // disabled={selected.length ? false : true}
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
                    // disabled={selected.length ? false : true}
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
    item: {
        backgroundColor: '#121212',
        flexDirection: 'row',
        borderRadius: 20,
        margin: 4,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 6,
        paddingBottom: 6
    },
    empty: {
        minHeight: 200,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontFamily: "Rubik-Medium",
        color: '#b804d1de',
        fontSize: 18
    },
    unscheduledItem: {
        paddingTop: 16,
        paddingBottom: 16
    },
    horizontal: {
        flexDirection: 'column',
        alignItems: 'stat',
    },
    checkBox: {
        backgroundColor: '#121212',
        padding: 0,
    },
    itemText: {
        fontFamily: "Rubik-Medium",
        color: 'white',
        fontSize: 19
    },
    time: {
        fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 17
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