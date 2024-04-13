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
                        // <Avatar.Icon
                        //     size={35}
                        //     color="#fff"
                        //     icon="account-circle"
                        //     style={{position:'relative', zIndex:9}}
                        //     // title={Array.from(user)[0]}
                            
                        // />
                        :
                        <Avatar.Image size={60} source={{ uri: `https://1c77-75-131-25-248.ngrok-free.app/images/${message.user_id}.jpeg` }} style={{position:'relative', zIndex:999}}/>
                       
                    }
                    <View
                        style={
                            isFromMe
                                ? [styles.mmessage, { backgroundColor: "aqua", marginRight:5 }]
                                : styles.mmessage
                        }
                    >
                        <Text style={styles.mmessageText}>
                            {message.text}
                        </Text>
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
                                    {backgroundColor: theme.colors.background}
                            ]}
                        >
                        </View>
                    </View>
                </View>
                <Text style={{ marginLeft: 40 }}>{message.time}</Text>
                <ReactionButtons message={message} />
            </View>
        </View>
    );
}