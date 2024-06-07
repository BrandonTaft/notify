import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import UpcomingReminders from '../components/reminderFeature/UpcomingReminders';
import Tools from '../components/Tools';
import ChatRoomPreview from '../components/chatFeature/ChatRoomPreview';
import { Surface, useTheme, Divider } from 'react-native-paper';
import DirectMessage from '../components/chatFeature/DirectMessage';

const HomeScreen = () => {
    const theme = useTheme();
    const rooms = useSelector(state => state.chatRooms);
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Surface style={{ flexDirection: 'column', flex: 3, margin: 10, borderRadius: 10 }} elevation={2}>
                <ChatRoomPreview rooms={rooms}/>
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 2, margin: 10, borderRadius: 10 }} elevation={2}>
                {/* <UpcomingReminders /> */}
                <DirectMessage />
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 1,  margin: 10, borderRadius: 10 }} elevation={2}>
                <Tools />
            </Surface>
        </View>
    )
}

export default HomeScreen