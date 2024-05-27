import { View } from "react-native";
import { useSelector } from "react-redux";
import { Avatar, useTheme, Text } from 'react-native-paper';
import { styles } from "../../utils/styles";
import { ReactionButtons } from "../Buttons";

export default function ChatRoomMessage({ message }) {
    //console.log("MESSAGE", message)
    const user = useSelector(state => state.user)
    const isFromMe = message.user === user.userName;
    console.log(isFromMe, user)
    const theme = useTheme();
    return (
        <View>
            <View
                style={
                    isFromMe
                        ? [styles.mmessageWrapper, { alignItems: "flex-end" }]
                        : styles.mmessageWrapper
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
                                source={{ uri: `https://4852-75-131-25-248.ngrok-free.app/images/${message.userId}.jpeg` }} 
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
                        style={
                            isFromMe
                                ? [styles.mmessage, { backgroundColor: theme.colors.primary , marginRight: 5 }]
                                : styles.mmessage
                        }
                    >
                        
                        <Text variant='titleMedium' style={{ color: theme.colors.text }}>
                            {message.text}
                        </Text>

                        <Text variant="bodySmall" style={{ color: theme.colors.textMuted }}>{message.time}</Text>

                        <View
                            style={[
                                isFromMe
                                    ? styles.rightArrow
                                    : styles.leftArrow,
                                    { backgroundColor: theme.colors.primary }
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
}