import { memo } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { Avatar, useTheme, Text } from 'react-native-paper';
import { styles } from "../../utils/styles";
import { ReactionButtons } from "../Buttons";
import { BASE_URL } from "../../utils/api";

const ChatRoomMessage = memo(( { message } ) => {
    const user = useSelector(state => state.user)
    const isFromMe = message.user === user.userName;
    const theme = useTheme();

    return (
        <View>
            <View
                style={
                    isFromMe
                        ? [styles.messageWrapper, { alignItems: "flex-end" }]
                        : styles.messageWrapper
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {isFromMe
                        ?
                        null
                        :
                        <>
                        {
                            message.profileImage
                                ?
                                <Avatar.Image 
                                size={60} 
                                source={{ uri: `${BASE_URL}/images/${message.userId}.jpeg` }} 
                                style={{ position: 'relative', zIndex: 999 }}
                                />
                                :
                                <Avatar.Text
                                    size={60}
                                    label={message.user.charAt(0).toUpperCase()}
                                    style={{ backgroundColor: theme.colors.onPrimaryContainer , position: 'relative', zIndex: 999 }}
                                    labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
                                />
                        }
                        </>
                    }
                    <View
                        style={[styles.message,
                            isFromMe
                                ? { backgroundColor: theme.colors.primary, marginRight: 5 }
                                : { backgroundColor: theme.colors.secondary }
                        ]}
                    >
                        
                        <Text variant='titleMedium' style={{ color: theme.colors.text }}>
                            {message.text}
                        </Text>

                        <Text variant="bodySmall" style={{ color: theme.colors.textMuted }}>{message.time}</Text>

                        <View
                            style={[
                                isFromMe
                                    ? [styles.rightArrow, { backgroundColor: theme.colors.primary }]
                                    : [styles.leftArrow,{ backgroundColor: theme.colors.secondary }]
                            ]}
                        >
                        </View>
                        <View
                            style={[
                                isFromMe
                                    ? styles.rightArrowOverlap
                                    : styles.leftArrowOverlap,
                                { backgroundColor: theme.colors.background }
                            ]}
                        >
                        </View>
                    </View>
                </View>
                {/* <Text style={{ marginLeft: 40 }}>{message.time}</Text> */}
                <ReactionButtons message={message} />
            </View>
        </View>
    );
});

export default ChatRoomMessage