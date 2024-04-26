import { View, Text } from "react-native";
import { Avatar, useTheme } from 'react-native-paper';
import { styles } from "../../utils/styles";
import { ReactionButtons } from "../Buttons";

export default function ChatRoomMessage({ message, user }) {
    console.log("MESSAGE", message)
    const isFromMe = message.user === user;
    console.log(isFromMe)
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
                            message.profile_image
                                ?
                                <Avatar.Image 
                                size={60} 
                                source={{ uri: `https://70bc-75-131-25-248.ngrok-free.app/images/${message.userId}.jpeg` }} 
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
                                ? [styles.mmessage, { backgroundColor: "aqua", marginRight: 5 }]
                                : styles.mmessage
                        }
                    >
                        
                        <Text style={styles.mmessageText}>
                            {message.text}
                        </Text>

                        <Text style={{}}>{message.time}</Text>

                        <View
                            style={
                                isFromMe
                                    ? styles.rightArrow
                                    : styles.leftArrow
                            }
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