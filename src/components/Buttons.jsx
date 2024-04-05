import { useEffect, useLayoutEffect, useState } from "react";
import { Pressable, Text, View, Appearance, useColorScheme } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/userSlice';
import { Avatar, IconButton, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from "../utils/socket";
import { styles } from "../utils/styles";

export function ThemeButton({ styles, size }) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    return (
        <IconButton
            icon="theme-light-dark"
            iconColor={theme.colors.text}
            size={40}
            // onPress={async () => {
            //     await AsyncStorage.removeItem("notify_user")
            //     dispatch(logOutUser())
            // }}
            onPress={() => Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
        />
    )
}

export function LogOutButton({ styles, size }) {
    const dispatch = useDispatch();
    const { colors } = useTheme();
    return (
        <IconButton
            icon="logout"
            iconColor={colors.icon}
            size={40}
            onPress={async () => {
                await AsyncStorage.removeItem("notify_user")
                dispatch(logOutUser())
            }}
        />
    )
}

export function AvatarButton({ handlePress, size }) {
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
    const { colors } = useTheme();

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
                <Text style={{ color: colors.text }}>{emoji} {chatReaction[emojiName]}</Text>
            </Pressable>
        )
    });

    return <View style={styles.reactions}>{reactionButtons}</View>
};