import React, { useState, useEffect } from 'react';
import { Image, View, TouchableOpacity, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-paper';
import { styles } from '../utils/styles';
import { editUserProfileImage } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
    const [image, setImage] = useState(null);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        const checkForCameraRollPermission = async () => {
            const { status } = await ImagePicker.getCameraPermissionsAsync();
            if (status !== 'granted') {
                alert("Please grant camera roll permissions inside your system's settings");
            }
        };
        checkForCameraRollPermission()
    }, [])

    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!_image.canceled) {
            setImage(_image.assets[0].uri);
        }
    };

    const takePicture = async () => {
        const pictureTaken = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.5,
        });
        if (!pictureTaken.canceled) {
            dispatch(editUserProfileImage(pictureTaken.assets[0].uri))
            const pic = JSON.stringify({profileImage: pictureTaken.assets[0].uri})
            await AsyncStorage.mergeItem('notify_user', pic)
        }
    }

    return (
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={takePicture} style={styles.uploadBtn} >
            {
                 user.profileImage
                 ?
                 <Avatar.Image size={200} source={{ uri: user.profileImage }} />
                 :
                 user.userName ?
                 <Avatar.Text size={200} label={user.userName.charAt(0).toUpperCase()} />
                 :
                 <Avatar.Text size={200} label={'N'} />
                    
            }
            </TouchableOpacity>
            </View>
            <View style={styles.uploadBtnContainer}>
                <TouchableOpacity onPress={takePicture} style={styles.uploadBtn} >
                    <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camera" size={20} color="black" />
                </TouchableOpacity>
             
            </View>
        </View>
    );
};