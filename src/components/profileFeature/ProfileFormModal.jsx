import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Alert from "../Alert";
import { Text, Button, IconButton, TextInput, Surface, useTheme } from 'react-native-paper';
import { socket } from "../../utils/socket";
import { storeProfileImage, updateUserProfile, deleteUser, logOutUser } from "../../utils/api";
import { editUserProfileImage, editUserBanner, editUserCredentials, logOut } from '../../redux/userSlice';


export const ProfileFormModal = () => {
    const [notifyUser, setNotifyUser] = useState({});
    const [showUserNameEdit, setShowUserNameEdit] = useState(false);
    const [showOrgEdit, setShowOrgEdit] = useState(false);
    const [message, setMessage] = useState('');
    const theme = useTheme();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setNotifyUser({ userName: user.userName, organization: user.organization })
    }, [])

    const handleProfileEdit = async () => {
        await updateUserProfile(user._id, notifyUser).then(async (result) => {
            if (result.success) {
                dispatch(editUserCredentials(notifyUser))
                const jsonValue = JSON.stringify(result.upDatedProfile)
                await AsyncStorage.mergeItem("notify_user", jsonValue);
            } else {
                setMessage(result.message);
                setNotifyUser({ userName: user.userName, organization: user.organization });
            }
        })
        setShowOrgEdit(false);
        setShowUserNameEdit(false);
    };

    return (
        <Surface
            elevation={5}
            style={
                {
                    flex: 3,
                    justifyContent: 'center',
                    borderRadius: 20,
                    padding: 10,
                    alignItems: 'center',
                    margin: 20,
                    marginBottom: 30,
                    marginTop: 0,
                    backgroundColor: theme.colors.surface
                }
            }
        >
            <Text
                variant="headlineSmall"
                style={{ color: theme.colors.primary }}
            >
               Edit Profile
            </Text>
            {showUserNameEdit ?
                <TextInput
                    value={notifyUser.userName}
                    mode="outlined"
                    autoCorrect={false}
                    label='Edit user name'
                    theme={theme.roundness}
                    style={{ width: '100%', margin: 10 }}
                    onChangeText={(value) => {
                        setNotifyUser({ ...notifyUser, userName: value.trim() })
                    }}
                    right={
                        <TextInput.Icon
                            icon="close"
                            iconColor={theme.colors.primary}
                            onPress={() => setShowUserNameEdit(false)}
                        />
                    }
                />
                :
                <Surface
                    elevation={3}
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        borderRadius: 20,
                        margin:12
                    }}
                >
                    <Text
                        variant="titleMedium"
                        style={{ color: theme.colors.secondary }}
                    >
                        User Name:
                    </Text>
                    <Text
                        variant="titleMedium"
                        style={{ color: theme.colors.primary }}
                    >
                        {notifyUser.userName}
                    </Text>
                    <IconButton
                        icon="account-edit"
                        onPress={() => setShowUserNameEdit(true)}
                    />

                </Surface>
            }
            {showOrgEdit ?
                <TextInput
                    value={notifyUser.organization}
                    mode="outlined"
                    autoCorrect={false}
                    label='Edit organization'
                    theme={theme.roundness}
                    style={{ width: '100%', margin: 10 }}
                    onChangeText={(value) => {
                        setNotifyUser({ ...notifyUser, organization: value.trim() })
                    }}
                    right={
                        <TextInput.Icon
                            icon="close"
                            iconColor={theme.colors.primary}
                            onPress={() => setShowOrgEdit(false)}
                        />
                    }
                />
                :
                <Surface
                    elevation={3}
                    style={{
                        flexDirection: 'row',
                        width: '100%',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        borderRadius: 20,
                        margin:12
                    }}
                >
                    <Text
                        variant="titleMedium"
                        style={{ color: theme.colors.secondary }}
                    >
                        Organization:
                    </Text>
                    <Text
                        variant="titleMedium"
                        style={{ color: theme.colors.primary }}
                    >
                        {notifyUser.organization}
                    </Text>
                    <IconButton
                        icon="account-edit"
                        onPress={() => setShowOrgEdit(true)}
                    />
                    <Alert message={message} setMessage={setMessage} />
                </Surface>

            }
            <Button
            style={{ width:"50%"}}
                icon="view-gallery"
                mode="elevated"
                onPress={() => handleProfileEdit()}
            >
                Edit
            </Button>
            <View style={{flexDirection:'column', marginVertical:25, width:"100%", alignItems:'center'}}>
            <Button
            style={{ width:'90%'}}
                icon="view-gallery"
                mode="elevated"
                onPress={() => {
                    logOutUser(user);
                    dispatch(logOut(user));
                }}
            >
                Log Out
            </Button>
            <Button
                style={{backgroundColor:"red", width:"90%", marginVertical:10}}
                icon="view-gallery"
                mode="elevated"
                onPress={() => {
                    deleteUser(user)
                    dispatch(logOut(user));
                }}
            >
                Delete Profile
            </Button>
            </View>
        </Surface>
    );
};