import { View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Avatar, useTheme } from 'react-native-paper';
import { styles } from '../../utils/styles';

export default function ProfileImage() {
    const user = useSelector(state => state.user);
    const navigation = useNavigation();
    const theme = useTheme();

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
                                style={{ backgroundColor: theme.colors.onPrimaryContainer }}
                                color={theme.colors.primaryContainer}
                                label={user.userName.charAt(0).toUpperCase()}
                                labelStyle={{fontWeight:"bold"}}
                            />
                            :
                            <Avatar.Text
                                size={64}
                                style={{ backgroundColor: theme.colors.onPrimaryContainer }}
                                color={theme.colors.primaryContainer}
                                label={'N'}
                                labelStyle={{fontWeight:"bold"}}
                            />

                }
            </TouchableOpacity>
        </>
    );
};