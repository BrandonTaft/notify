import { View, Text } from "react-native";
import React from "react";
import { Avatar } from '@rneui/themed';
import { styles } from "../utils/styles";

export default function MessageComponent({ item, user }) {
    console.log(user)
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
                        <Avatar
                            size={35}
                            rounded
                            title={Array.from(user)[0]}
                            containerStyle={{ backgroundColor: "blue", marginTop:'auto', zIndex:100 }}
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