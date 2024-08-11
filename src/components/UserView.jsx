import { useSelector } from "react-redux";
import { StyleSheet, FlatList, View, useWindowDimensions } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon, TouchableRipple } from 'react-native-paper';
import { BASE_URL } from "../utils/api";
import { useNavigation } from "@react-navigation/native";





export const UserView = ({allUsers}) => {
    const self = useSelector(state => state.user);
    const navigation = useNavigation();
    const theme = useTheme();

    const {height, width, scale, fontScale} = useWindowDimensions();

    const ELEMENT_WIDTH = width * .36

    const handleCreatePrivateRoom = async (user) => {
        if (user._id !== self._id) {
            navigation.navigate({
                name: 'PrivateScreen',
                params: {
                    recipientId: user._id,
                    recipientName: user.userName,
                    recipientIsLogged: user.isLoggedIn
                }
            })
        }
    };

    
    const UserAvatar = ({ user }) => {
        return (
            <TouchableRipple
                background={{
                    radius: ELEMENT_WIDTH / 2,
                    color: theme.colors.onBackground
                }}
                onPress={() => handleCreatePrivateRoom(user)}
                style={{ justifyContent: 'center', alignItems: 'center', width: ELEMENT_WIDTH * .75 }}
            >
                <>
                    {
                        user.profileImage
                            ?
                            <Avatar.Image
                                size={ELEMENT_WIDTH * .5}
                                source={{ uri: `${BASE_URL}/images/${user._id}.jpeg` }}
                                style={{}}
                            />
                            :
                            <Avatar.Text
                                size={ELEMENT_WIDTH * .5}
                                label={user.userName.charAt(0).toUpperCase()}
                                style={{ backgroundColor: theme.colors.onPrimaryContainer }}
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
                    <Text style={{ position: 'absolute', bottom: 0, borderRadius: 10, alignItems: 'center', paddingHorizontal: 15, backgroundColor: 'rgba(12,12,12, 0.6)' }}>
                        <Text style={{ color: "#fff", fontWeight: 900 }}>{user.userName}</Text>
                    </Text>
                </>
            </TouchableRipple>
        )
    }
    return (
        <View style={{ flex: 1 }}>
        <FlatList
            horizontal
            data={allUsers}
            renderItem={({ item }) => <UserAvatar user={item} />}
            keyExtractor={(item) => item._id}
        />
        </View>
    )
}

const styles = StyleSheet.create({

});