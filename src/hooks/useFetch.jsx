import { useState, useEffect } from 'react';
import { fetchBackUpData } from '../api';
import usePushNotification from '../hooks/usePushNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const useFetch = () => {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { expoPushToken } = usePushNotification();
    useEffect(() => {
        console.log("fetch")
        setIsLoading(true);
        const getReminders = async () => {
            //await AsyncStorage.clear()
            
            const deviceId = await AsyncStorage.getItem('deviceId');
            if (deviceId === null) {
                await AsyncStorage.setItem('deviceId', expoPushToken)
                setIsLoading(false);
            } else {
                const jsonValue = await AsyncStorage.getItem('reminders');
                if (jsonValue !== null) {
                    setReminders(JSON.parse(jsonValue))
                    setIsLoading(false)
                } else {
                    fetchBackUpData()
                        .then((data) => {
                            if (data.success) {
                                setReminders(data.reminders[0].reminders)
                            }
                        })
                        .catch((error) => {
                            console.log("Server did not respond");
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                }
            }
        }
        getReminders()
    }, [refresh]);
    return { isLoading, reminders, setRefresh, refresh };
};

export default useFetch