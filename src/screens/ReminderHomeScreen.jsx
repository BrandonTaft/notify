import { useState } from 'react';
import List from '../components/List';
import Layout from '../components/Layout';
import TimePicker from "../components/TimePicker";
import useFetch from '../hooks/useFetch';
import Chat from './ChatScreen';
import Loader from '../components/Loader';

const ReminderHomeScreen = ({ route, navigation }) => {
    const { isLoading, reminders, setRefresh, refresh } = useFetch()
    const [showPicker, setShowPicker] = useState(false);
    console.log("PARAMS", route.params)
    return (
        <Layout
            setShowPicker={setShowPicker}
            reminders={reminders}
            onSuccess={() => setRefresh(!refresh)}
            navigation={navigation}
        >
            
            {isLoading ? <Loader /> :
                <List
                    reminders={reminders}
                    onSuccess={() => setRefresh(!refresh)}
                    navigation={navigation}
                />
            }
            <Chat />
            <TimePicker
                setShowPicker={setShowPicker}
                showPicker={showPicker}
            />
        </Layout>
    )
}

export default ReminderHomeScreen