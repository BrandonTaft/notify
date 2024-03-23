import { View, Text } from "react-native";
import { Avatar } from 'react-native-paper';
import { styles } from "../utils/styles";

export default function ChatRoomMessages({ item, user }) {
    const status = item.user !== user;
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
                        <Avatar.Icon
                            size={35}
                            color="#fff"
                            icon="account-circle"
                            style={{position:'relative', zIndex:9}}
                            // title={Array.from(user)[0]}
                            
                        />
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
                            {item.text}
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
                <Text style={{ marginLeft: 40 }}>{item.time}</Text>
            </View>
        </View>
    );
}