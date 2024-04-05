import CreateNote from "./noteFeature/CreateNote";
import CreateReminder from "./reminderFeature/CreateReminder";
import ProfileImage from "./profileFeature/ProfileImage";
import { LogOutButton, ThemeButton } from "./Buttons";
import { Surface, useTheme } from 'react-native-paper';
import { styles } from "../utils/styles";

export default function Header() {
    const theme = useTheme();
    return (
        <Surface style={[styles.headerContainer,  {backgroundColor: theme.colors.onPrimaryContainer }]} elevation={5}>
            <ProfileImage />
            <CreateNote />
            <CreateReminder />
            <LogOutButton size={36} color={'#fff'} />
            <ThemeButton />
        </Surface>
    )
}