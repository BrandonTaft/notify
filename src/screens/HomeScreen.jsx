import { View } from 'react-native';
import Header from '../components/Header';
import UpcomingReminders from '../components/reminderFeature/UpcomingReminders';
import Notes from '../components/noteFeature/Notes';
import ChatRoomListScreen from './ChatRoomListScreen';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatRoomPreview from '../components/chatFeature/ChatRoomPreview';
import { useTheme } from 'react-native-paper';

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
    const theme = useTheme();
    const getUser = async () => {
        const user = useSelector(state => state.user)
        const storedUser = await AsyncStorage.getItem("notify_user")
        console.log("HOMESCREEN STORED", user)

    }
    getUser()
    const user = useSelector(state => state.user)
    console.log("HOMESCREEN stateeee", user)
    return (

        <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>

            <Header />


            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'purple' }}>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'pink', margin:20 }}>
                    <UpcomingReminders />
                </View>
                {/* <ChatRoomPreview /> */}
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'green',margin:20 }}>
                    <UpcomingReminders />
                </View>
                {/* <Notes /> */}

            </View>

            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: 'orange' }}>
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'red', margin:20 }}>
                    <UpcomingReminders />
                </View>
                {/* <ChatRoomPreview /> */}
                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: 'blue', margin:20 }}>
                    <UpcomingReminders />
                </View>
                {/* <Notes /> */}
            </View>




            {/* <Chat />
            <TimePicker
                setShowPicker={setShowPicker}
                showPicker={showPicker}
            /> */}

        </View>
        // </Layout>
    )
}

export default HomeScreen