
import DateTimePicker from "./reminderFeature/CreateReminderComponent";
import Notes from "./noteFeature/Notes";
import { View, FlatList } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon } from 'react-native-paper';
import { fetchAllUsers } from "../utils/api";
import { useEffect, useState } from "react";
import { UserView } from "./UserView";

function Tools() {
    const [allUsers, setAllUsers] = useState([]);
    const theme = useTheme();
    useEffect(() => {
        fetchAllUsers().then((data) => {
            console.log("ALLLUSERSSSS", data.users)
            setAllUsers(data.users)
        })
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <UserView />
            {/* <Notes /> */}
        </View>
    )
};

export default Tools;