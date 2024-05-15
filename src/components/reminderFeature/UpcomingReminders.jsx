import { useState, useCallback, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import CreateReminderComponent from './CreateReminderComponent';



import usePushNotification from '../../hooks/usePushNotification';

import ReminderItems from './ReminderItems';


// import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../../utils/styles';


export default function UpcomingReminders() {
    const [upcomingReminders, setUpcomingReminders] = useState([]);
    const [showCreateReminderComponent, setShowCreateReminderComponent] = useState(false);

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
        
        <View style={{flex:1, paddingHorizontal:5}}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <ReminderItems
                    list={upcomingReminders}
                />
            </ScrollView>
            <FAB
            icon="plus"
            style={{
              position: 'absolute',
              margin: 16,
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