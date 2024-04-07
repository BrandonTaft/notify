import { View } from 'react-native';
import Header from '../components/Header';
import UpcomingReminders from '../components/reminderFeature/UpcomingReminders';
import Tools from '../components/Tools';
import ChatRoomPreview from '../components/chatFeature/ChatRoomPreview';
import { Surface, useTheme, Divider } from 'react-native-paper';


const HomeScreen = ({ route, navigation }) => {
    const theme = useTheme();
    return (
        <View style={{ flex: 1 }}>
            <Header />
            
            
            <Surface style={{ flexDirection: 'column', flex: 1, backgroundColor: theme.colors.surface, margin: 10, borderRadius: 10 }} elevation={1}>
                <ChatRoomPreview />
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 1, backgroundColor: theme.colors.surface, margin: 10, borderRadius: 10 }} elevation={1}>
                <UpcomingReminders />
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 1, backgroundColor: theme.colors.surface, margin: 10, borderRadius: 10 }} elevation={1}>
                <Tools />
            </Surface>
        </View>
    )
}

export default HomeScreen