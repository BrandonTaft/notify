import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from '../components/Header';
import UpcomingReminders from '../components/UpcomingReminders';
import Notes from '../components/Notes';
import ChatRoomListScreen from './ChatRoomListScreen';
import {useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const getUser = async() => {
        const user = useSelector(state => state.user)
        const storedUser = await AsyncStorage.getItem("notify_user")
        console.log("HOMESCREEN STORED",user)

    }
    getUser()
   const user = useSelector(state => state.user)
   console.log("HOMESCREEN stateeee",user)
    return (
        // <Layout
        //     setShowPicker={setShowPicker}
        //     reminders={reminders}
        //     onSuccess={() => setRefresh(!refresh)}
        //     navigation={navigation}
        // >
        <>


            <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#000' }}>
                <Header />
                <ChatRoomListScreen />
                <UpcomingReminders />
                {/* <Notes /> */}
                
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