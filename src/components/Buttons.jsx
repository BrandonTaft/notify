import { AntDesign } from '@expo/vector-icons';
import { Pressable } from "react-native";
import { useDispatch } from 'react-redux';
import { logOutUser } from '../redux/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';




export function LogOutButton({ styles, size, color }) {
    const dispatch = useDispatch()
    return (
            <Pressable style={styles} onPress={async()=> {
                await AsyncStorage.removeItem("notify_user")
                dispatch(logOutUser())
                }}>
                <AntDesign name='logout' size={size} color={color} style={styles} />
            </Pressable>
    )
}