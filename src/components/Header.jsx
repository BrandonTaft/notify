import { useState } from "react";
import CreateNote from "./noteFeature/CreateNote";
import CreateReminderComponent from "./reminderFeature/CreateReminderComponent";
import { useDispatch } from 'react-redux';
import { createReminder } from '../redux/reminderSlice';
import ProfileImage from "./profileFeature/ProfileImage";
import { ThemeButton } from "./Buttons";
import { Surface, useTheme,IconButton } from 'react-native-paper';
import { styles } from "../utils/styles";

export default function Header() {
    const [showCreateReminderComponent, setShowCreateReminderComponent] = useState(false)
    const dispatch = useDispatch()
    const theme = useTheme();
    return (
        <Surface
            theme={theme.colors.elevation.level1}
            elevation={5}
            style={
                [
                    styles.headerContainer,
                    {
                      
                    }
                ]
            }
        >
            <ProfileImage />
            <CreateNote />
            <IconButton
                icon="reminder"
                iconColor={theme.colors.onPrimaryContainer}
                size={40}
                onPress={() => setShowCreateReminderComponent(true)}
            />
            <CreateReminderComponent
                showCreateReminderComponent={showCreateReminderComponent}
                setShowCreateReminderComponent={setShowCreateReminderComponent}
                handleSave={
                    (title, selectedDate, token) => {
                        dispatch(createReminder(title, selectedDate, token))
                    }
                }
            />
            <ThemeButton />
        </Surface>
    )
}