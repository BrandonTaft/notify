import { useState, useCallback, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import CreateReminderComponent from './CreateReminderComponent';
import { useDispatch } from "react-redux";
import { fetchAllReminders, updateReminder } from '../../redux/reminderSlice';
import ReminderItems from './ReminderItems';

export default function UpcomingReminders() {
    const [showCreateReminderComponent, setShowCreateReminderComponent] = useState(false);
    const [upcomingReminders, setUpcomingReminders] = useState([]);
    const reminders = useSelector(state => state.reminders.reminders)

    console.log("UPCOMINGREMINDER", reminders)

    const dispatch = useDispatch()

    useEffect(() => {
        if (reminders.length === 0) {
            dispatch(fetchAllReminders())
        }
    }, []);

    useEffect(() => {
        setUpcomingReminders(reminders.filter((item) => item.dueDay && !item.isCompleted && !item.isDeleted).sort((a, b) => {
            if (a.dueDay !== null && b.dueDay !== null) {
                console.log("SORT",new Date(a.dueDay).setHours(0))
                return new Date(a.dueDay).setHours(a.dueTime.hours,a.dueTime.minutes) - new Date(b.dueDay).setHours(b.dueTime.hours,b.dueTime.minutes);
            }
        }))
      },[reminders])

    return (

        <View style={{ flex: 1, paddingHorizontal: 5}}>
            <ScrollView keyboardShouldPersistTaps="handled" >
                <ReminderItems
                    list={upcomingReminders}
                />
            </ScrollView>
            <FAB
                icon="plus"
                style={{
                    position: 'absolute',
                    margin: 8,
                    right: 0,
                    bottom: 0,
                }}
                onPress={() => setShowCreateReminderComponent(true)}
            />
            <CreateReminderComponent
                showCreateReminderComponent={showCreateReminderComponent}
                setShowCreateReminderComponent={setShowCreateReminderComponent}
            />
        </View>

    )
};