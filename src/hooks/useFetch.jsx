import { useState, useEffect } from 'react';
import { fetchBackUpData } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const useFetch = () => {
    const [reminders, setReminders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        console.log("fetch")
        
        
        const getReminders = async () => {
            //await AsyncStorage.clear()
            const UUID = ['deviceId',Crypto.randomUUID()];
            const deviceId = await AsyncStorage.getItem('deviceId');
            if(deviceId === null) {
                const isNew = ['newDevice', 'true']
                await AsyncStorage.multiSet([isNew, UUID])
            } 
            try {
                const jsonValue = await AsyncStorage.getItem('reminde');
                if (jsonValue !== null) {
                    setReminders(JSON.parse(jsonValue))
                    // fetchBackUpData()
                    //     .then((data) => {
                    //        console.log(data.reminders[0].reminders)
                    //       })
            } else {
                fetchBackUpData()
                .then((data) => {
                    console.log(data.reminders[0].reminders)
                    setReminders(data.reminders[0].reminders)
                    setRefresh(!re)
                })
           }
            } catch (error) {
                console.log("Error: ", error)
            } finally {
                setIsLoading(false)
            }
        };
        setIsLoading(true);
        getReminders()
    }, [refresh]);


    return { isLoading, reminders, setRefresh, refresh };
};

export default useFetch