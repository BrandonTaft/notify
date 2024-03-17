import { useState, useCallback, useReducer, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Text, View, Pressable, ScrollView } from 'react-native';


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
    const { isLoading, setRefresh, refresh } = useFetch();
    const { expoPushToken, sendPushNotification } = usePushNotification();
    const [editable, setEditable] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [items, setItems] = useState([]);

    const reminders = useSelector(state => state.reminders)

    // useEffect(() => {
    //     if(!isLoading) {
    //     setItems(reminders)
    //     }
    // },[isLoading])

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
        <View style={styles.upcomingContainer}>
                <ScrollView>
                    <Text style={styles.title} >Scheduled</Text>
                    <Items
                        list={reminders}
                        type={"UPDATESCHEDULED"}
                        setEditable={setEditable}
                        modalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        handleCheck={handleCheck}
                        deleteReminder={deleteReminder}
                    />
                </ScrollView>
                {/* <CreateReminder
                    handleRefresh={handleRefresh}
                    items={items}
                    expoPushToken={expoPushToken}
                    editable={editable}
                    setEditable={setEditable}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                />*/}
                {/* <CreateReminder /> */}
        </View> 
    )
};