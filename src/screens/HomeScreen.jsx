import { View } from 'react-native';
import Header from '../components/Header';
import UpcomingReminders from '../components/reminderFeature/UpcomingReminders';
import Tools from '../components/Tools';
import ChatRoomPreview from '../components/chatFeature/ChatRoomPreview';
import { Surface, useTheme, Divider } from 'react-native-paper';
import { fetchReminders } from '../utils/api';

const HomeScreen = () => {
    (async () => {
        const a = await fetchReminders()
        const x= await a.json() 
        console.log("XX", x)
    })()
    
    
    const theme = useTheme();
    return (
        <View style={{ flex: 2 }}>
            <Header />
            <Surface style={{ flexDirection: 'column', flex: 2, backgroundColor: theme.colors.surface, margin: 10, borderRadius: 10 }} elevation={2}>
                <ChatRoomPreview />
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 2, backgroundColor: theme.colors.surface, margin: 10, borderRadius: 10 }} elevation={2}>
                <UpcomingReminders />
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 1, backgroundColor: theme.colors.surface, margin: 10, borderRadius: 10 }} elevation={2}>
                <Tools />
            </Surface>
        </View>
    )
}

export default HomeScreen