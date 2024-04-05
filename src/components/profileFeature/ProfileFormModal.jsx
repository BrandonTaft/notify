import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../../utils/styles";
import { Avatar, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { storeProfileImage } from "../../utils/api";
import { editUserProfileImage, editUserBanner, editUserCredentials } from '../../redux/userSlice';
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    Pressable,
    Alert,
    Platform,
    Image,
    Modal
} from "react-native";

const createFormData = (photo, body = {}) => {
    const data = new FormData();

    data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri: photo.uri,
    });

    Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });
    console.log("DATA", data)
    return data;
};

const ProfileFormModal = ({ showProfileFormModal, setShowProfileFormModal }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userNameToEdit, setUserNameToEdit] = useState("")
    const [notifyUser, setNotifyUser] = useState({});
    const dispatch = useDispatch();

    const user = useSelector(state => state.user)

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

    // useEffect(() => {
    //     setIsLoading(true)
    //     const checkForExistingUser = async () => {
    //         const existingUser = await AsyncStorage.getItem("notify_user");
    //         if (existingUser !== null) {
    //             const persistedUser = JSON.parse(existingUser)
    //             dispatch(createUser({...persistedUser, isLoggedIn: true}))
    //         } else {
    //             setIsLoading(false)
    //         }
    //     }
    //     checkForExistingUser()
    // }, []);

    const storeCredentials = async () => {
        try {
            const jsonValue = JSON.stringify(notifyUser)
            await AsyncStorage.mergeItem("notify_user", jsonValue);
            dispatch(editUserCredentials(notifyUser))
        } catch (e) {
            console.log(e)
            Alert.alert("Error! While saving userName");
        } finally {
            setShowProfileFormModal(false)
        }
    };

    const handleProfileEdit = () => {
        if (notifyUser.userName.trim() && notifyUser.organization.trim()) {
            storeCredentials();
        } else {
            Alert.alert(
                "TRY AGAIN",
                "UserName and Organization are required to chat.",
                [
                    {
                        "text": "OK"
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
    };


    // const takeProfileImageWithCamera = async () => {
    //     const pictureTaken = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         quality: 0.5,
    //     });
    //     if (!pictureTaken.canceled) {
    //         dispatch(editUserProfileImage(pictureTaken.assets[0].uri))
    //         const pic = JSON.stringify({ profileImage: pictureTaken.assets[0].uri })
    //         await AsyncStorage.mergeItem('notify_user', pic)
    //     }
    // }

    // const storeProfileImage = async (uri) => {
    //     let uriParts = uri.split('.');
    //     let fileType = uriParts[uriParts.length - 1];
    //     let formData = new FormData();
    //     formData.append('photo', {
    //         uri,
    //         name: `photo.${fileType}`,
    //         type: `image/${fileType}`,
    //         user: "123"
    //     });
    //     formData.append('userId', "123")
    //     return await fetch("https://593b-2600-6c5a-4a7f-463a-61b3-94e3-5c2a-117f.ngrok-free.app/api/profile-image",
    //         {
    //             method: 'POST',
    //             body: formData,
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         })
    //         .then((response) => response.json())
    //         .then((response) => {
    //             console.log('response', response);
    //         })
    //         .catch((error) => {
    //             console.log('error', error);
    //         })
    // }

    const addImageFromLibrary = async (imageType) => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!_image.canceled) {
            let imageToStore;
            if (imageType === "profile_image") {
                dispatch(editUserProfileImage(_image.assets[0].uri));
                imageToStore = JSON.stringify({ profileImage: _image.assets[0].uri })
                await AsyncStorage.mergeItem('notify_user', imageToStore)
                storeProfileImage(_image.assets[0].uri, user.id)
                console.log(_image.assets[0])
            } else {

                dispatch(editUserBanner(_image.assets[0].uri))
                imageToStore = JSON.stringify({ bannerImage: _image.assets[0].uri })
                await AsyncStorage.mergeItem('notify_user', imageToStore)
            }
        }
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showProfileFormModal}
            onRequestClose={() => {
                setShowProfileFormModal(!showProfileFormModal);
            }}>
            <View style={styles.profileFormModal}>
                <Text style={styles.loginheading}>EDIT PROFILE</Text>
                <Button icon="close" mode="contained-tonal" onPress={() => setShowProfileFormModal(false)}>
                    Close
                </Button>
                <View style={styles.profileFormModalBtnContainer}>
                    {/* <Button icon="camera" mode="elevated" onPress={takeProfileImageWithCamera}>
                        Camera
                    </Button> */}
                    <Button icon="view-gallery" mode="elevated" onPress={() => addImageFromLibrary("profile_image")}>
                        Edit Profile Picture
                    </Button>
                    <Button icon="view-gallery" mode="elevated" onPress={() => addImageFromLibrary("banner_image")}>
                        Edit Banner Image
                    </Button>
                </View>
                <View style={styles.logininputContainer}>
                    <TextInput
                        value={notifyUser.userName}
                        autoCorrect={false}
                        placeholder='Enter your userName'
                        style={styles.logininput}
                        onChangeText={(value) => {
                            setNotifyUser({ ...notifyUser, userName: value })
                        }}
                    />
                    <TextInput
                        value={notifyUser.organization}
                        autoCorrect={false}
                        placeholder='Enter your organization'
                        style={styles.logininput}
                        onChangeText={(value) => {
                            setNotifyUser({ ...notifyUser, organization: value })
                        }}
                    />
                </View>
                <Pressable onPress={handleProfileEdit} style={styles.loginbutton}>
                    <View>
                        <Text style={styles.loginbuttonText}>Get Started</Text>
                    </View>
                </Pressable>
            </View>
        </Modal>
    );
};

export default ProfileFormModal;