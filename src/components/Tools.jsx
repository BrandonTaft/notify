import DateTimePicker from "./reminderFeature/CreateReminderComponent";
import Notes from "./noteFeature/Notes";
import { View, FlatList } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon } from 'react-native-paper';
import { fetchAllUsers } from "../utils/api";
import { useEffect, useState } from "react";
import PagerView from 'react-native-pager-view';




function Tools() {
    const [allUsers, setAllUsers] = useState([]);
    const theme = useTheme();
    useEffect(() => {
        fetchAllUsers().then((data) => {
            console.log("ALLLUSERSSSS", data.users)
            setAllUsers(data.users)
        })
    }, [])

    const UserView = ({ user }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {
                    user.profileImage
                        ?

                        <Avatar.Image
                            size={80}
                            source={{ uri: `https://aaf9-75-131-25-248.ngrok-free.app/images/${user._id}.jpeg` }}
                            style={{ marginHorizontal: 10 }}
                        />
                        :
                        <Avatar.Text
                            size={80}
                            label={user.userName.charAt(0).toUpperCase()}
                            style={{ backgroundColor: theme.colors.onPrimaryContainer, marginHorizontal: 10 }}
                            labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
                        />
                }
                {user.isLoggedIn
                ?
                <Badge style={{ position: 'absolute', top: 5, backgroundColor: 'green' }}>
                    <Icon
                        source="check"
                        color={"white"}

                    />
                </Badge>
                :
                <Badge style={{ position: 'absolute', top: 5, backgroundColor: 'red' }}>
                <Icon
                    source="close"
                    color={"white"}

                />
            </Badge>
    }
                <Text>{user.userName}</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                horizontal
                data={allUsers}
                renderItem={({ item }) => <UserView user={item} />}
                keyExtractor={(item) => item._id}
            />
            {/* <Notes /> */}
        </View>
    )
};

export default Tools;