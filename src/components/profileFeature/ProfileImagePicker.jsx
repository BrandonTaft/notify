import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, useTheme } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { storeProfileImage } from "../../utils/api";
import { editUserProfileImage } from '../../redux/userSlice';

export const ProfileImagePicker = ({buttonText, imageDescription}) => {
    const theme = useTheme();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    
    const addImageFromLibrary = async (imageType) => {
        let _image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        if (!_image.canceled) {
            dispatch(editUserProfileImage({ imageType: imageType, image: _image.assets[0].uri }));
            let imageToStore = JSON.stringify({ imageType: _image.assets[0].uri })
            await AsyncStorage.mergeItem('notify_user', imageToStore)
            storeProfileImage(imageType, _image.assets[0].uri, user._id)
        }

    };

    return ( 
            <Button
                icon="account-edit"
                mode="elevated"
                onPress={() => addImageFromLibrary(imageDescription)}
            >
                {buttonText}
            </Button>
    );
};