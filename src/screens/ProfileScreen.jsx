import React, { useEffect } from "react";
import { View, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar, useTheme, Surface, Button } from 'react-native-paper';
import { styles } from '../utils/styles';
import { ProfileFormModal } from '../components/profileFeature/ProfileFormModal';
import { ProfileImagePicker } from '../components/profileFeature/ProfileImagePicker';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const user = useSelector(state => state.user);
  const theme = useTheme();
console.log("USERRRRRRRPROFILEEEE", user)
  useEffect(() => {
    const checkForCameraRollPermission = async () => {
      const { status } = await ImagePicker.getCameraPermissionsAsync();
      if (status !== 'granted') {
        alert("Please grant camera roll permissions inside your system's settings");
      }
    };
    checkForCameraRollPermission()
  }, [])
  let banner;
  if (user.bannerImage) {
    banner = { uri: user.bannerImage }
  } else {
    banner = require('../../assets/notify-icon.png')
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.profileImageContainer} >
        <ImageBackground source={{ uri: user.bannerImage }} resizeMode="cover" style={{ width: '100%', height: 200, justifyContent: 'flex-end', alignItems: 'center' }}>
          {

            user.profileImage
              ?
              <Avatar.Image size={150} source={{ uri: user.profileImage }} style={styles.profileImage} />
              :
              user.userName ?
                <Avatar.Text size={150} label={user.userName.charAt(0).toUpperCase()} />
                :
                <Avatar.Text size={150} label={'N'} />

          }
        </ImageBackground>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        >
          <ProfileImagePicker
            buttonText={"Avatar"}
            imageDescription={"profileImage"}
          />
          <ProfileImagePicker
            buttonText={" Banner"}
            imageDescription={"bannerImage"}
          />
        </View>
      </View>
        <ProfileFormModal />
    </View>
  );
};