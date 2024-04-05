import { View, Text } from "react-native";
import { Avatar } from 'react-native-paper';
import { styles } from "../../utils/styles";
import { ReactionButtons } from "../Buttons";

export default function ChatRoomMessage({ message, user }) {
    console.log("MESSAGE", message)
    const status = message.user !== user;
    return (
        <View>
            <View
                style={
                    status
                        ? styles.mmessageWrapper
                        : [styles.mmessageWrapper, { alignItems: "flex-end" }]
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {status
                        ?
                        // <Avatar.Icon
                        //     size={35}
                        //     color="#fff"
                        //     icon="account-circle"
                        //     style={{position:'relative', zIndex:9}}
                        //     // title={Array.from(user)[0]}
                            
                        // />
                        <Avatar.Image size={60} source={{ uri: 'https://593b-2600-6c5a-4a7f-463a-61b3-94e3-5c2a-117f.ngrok-free.app/images/Ihb-hH2IMb95aCcnAmGu4.jpeg' }} style={{position:'relative', zIndex:999}}/>
                        :
                        ""
                    }
                    <View
                        style={
                            status
                                ? styles.mmessage
                                : [styles.mmessage, { backgroundColor: "aqua", marginRight:5 }]
                        }
                    >
                        <Text style={styles.mmessageText}>
                            {message.text}
                        </Text>
                        <View
                            style={
                                status
                                    ? styles.leftArrow
                                    : styles.rightArrow
                            }
                        >
                        </View>
                        <View
                            style={
                                status
                                    ? styles.leftArrowOverlap
                                    : styles.rightArrowOverlap
                            }
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