import { useRef, useState, useCallback } from "react";
import { Pressable, Button, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";
import { Icon } from "@rneui/base";
import { CheckBox } from '@rneui/themed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


export default function Header({ reminders, children }) {

    const [showCompleted, setShowCompleted] = useState(false);
    const [showDeleted, setShowDeleted] = useState(false);
    const [items, setItems] = useState(reminders);
    const drawer = useRef(null);
    const [fontsLoaded] = useFonts({
        'Rubik-Black': require('../../assets/fonts/Rubik-Black.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    const handleCheck = (reminder) => {
        let temp = items.map((item) => {
            if (reminder._id === item._id) {
                return { ...item, priority: !item.priority };
            }
            return item;
        });
        setItems(temp);
    };

    //const selected = items.filter((item) => item.priority).map((item) => item["_id"])

    const navigationView = () => (
        <View style={[styles.container, styles.navigationContainer]}>
            
                <View style={styles.menuTitleContainer}>
                    <Pressable
                        android_ripple={
                            RippleConfig = {
                                color: '#121212',
                                foreground: true,
                                borderLess: true
                            }
                        }
                        style={styles.menuIcon}
                        onPress={() => drawer.current.closeDrawer()}
                    >
                        <Icon name="close" color="#b804d1de" size={40} />
                    </Pressable >
                    <Text style={styles.menuTitle}>NOTIFY</Text>
                </View>
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    }
                    onPress={() => setShowCompleted(!showCompleted)}
                >
                    <Text style={styles.menuButtonText}>Messages</Text>
                </Pressable>

                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    }
                    style={{flexDirection:'row'}}
                    onPress={() => setShowCompleted(!showCompleted)}
                >
                    <Text style={styles.menuButtonText}>Completed</Text>
                    <Icon name="close" color="#b804d1de" size={40} />
                </Pressable>

                {items.length ?
                    <View style={styles.deleteBtn}>
                        <Button
                            title="Left button"
                            color="#f194ff"
                        />
                    </View>
                    :
                    null
                }

                {showCompleted &&
                    <ScrollView>
                        {items.map((reminder) => {

                            return (
                                <View key={reminder._id}>
                                    {reminder.done &&
                                        <View
                                            style={styles.item}
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
                                           
                                            {reminder.notification &&
                                               
                                                    <Text style={styles.time}>
                                                        {new Date(reminder.notification).toLocaleDateString([], {
                                                            weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </Text>
                                               
                                            }
                                             </View>

                                        </View>
                                    }
                                </View>
                            );
                        })}
                    </ScrollView>
                }
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    }
                    onPress={() => setShowDeleted(!showDeleted)}
                >
                    <Icon name="delete" color="#b804d1de" size={34} />
                    <Text style={styles.menuButtonText}>Deleted</Text>
                </Pressable>
                {showDeleted &&
                    <ScrollView>
                        {reminders.map((reminder) => {

                            return (
                                <View key={reminder._id}>
                                    {reminder.isDeleted &&
                                         <View
                                         style={styles.item}
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
                                        
                                         {reminder.notification &&
                                            
                                                 <Text style={styles.time}>
                                                     {new Date(reminder.notification).toLocaleDateString([], {
                                                         weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                                     })}
                                                 </Text>
                                            
                                         }
                                          </View>

                                     </View>
                                    }
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
            renderNavigationView={navigationView}>


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
                </View>
            </View>
        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#000',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    listContainer: {
        flex: 10,
        backgroundColor: '#000',
    },
    navigationContainer: {
        backgroundColor: '#121212',
        opacity: 1
    },
    headerTitle: {
        fontFamily: "Rubik-Black",
        color: '#b804d1de',
        fontSize: 28,
        marginRight: 'auto',
    },
    menuTitleContainer: {
        flexDirection: 'row',
        alignItems: "center",
    },
    menuIcon: {
        backgroundColor: '121212',
        position: 'absolute'
    },
    menuTitle: {
        fontFamily: "Rubik-Black",
        color: '#b804d1de',
        fontSize: 28,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    menuButtonText: {
        color: '#b804d1de',
        fontSize: 22,
        margin: 16
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
        position:"fixed",
        top:99
    }
});