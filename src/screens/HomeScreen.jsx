import { View } from 'react-native';
import Header from '../components/Header';
import UpcomingReminders from '../components/reminderFeature/UpcomingReminders';
import Tools from '../components/Tools';
import ChatRoomPreview from '../components/chatFeature/ChatRoomPreview';
import { Surface, useTheme, Divider } from 'react-native-paper';

const HomeScreen = () => {
    const theme = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Surface style={{ flexDirection: 'column', flex: 2, margin: 10, borderRadius: 10 }} elevation={2}>
                <ChatRoomPreview />
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 2, margin: 10, borderRadius: 10 }} elevation={2}>
                <UpcomingReminders />
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 1,  margin: 10, borderRadius: 10 }} elevation={2}>
                <Tools />
            </Surface>
        </View>
    )
}

export default HomeScreen