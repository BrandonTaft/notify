import { useState, useEffect } from 'react';
import { fetchBackUpData } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const useFetch = () => {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        console.log("fetch")
        setIsLoading(true);
        const getReminders = async () => {
            //await AsyncStorage.clear()
            const UUID = Crypto.randomUUID();
            const deviceId = await AsyncStorage.getItem('deviceId');
            if (deviceId === null) {
                await AsyncStorage.setItem('deviceId', UUID)
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
                            console.log("Server did not respond", error.message);
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