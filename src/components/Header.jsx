import CreateNote from "./CreateNote";
import CreateReminder from "./CreateReminder";
import { View } from "react-native";
import ProfileImage from "./ProfileImage";
import { LogOutButton } from "./Buttons";

export default function Header() {
    return (
        <View style={{ flexDirection: 'row' }}>
            <ProfileImage />
            <CreateNote />
            <CreateReminder />
            <LogOutButton size={36} color={'#fff'} />
        </View>
    )
}