import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import Alert from "../Alert";
import { Text, Button, TextInput, Surface, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { storeProfileImage, updateUserProfile, deleteUser, logOutUser } from "../../utils/api";
import { editUserProfileImage, editUserBanner, editUserCredentials, logOut } from '../../redux/userSlice';

const ProfileFormModal = () => {
    const [notifyUser, setNotifyUser] = useState({});
    const [showUserNameEdit, setShowUserNameEdit] = useState(false);
    const [showOrgEdit, setShowOrgEdit] = useState(false);
    const [message, setMessage] = useState('');
    const theme = useTheme();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const checkForCameraRollPermission = async () => {
            const { status } = await ImagePicker.getCameraPermissionsAsync();
            if (status !== 'granted') {
                alert("Please grant camera roll permissions inside your system's settings");
            }
        };
        checkForCameraRollPermission()
        setNotifyUser({ userName: user.userName, organization: user.organization })
    }, [])

    const handleProfileEdit = async () => {
        await updateUserProfile(user.userId, notifyUser).then(async (result) => {
            if (result.success) {
                dispatch(editUserCredentials(notifyUser))
                const jsonValue = JSON.stringify(notifyUser)
                await AsyncStorage.mergeItem("notify_user", jsonValue);
            } else {
                setMessage(result.message);
                setNotifyUser({ userName: user.userName, organization: user.organization });
            }
        })
        setShowOrgEdit(false);
        setShowUserNameEdit(false);
    };

    const addImageFromLibrary = async (imageType) => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!_image.canceled) {
            dispatch(editUserProfileImage({imageType: imageType, image:_image.assets[0].uri}));
            let imageToStore = JSON.stringify({ imageType: _image.assets[0].uri })
            await AsyncStorage.mergeItem('notify_user', imageToStore)
            storeProfileImage(imageType,_image.assets[0].uri, user.userId)
        }

    };

    return (
        <Surface
            elevation={5}
            style={
                {
                    justifyContent: 'center',
                    borderRadius: 20,
                    padding: 5,
                    width: '100%',
                    height: '100%',
                    alignItems: 'center'
                }
            }
        >
            <Text
                variant="headlineMedium"
                style={{ color: theme.colors.primary }}
            >
                Profile
            </Text>
            {showUserNameEdit ?
                <TextInput
                    value={notifyUser.userName}
                    mode="outlined"
                    autoCorrect={false}
                    label='Edit user name'
                    theme={theme.roundness}
                    style={{ width: '100%', margin: 5 }}
                    onChangeText={(value) => {
                        setNotifyUser({ ...notifyUser, userName: value })
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
                <Surface elevation={3} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                    <Text
                        variant="headlineSmall"
                        style={{ color: theme.colors.secondary }}
                    >
                        User Name:
                    </Text>
                    <Text
                        variant="headlineSmall"
                        style={{ color: theme.colors.primary }}
                    >
                        {notifyUser.userName}
                    </Text>
                    <Button mode="text" onPress={() => setShowUserNameEdit(true)}>
                        Edit
                    </Button>
                </Surface>
            }
            {showOrgEdit ?
                <TextInput
                    value={notifyUser.organization}
                    mode="outlined"
                    autoCorrect={false}
                    label='Edit organization'
                    theme={theme.roundness}
                    style={{ width: '100%', margin: 5 }}
                    onChangeText={(value) => {
                        setNotifyUser({ ...notifyUser, organization: value })
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
                <Surface elevation={3} style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly' }}>
                    <Text
                        variant="headlineSmall"
                        style={{ color: theme.colors.secondary }}
                    >
                        organization:
                    </Text>
                    <Text
                        variant="headlineSmall"
                        style={{ color: theme.colors.primary }}
                    >
                        {notifyUser.organization}
                    </Text>
                    <Button mode="text" onPress={() => setShowOrgEdit(true)}>
                        Edit
                    </Button>
                    <Alert message={message} setMessage={setMessage} />
                </Surface>

            }

            {/* <Button icon="camera" mode="elevated" onPress={takeProfileImageWithCamera}>
                        Camera
                    </Button> */}
            <Button
                icon="account"
                mode="elevated"
                onPress={() => addImageFromLibrary("profileImage")}
            >
                EditPicture
            </Button>
            <Button
                icon="view-gallery"
                mode="elevated"
                onPress={() => addImageFromLibrary("bannerImage")}
            >
                Edit Banner
            </Button>
            {/* </View> */}



            <Button
                icon="view-gallery"
                mode="elevated"
                onPress={() => handleProfileEdit()}
            >
                Edit
            </Button>
            <Button
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
                icon="view-gallery"
                mode="elevated"
                onPress={() => {
                    deleteUser(user)
                    dispatch(logOut(user));
                }}
            >
                Delete Profile
            </Button>
        </Surface>
    );
};

export default ProfileFormModal;