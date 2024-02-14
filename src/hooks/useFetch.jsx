import { useState, useEffect } from 'react';
import { fetchReminders } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = () => {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        console.log("fetch")
        setIsLoading(true);
        fetchReminders()
            .then((data) => {
                setReminders(data)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [refresh]);

    return { isLoading, reminders, setRefresh, refresh };
};

export default useFetch