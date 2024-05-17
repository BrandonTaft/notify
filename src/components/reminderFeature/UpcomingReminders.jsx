import { useState, useCallback, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import CreateReminderComponent from './CreateReminderComponent';
import { useDispatch } from "react-redux";
import { fetchAllReminders } from '../../redux/reminderSlice';
import ReminderItems from './ReminderItems';

export default function UpcomingReminders() {
    const [showCreateReminderComponent, setShowCreateReminderComponent] = useState(false);

    const reminders = useSelector(state => state.reminders.reminders)

    console.log("UPCOMINGREMINDER", reminders)

    const dispatch = useDispatch()

    useEffect(() => {
        if (reminders.length === 0) {
            dispatch(fetchAllReminders())
        }
    }, [])

    return (

        <View style={{ flex: 1, paddingHorizontal: 5}}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex:1}}>
                <ReminderItems
                    list={reminders}
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