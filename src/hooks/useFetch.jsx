import { useState, useEffect } from 'react';
import { fetchReminders } from '../api';

const useFetch = () => {
    const [reminders, setReminders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
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