import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ButtonStrip from '../components/buttons/ButtonStrip';
import UpcomingReminders from '../components/UpcomingReminders';
import Notes from '../components/Notes';
import ChatListScreen from './ChatListScreen';

// import { useState } from 'react';
// import useFetch from '../hooks/useFetch';
// import Loader from '../oldcomponents/Loader';
// import List from '../components/List';
// import Layout from '../components/Layout';
// import TimePicker from "../components/TimePicker";
// import ChatScreen from './ChatScreen';



const HomeScreen = ({ route, navigation }) => {
    // const { isLoading, reminders, setRefresh, refresh } = useFetch()
    // const [showPicker, setShowPicker] = useState(false);
   
    return (
        // <Layout
        //     setShowPicker={setShowPicker}
        //     reminders={reminders}
        //     onSuccess={() => setRefresh(!refresh)}
        //     navigation={navigation}
        // >
        <>


            <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
                <ButtonStrip />
                <UpcomingReminders />
                <Notes />
                <ChatListScreen />
            </GestureHandlerRootView>
            



            {/* <Chat />
            <TimePicker
                setShowPicker={setShowPicker}
                showPicker={showPicker}
            /> */}

        </>
        // </Layout>
    )
}

export default HomeScreen