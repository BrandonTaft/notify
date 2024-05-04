import { View, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar, useTheme, Surface } from 'react-native-paper';
import { styles } from '../utils/styles';
import ProfileFormModal from '../components/profileFeature/ProfileFormModal';

export default function ProfileScreen() {
  const user = useSelector(state => state.user);
  const theme = useTheme();
console.log(user)
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
      </View>
      <Surface
            elevation={3}
            style={
                {
                  flex:3,
                    justifyContent: 'center',
                    borderRadius: 20,
                    padding: 10,
                    
                    alignItems: 'center',
                    margin: 20,
                    marginBottom: 30,
                    marginTop:0
                }
            }
        >
        <ProfileFormModal/>
      </Surface>
    </View>
  );
};