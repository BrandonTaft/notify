import { StyleSheet, View, Pressable } from 'react-native';
import { List, MD3Colors, Icon, useTheme, Text, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import UpdateReminderComponent from './UpdateReminderComponent';
import { completeReminder, deleteReminder } from '../../redux/reminderSlice';
import { useState, useRef, useEffect } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { deleteReminderApi, completeReminderApi } from '../../utils/api';

function ReminderItems({ list }) {
    const [showUpdateReminderComponent, setShowUpdateReminderComponent] = useState(false);
    const itemToEditRef = useRef({});
    const reminderItemRef = useRef([]);
    const prevOpenedRow = useRef();
    const dispatch = useDispatch();
    const theme = useTheme();

    const renderRightActions = (item) => {
        return (
            <View style={{ flexDirection: 'row' }} >
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: "#15131d",
                            borderless: false,
                            foreground: true
                        }
                    }
                    style={styles.reminderItemRightInsideButton}
                    onPress={() => {
                        itemToEditRef.current = item
                        setShowUpdateReminderComponent(true)
                        prevOpenedRow.current.close();
                    }}>
                    <Icon
                        source="note-edit"
                        color={MD3Colors.primary0}
                        size={30}
                    />
                </Pressable>
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: "#15131d",
                            borderless: false,
                            foreground: true
                        }
                    }
                    style={styles.reminderItemRightButton}
                    onPress={() => {
                        dispatch(completeReminder(item.reminderId))
                        completeReminderApi(item.reminderId)
                    }}>
                    <Icon
                        source="check-outline"
                        color={MD3Colors.primary100}
                        size={30}
                    />
                </Pressable>
            </View>
        );
    };

    const renderLeftActions = (item) => {
        return (
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: "#15131d",
                        borderless: false,
                        foreground: true
                    }
                }
                style={styles.reminderItemLeftButton}
                onPress={() => {
                    dispatch(deleteReminder(item.reminderId))
                    deleteReminderApi(item.reminderId)
                }}>
                <Icon
                    source="delete"
                    color={MD3Colors.primary100}
                    size={30}
                />
            </Pressable>
        );
    };

    const closeRow = (index) => {
        if (prevOpenedRow.current && prevOpenedRow.current !== reminderItemRef.current[index]) {
            prevOpenedRow.current.close();
        }
        prevOpenedRow.current = reminderItemRef.current[index];
    }

    let x =new Date('5/18/2024')
    let y =x.getDay()

    return (
        <>
            {list.length > 0 ?
                <>
                    <UpdateReminderComponent
                        itemToEdit={itemToEditRef.current}
                        showUpdateReminderComponent={showUpdateReminderComponent}
                        setShowUpdateReminderComponent={setShowUpdateReminderComponent}
                    />
                    {list.map((item, index) => {
                        return (
                            <Swipeable
                                renderLeftActions={() => renderLeftActions(item)}
                                renderRightActions={() => renderRightActions(item)}
                                onSwipeableWillOpen={() => closeRow(index)}
                                containerStyle={[styles.swipeableContainerBack, { backgroundColor: theme.colors.primaryContainer }]}
                                childrenContainerStyle={[styles.swipeableContainerFront, { backgroundColor: theme.colors.primary }]}
                                key={item.reminderId}
                                ref={ref => reminderItemRef.current[index] = ref}
                            >
                                <List.Icon color={theme.colors.onPrimary} icon="chevron-left" />
                                <View style={styles.reminderItemTextContainer}>
                                    <Text style={{ color: theme.colors.scrim }} variant="titleMedium">
                                        {item.title}
                                    </Text>
                                    {item.dueTime &&
                                        <Text style={{ color: theme.colors.onPrimary }} variant="labelMedium">
                                           
                                           {new Date(item.dueDay).toLocaleDateString([], {
                                                weekday: 'short', month: 'numeric', day: 'numeric'
                                            })}
                                            &nbsp;&nbsp;
                                            { ((item.dueTime.hours + 11) % 12 + 1)}:{item.dueTime.minutes.toString().padStart(2, '0')} {item.dueTime.hours >= 12 ? 'PM' : 'AM'}
                                            
                                        </Text>
                                    }
                                </View>

                                <List.Icon color={theme.colors.onPrimary} icon="chevron-right" />
                            </Swipeable>
                        );
                    })}
                </>
                :
                <View style={[styles.item, styles.empty]}>
                    <Text style={styles.emptyText} >YOU ARE ALL CAUGHT UP</Text>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    swipeableContainerBack: {
        flexDirection: 'row',
        backgroundColor: "black",
        borderRadius: 15,
        overflow: 'hidden',
        margin: 1
    },
    swipeableContainerFront: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "white",
        overflow: 'hidden'
    },
    reminderItemTextContainer: {
        flexDirection: 'column',
        flex: 1,
        padding: 5
    },
    reminderItemLeftButton: {
        backgroundColor: 'red',
        borderRadius: 15,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    reminderItemRightButton: {
        backgroundColor: 'grey',
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    reminderItemRightInsideButton: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    empty: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flex:1
    },
    emptyText: {
        // fontFamily: "Rubik-Medium",
        color: '#8789f7',
        fontSize: 18,
        marginVertical: 44
    }
});

export default ReminderItems