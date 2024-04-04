import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/userSlice';
import { Avatar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from "../utils/socket";
import { styles } from "../utils/styles";



export function LogOutButton({ styles, size, color }) {
    const dispatch = useDispatch()
    return (
        <Pressable style={styles} onPress={async () => {
            await AsyncStorage.removeItem("notify_user")
            dispatch(logOutUser())
        }}>
            <AntDesign name='logout' size={size} color={color} style={styles} />
        </Pressable>
    )
}

export function AvatarButton({ handlePress, size, color, theme }) {
    const user = useSelector(state => state.user);
    return (
        <Pressable style={styles.avatarButton} onPress={handlePress}>
            {
                user.profileImage
                    ?
                    <Avatar.Image size={size} source={{ uri: user.profileImage }} />
                    :
                    user.userName ?
                        <Avatar.Text size={size} label={user.userName.charAt(0).toUpperCase()} />
                        :
                        <Avatar.Text size={size} label={'N'} />
            }
        </Pressable>
    )
};

export function ReactionButtons({ message }) {
    const reactionEmoji = {
        thumbsUp: '👍',
        thumbsDown: '👎',
        heart: '❤️',
        eyes: '👀'
    };

    const [chatReaction, setChatReaction] = useState({});
    useLayoutEffect(() => {
        setChatReaction(message.reactions)
    }, []);

    useEffect(() => {
        socket.on("newReaction", (reaction) => setChatReaction(reaction));
    }, [socket]);

    const handleNewReaction = (emojiName) => {
        socket.emit("newReaction", {
            room_id: message.room_id,
            id: message.id,
            reaction: emojiName
        });
    };

    const reactionButtons = Object.entries(reactionEmoji).map(([emojiName, emoji]) => {
        return (
            <Pressable key={emojiName} style={{}} onPress={() =>
                handleNewReaction(emojiName)
            }>
                <Text style={{ color: '#fff' }}>{emoji} {chatReaction[emojiName]}</Text>
            </Pressable>
        )
    });

    return <View style={styles.reactions}>{reactionButtons}</View>
};