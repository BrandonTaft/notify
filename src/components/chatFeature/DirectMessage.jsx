import { memo } from "react";
import { View } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon } from 'react-native-paper';
import { styles } from "../../utils/styles";
import { BASE_URL } from "../../utils/api";

const DirectMessage = memo(( { message, isLoggedIn } ) => {
    const theme = useTheme();

    return (
            <View
                style={
                    message.fromSelf
                        ? [styles.messageWrapper, { alignItems: "flex-end" }]
                        : styles.messageWrapper
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {message.fromSelf
                        ?
                        null
                        :
                        <>
                        {
                            message.profileImage
                                ?
                                <Avatar.Image 
                                size={60} 
                                source={{ uri: `${BASE_URL}/images/${message.senderId}.jpeg` }} 
                                style={{ position: 'relative', zIndex: 999 }}
                                />
                                :
                                <Avatar.Text
                                    size={60}
                                    label={message.sender.charAt(0).toUpperCase()}
                                    style={{ backgroundColor: theme.colors.onPrimaryContainer , position: 'relative', zIndex: 999 }}
                                    labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
                                />
                        }
                        </>
                    }
                    
                    <View
                        style={[styles.message,
                            message.fromSelf
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
                                message.fromSelf
                                    ? [styles.rightArrow, { backgroundColor: theme.colors.primary }]
                                    : [styles.leftArrow,{ backgroundColor: theme.colors.secondary }]
                            ]}
                        >
                        </View>
                        <View
                            style={[
                                message.fromSelf
                                    ? styles.rightArrowOverlap
                                    : styles.leftArrowOverlap,
                                { backgroundColor: theme.colors.background }
                            ]}
                        >
                        </View>
                    </View>
                </View>
            </View>
    );
});

export default DirectMessage