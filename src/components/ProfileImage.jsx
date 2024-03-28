import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { styles } from '../utils/styles';

export default function ProfileImage() {
    const user = useSelector(state => state.user);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.uploadBtn} >
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
    );
};