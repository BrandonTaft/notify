import { useState, useCallback, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Text, View, Pressable, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import usePushNotification from '../hooks/usePushNotification';
import useFetch from '../hooks/useFetch';
import CreateReminder from './CreateReminder';

import Items from './Items';

// import { Icon } from "@rneui/base";
// import { ButtonGroup, Button, ListItem } from '@rneui/themed';
// import { AddButton } from './Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { storeBackUpData, fetchBackUpData } from '../api';

import { styles } from '../utils/styles';


export default function UpcomingReminders({ handleRefresh }) {
    const [upcomingReminders, setUpcomingReminders] = useState([]);

    const reminders = useSelector(state => state.reminders)

    useEffect(() => {
        setUpcomingReminders(reminders.filter((item) => item.selectedDate && !item.isCompleted && !item.isDeleted).sort((a, b) => {
            if (a.selectedDate !== null && b.selectedDate !== null) {
                return new Date(JSON.parse(a.selectedDate)) - new Date(JSON.parse(b.selectedDate));
            }
        })
       )
    },[reminders])

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
        while (i < items.length && x < selected.length) {
            if (selected.includes(items[i]._id)) {
                items[i].isCompleted = true
                x++
            }
            i++
        }
        storeBackUpData(items)
        handleRefresh()
    }

    const deleteReminder = (id) => {
        items.find((reminder, i) => {
            if (reminder._id === id) {
                items[i].isDeleted = true
                setItems(items)
            }

        });

        storeBackUpData(items)
        setRefresh(!refresh)

    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.upcomingContainer}>
            <CreateReminder />
            <ScrollView keyboardShouldPersistTaps="handled">
                <Text style={styles.title} >Scheduled</Text>
                <Items
                    list={upcomingReminders}
                />
            </ScrollView>
        </View>
        </GestureHandlerRootView>
    )
};