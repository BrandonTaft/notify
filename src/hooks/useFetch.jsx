import { useState, useEffect } from 'react';
import { fetchReminders } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = () => {
    const [reminders, setReminders] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    // useEffect(() => {
    //     console.log("fetch")
    //     const storeReminders = async (data) => {
    //         try {
    //           await AsyncStorage.setItem('reminders', JSON.stringify(data));
    //         } catch (error) {
    //           console.log("error: ", error)
    //         }
    //       };
    //     setIsLoading(true);
    //     fetchReminders()
    //         .then((data) => {
    //             setReminders(data)
    //             storeReminders(data)
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    // }, [refresh]);

    useEffect(() => {
        console.log("fetch")

        const getReminders = async () => {
            //await AsyncStorage.clear()
            try {
                const jsonValue = await AsyncStorage.getItem('reminders');
                if (jsonValue !== null) {
                    setReminders(JSON.parse(jsonValue))
                }
                // else {
                //     fetchReminders()
                //         .then((data) => {
                //             setReminders(data)
                //         })
                // }
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