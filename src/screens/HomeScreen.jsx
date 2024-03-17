import { useState } from 'react';
import { Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import useFetch from '../hooks/useFetch';

import UpcomingReminders from '../components/UpcomingReminders';
import Loader from '../oldcomponents/Loader';

// import List from '../components/List';
// import Layout from '../components/Layout';
// import TimePicker from "../components/TimePicker";
// import ChatScreen from './ChatScreen';



const HomeScreen = ({ route, navigation }) => {
    const { isLoading, reminders, setRefresh, refresh } = useFetch()
    const [showPicker, setShowPicker] = useState(false);
    const count = useSelector(state => state.reminders.value)
    const notes = useSelector(state => state.notes.value)
   
    return (
        // <Layout
        //     setShowPicker={setShowPicker}
        //     reminders={reminders}
        //     onSuccess={() => setRefresh(!refresh)}
        //     navigation={navigation}
        // >
            <>
            {isLoading ? <Loader /> :
                // <List
                //     reminders={reminders}
                //     onSuccess={() => setRefresh(!refresh)}
                //     navigation={navigation}
                // />
                <>
                <UpcomingReminders />
                {/* <UpcomingReminders reminders={reminders} handleRefresh={() => setRefresh(!refresh)} /> */}
                {/* <UpcomingReminders reminders={reminders} /> */}
                {/* <ChatScreen /> */}
                {/* <UpcomingReminders reminders={reminders} /> */}
                </>
            }
            {/* <Chat />
            <TimePicker
                setShowPicker={setShowPicker}
                showPicker={showPicker}
            /> */}
            <Text style={{color:'white', fontSize:33}}>{count}</Text>
            <Text style={{color:'white', fontSize:33}}>{notes}</Text>
            </>
        // </Layout>
    )
}

export default HomeScreen