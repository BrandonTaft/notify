import { Modal, Portal, RadioButton, Button, useTheme, Text, TextInput, } from "react-native-paper";
import React, { useState } from "react";
import { styles } from "../../utils/styles";
import {socket, publicSocket, privateSocket} from "../../utils/socket";
import { useSelector } from "react-redux";
import * as Crypto from 'expo-crypto';
import { useNavigation } from "@react-navigation/native";

export const CreateChatComponent = ({ showCreateChatComponent, setShowCreateChatComponent }) => {
    const [roomName, setRoomName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const user = useSelector(state => state.user);
    const navigation = useNavigation();
    const theme = useTheme();
    
    const handleCreateRoom = () => {
        const roomId = Crypto.randomUUID();
        socket.emit(
            "createRoom",
            {
                roomId,
                roomName,
                isPrivate,
                ownerId: user._id,
                ownerName: user.userName,
                organization: user.organization,
            }
        );
        setShowCreateChatComponent(false)
        navigation.navigate({
            name: 'ChatRoomScreen',
            params: {
                roomId: roomId,
                name: roomName,
            }
        });
    };

    return (
        <Portal>
            <Modal
                visible={showCreateChatComponent}
                style={{ backgroundColor: theme.colors.background, opacity:.9 }}
                contentContainerStyle={{ backgroundColor: theme.colors.surface, padding: 20 }}
                onDismiss={() => {
                    setShowCreateChatComponent(false);
                }}>
                <Text style={styles.modalsubheading}>Enter your Group name</Text>
                <TextInput
                    style={{}}
                    placeholder='Group name'
                    onChangeText={(value) => setRoomName(value)}
                />

               
                    <Button mode='contained' onPress={handleCreateRoom}>
                        <Text style={styles.modaltext}>CREATE</Text>
                    </Button>
                    <Button 
                    mode='contained' 
                    onPress={() => setShowCreateChatComponent(false)}
                    >
                        <Text style={styles.modaltext}>
                            CANCEL
                        </Text>
                    </Button>
             
                <RadioButton.Item 
                label="Private Room"
                 value={isPrivate} 
                 status={isPrivate ? 'checked' : 'unchecked'} 
                 onPress={() => setIsPrivate(!isPrivate)}
                 />
            </Modal>
        </Portal>
    );
};