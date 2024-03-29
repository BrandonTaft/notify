import React, { useState, useEffect } from 'react';
import { Image, View, ImageBackground, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button } from 'react-native-paper';
import { styles } from '../utils/styles';
import { editUserProfileImage, editUserBanner } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  
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
      dispatch(editUserProfileImage(_image.assets[0].uri));
    }
  };

  const takePicture = async () => {
    const pictureTaken = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
    });
    if (!pictureTaken.canceled) {
      dispatch(editUserProfileImage(pictureTaken.assets[0].uri))
      const pic = JSON.stringify({ profileImage: pictureTaken.assets[0].uri })
      await AsyncStorage.mergeItem('notify_user', pic)
    }
  }

  const addBanner = async () => {
    let bannerImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!bannerImage.canceled) {
      dispatch(editUserBanner(bannerImage.assets[0].uri))
      const banner = JSON.stringify({ bannerImage: bannerImage.assets[0].uri })
      await AsyncStorage.mergeItem('notify_user', banner)
    }
  };

  let banner;
  if(user.bannerImage){
  banner = {uri: user.bannerImage}
  } else {
    banner = require('../../assets/notify-icon.png')
  }

  return (
    <View style={styles.profileScreenContainer}>
    
        <View style={styles.profileImage} >
        <ImageBackground source={{uri: user.bannerImage}} resizeMode="cover" style={{width:'100%', height:250, justifyContent:'flex-end', alignItems:'center'}}>
          {
            user.profileImage
              ?
              <Avatar.Image size={180} source={{ uri: user.profileImage }} />
              :
              user.userName ?
                <Avatar.Text size={200} label={user.userName.charAt(0).toUpperCase()} />
                :
                <Avatar.Text size={200} label={'N'} />

          }
           </ImageBackground>
          <View style={styles.profileImageBtnContainer}>
          <Button icon="camera" mode="elevated" onPress={takePicture}>
            Camera
          </Button>
          <Button icon="view-gallery" mode="elevated" onPress={addImage}>
            Gallery
          </Button>
          <Button icon="view-gallery" mode="elevated" onPress={addBanner}>
            Banner
          </Button>
        </View>
        </View>
      <View style={styles.profileData}>
        <Text>User name : {user.userName}</Text>
        <Text>Organization : {user.organization}</Text>
      </View>
    </View>
  );
};