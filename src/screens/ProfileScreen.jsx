import React, { useState, useEffect } from 'react';
import { Image, View, ImageBackground, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button, FAB, IconButton, MD3Colors } from 'react-native-paper';
import { styles } from '../utils/styles';
import { editUserProfileImage, editUserBanner } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileFormModal from '../components/modals/ProfileFormModal';
import Notes from '../components/Notes';
import UpcomingReminders from '../components/UpcomingReminders';

export default function ProfileScreen() {
  const [showProfileFormModal, setShowProfileFormModal] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch()



  // useEffect(() => {
  //   const checkForCameraRollPermission = async () => {
  //     const { status } = await ImagePicker.getCameraPermissionsAsync();
  //     if (status !== 'granted') {
  //       alert("Please grant camera roll permissions inside your system's settings");
  //     }
  //   };
  //   checkForCameraRollPermission()
  // }, [])

  // const takeProfileImageWithCamera = async () => {
  //   const pictureTaken = await ImagePicker.launchCameraAsync({
  //     allowsEditing: true,
  //     quality: 0.5,
  //   });
  //   if (!pictureTaken.canceled) {
  //     dispatch(editUserProfileImage(pictureTaken.assets[0].uri))
  //     const pic = JSON.stringify({ profileImage: pictureTaken.assets[0].uri })
  //     await AsyncStorage.mergeItem('notify_user', pic)
  //   }
  // }

  // const addImageFromLibrary = async (imageType) => {
  //   let _image = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 1,
  //   });
  //   if (!_image.canceled) {
  //     let imageToStore;
  //     if (imageType === "profile_image") {
  //       dispatch(editUserProfileImage(_image.assets[0].uri));
  //       imageToStore = JSON.stringify({ profileImage: _image.assets[0].uri })
  //       await AsyncStorage.mergeItem('notify_user', imageToStore)

  //     } else {

  //       dispatch(editUserBanner(_image.assets[0].uri))
  //       imageToStore = JSON.stringify({ bannerImage: _image.assets[0].uri })
  //       await AsyncStorage.mergeItem('notify_user', imageToStore)
  //     }
  //   }
  // };

  let banner;
  if (user.bannerImage) {
    banner = { uri: user.bannerImage }
  } else {
    banner = require('../../assets/notify-icon.png')
  }

  return (
    <View style={styles.profileScreen}>
 <IconButton
          icon="account-edit"
          iconColor={MD3Colors.primary100}
          size={40}
          containerColor='grey'
          style={styles.fab}
          onPress={() => setShowProfileFormModal(true)}
        />
      <View style={styles.profileImageContainer} >
        <ImageBackground source={{ uri: user.bannerImage }} resizeMode="cover" style={{ width: '100%', height: 200, justifyContent: 'flex-end', alignItems: 'center' }}>
          {

            user.profileImage
              ?
              <Avatar.Image size={150} source={{ uri: user.profileImage }} style={styles.profileImage} />
              :
              user.userName ?
                <Avatar.Text size={200} label={user.userName.charAt(0).toUpperCase()} />
                :
                <Avatar.Text size={200} label={'N'} />

          }
        </ImageBackground>
      </View>
      <View style={styles.profileData}>
        <Text style={styles.profileText}>{user.userName}</Text>
        <Text style={styles.profileText}>{user.organization}</Text>
      </View>
      <ProfileFormModal
        showProfileFormModal={showProfileFormModal}
        setShowProfileFormModal={setShowProfileFormModal}
      />
      <View style={styles.profileNotesContainer} >
        <Notes />
      <Notes />
      </View>
    </View>
  );
};