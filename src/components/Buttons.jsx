import { useEffect, useLayoutEffect, useState, memo } from "react";
import { Pressable, Text, View, Appearance, useColorScheme } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/userSlice';
import { Avatar, IconButton, useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import {socket} from "../utils/socket";
import { styles } from "../utils/styles";

export function ThemeButton({ styles, size }) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    return (
        <IconButton
            icon="theme-light-dark"
            iconColor={theme.colors.onPrimaryContainer}
            size={40}
            onPress={() => Appearance.setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
        />
    )
}

export function DeleteProfileButton({ styles, size }) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const theme = useTheme();
    return (
        <IconButton
            icon="trash-can"
            iconColor={theme.colors.onPrimaryContainer}
            size={40}
            onPress={async () => {
                dispatch(logOut(user))
                await SecureStore.deleteItemAsync("secureToken")
                await AsyncStorage.removeItem("notify_user")
            }}
        />
    )
}

export function BackButton({ onPressButton, iconColor }) {
    const theme = useTheme();
    return (
        <IconButton
            icon="arrow-left"
            iconColor={iconColor}
            size={25}
            onPress={async () => onPressButton()}
        />
    )
}


export function AvatarButton({ handlePress, size }) {
    const user = useSelector(state => state.user);
    const theme = useTheme()
    return (
        <Pressable style={styles.avatarButton} onPress={handlePress}>
            {
                user.profileImage
                    ?
                    <Avatar.Image
                        size={size}
                        source={{ uri: user.profileImage }}
                    />
                    :
                    user.userName ?
                        <Avatar.Text
                            size={size}
                            label={user.userName.charAt(0).toUpperCase()}
                            style={{ backgroundColor: theme.colors.onPrimaryContainer }}
                            labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
                        />
                        :
                        <Avatar.Text
                            size={size}
                            label={'N'}
                            style={{ backgroundColor: theme.colors.onPrimaryContainer }}
                            labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
                        />
            }
        </Pressable>
    )
};

export const ReactionButtons = ({ message }) =>{
    const reactionEmoji = {
        thumbsUp: '👍',
        thumbsDown: '👎',
        heart: '❤️'
    };
    const [chatReaction, setChatReaction] = useState({});
    const { colors } = useTheme();
    console.log(message.messageId)
    useLayoutEffect(() => {
        setChatReaction(message.reactions)
    }, []);

    useEffect(() => {
        socket.on("newReaction", (reaction) => {
           
            if(message.messageId === reaction.messageId){
            setChatReaction(reaction.reactions)
            }
        });
    }, [socket]);

    const handleNewReaction = (emojiName) => {
        socket.emit("newReaction", {
            roomId: message.roomId,
            messageId: message.messageId,
            reaction: emojiName
        });
    };

    const reactionButtons = Object.entries(reactionEmoji).map(([emojiName, emoji]) => {
        return (
            <Pressable key={emojiName} style={{}} onPress={() =>
                handleNewReaction(emojiName)
            }>
                <Text style={{ color: colors.primary, fontSize:18, marginHorizontal:3 }}>{emoji} {chatReaction[emojiName]}</Text>
            </Pressable>
        )
    });

    return <View style={styles.reactions}>{reactionButtons}</View>
};