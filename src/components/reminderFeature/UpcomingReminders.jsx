import { useState, useCallback, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, Pressable, ScrollView } from 'react-native';



import usePushNotification from '../hooks/usePushNotification';

import CreateReminder from './CreateReminder';

import ReminderItems from './ReminderItems';


// import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../utils/styles';


export default function UpcomingReminders() {
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

    return (
        
        <View style={styles.upcomingReminderContainer}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <Text style={styles.title} >Scheduled</Text>
                <ReminderItems
                    list={upcomingReminders}
                />
            </ScrollView>
        </View>
        
    )
};