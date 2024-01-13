import { useRef, useState, useCallback } from "react";
import { Pressable, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from "@rneui/base";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Timer from "./Timer";
import config from "../../config";

export default function Header({
    reminders,
    children
}) {
    const [showTimer, setShowTimer] = useState(false);
    const [stopTime, setStopTime] = useState()
    const [showDeleted, setShowDeleted] = useState(false);
    const [selected, setSelected] = useState([]);
    const [items, setItems] = useState(reminders.deleted);
    const [showPicker, setShowPicker] = useState(false);
    const drawer = useRef(null);
    const [fontsLoaded] = useFonts({
        'Rubik-Black': require('../../assets/fonts/Rubik-Black.ttf'),
        'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    let initialValue = new Date()
    initialValue.setHours(0, 1, 0, 0)

    const handleCheck = (reminder) => {
        let temp = items.map((item) => {
            if (reminder._id === item._id) {
                return { ...item, priority: !item.priority };
            }
            return item;
        });
        setItems(temp);
        setSelected(items.filter((item) => item.priority).map((item) => item["_id"]))
        console.log(selected)
    };

    const deleteForGood = () => {
        fetch(config.BASE_URL + "/wipe", {
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
                   console.log("DONE")
                }
            })
    }

    const navigationView = () => (
        <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    }
                    style={styles.drawerHeaderIcon}
                    onPress={() => drawer.current.closeDrawer()}
                >
                    <Icon name="close" color="#b804d1de" size={40} />
                </Pressable >
                <Text style={styles.drawerHeaderText}>NOTIFY</Text>
            </View>

            <Pressable
                onPress={() => setShowPicker(!showPicker)}
                style={styles.menuBtn}
            >
                <MaterialCommunityIcons name="timer" size={30} color="#b804d1de" />
                <Text style={styles.menuBtnText}>Timer</Text>
                <FontAwesome5 name="chevron-circle-right" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: 5 }} />

            </Pressable>

            {selected.length ? 
     
     <Pressable
     onPress={() => deleteForGood()}
     style={styles.menuBtn}
 >
     <MaterialCommunityIcons name="timer" size={30} color="#b804d1de" />
     <Text style={styles.menuBtnText}>Delete for good</Text>
     <FontAwesome5 name="chevron-circle-right" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: 5 }} />
 
 </Pressable>
 : ""
     }

            <Pressable
                onPress={() => setShowDeleted(!showDeleted)}
                style={styles.menuBtn}
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
                <ScrollView>
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
           
    
    
        </View>
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={navigationView}
            drawerBackgroundColor="rgba(0,0,0,0.75)"
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Pressable
                        android_ripple={
                            RippleConfig = {
                                color: '#121212',
                                foreground: true,
                                borderLess: true
                            }
                        }
                        style={{ marginRight: 'auto' }}
                        onPress={() => drawer.current.openDrawer()}
                    >
                        <Icon name="menu" color="white" size={40} />
                    </Pressable >
                    <Text style={styles.headerTitle}>NOTIFY</Text>
                </View>
                <View style={styles.listContainer}>
                    {children}
                    {showTimer &&
                        <View style={styles.alarm}>
                            <Timer setShowTimer={setShowTimer} stopTime={stopTime} />
                        </View>
                    }
                </View>
            </View>
            {showPicker &&
                <DateTimePicker
                    value={initialValue}
                    is24Hour={true}
                    mode="time"
                    display='spinner'
                    onChange={(selectedTime) => {
                        console.log(selectedTime)
                        let t = new Date(selectedTime.nativeEvent.timestamp)
                        t.setSeconds(0)
                        setShowPicker(false)
                        setStopTime(t)
                        setShowTimer(true)
                        drawer.current.closeDrawer()
                    }}
                    onCancel={() => {
                        console.log("STOP")
                        setShowPicker(false)
                    }}
                />
            }
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#000',
        position: 'relative',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    alarm: {
        position: "absolute",
        left: 0,
        right: 0,
        backgroundColor: '#00030ae0',
        marginLeft:20,
        marginRight:20,
        borderRadius:20
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor: "#000",
        marginTop: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    drawerHeaderText: {
        fontFamily: "Rubik-Black",
        color: '#b804d1de',
        fontSize: 28,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    menuBtn: {
        backgroundColor: '#121212',
        borderRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 30
    },
    menuBtnText: {
        fontFamily: 'Rubik-Medium',
        color: '#b804d1de',
        fontSize: 24,
        margin: 16,
        marginBottom: 8
    },
    listContainer: {
        flex: 10,
        justifyContent: 'center',

    },
    headerTitle: {
        fontFamily: "Rubik-Black",
        color: '#b804d1de',
        fontSize: 28,
        marginRight: 'auto',
    },
    drawerHeaderIcon: {
        position: 'absolute'
    },


    item: {
        backgroundColor: '#121212',
        borderRadius: 6,
        flexDirection: 'row',
        margin: 1,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 16,
        paddingBottom: 16
    },
    checkBox: {
        backgroundColor: '#121212',
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
    deleteBtn: {
        position: "fixed",
        top: 99
    }
});