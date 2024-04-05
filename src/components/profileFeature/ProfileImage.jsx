import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { styles } from '../../utils/styles';

export default function ProfileImage() {
    const user = useSelector(state => state.user);
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.uploadBtn} >
                {
                    user.profileImage
                        ?
                        <Avatar.Image size={64} source={{ uri: user.profileImage }} />
                        :
                        user.userName ?
                            <Avatar.Text
                                size={64}
                                style={{ backgroundColor: colors.icon }}
                                color={colors.text}
                                label={user.userName.charAt(0).toUpperCase()}
                            />
                            :
                            <Avatar.Text
                                size={64}
                                style={{ backgroundColor: colors.icon }}
                                color={colors.text}
                                label={'N'}
                            />

                }
            </TouchableOpacity>
        </>
    );
};