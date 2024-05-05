import { View, Text, TextInput, Pressable } from "react-native";
import { Modal, Portal, RadioButton } from "react-native-paper";
import React, { useState } from "react";
import { styles } from "../../utils/styles";
import socket from "../../utils/socket";

const CreateChatComponent = ({ showCreateChatComponent, setShowCreateChatComponent }) => {
    const [roomName, setRoomName] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);
    const closeModal = () => setShowCreateChatComponent(false);
    const handleCreateRoom = () => {
        socket.emit(
            "createRoom",
            {
                roomName: roomName,
                organization: "brandon's org",
                isPrivate: isPrivate
            }
        );
        closeModal();
    };
    return (
        <Portal>
            <Modal
                visible={showCreateChatComponent}
                style={{ padding: 20 }}
                contentContainerStyle={{ backgroundColor: 'red', padding: 20 }}
                onDismiss={() => {
                    setShowCreateChatComponent(false);
                }}>


                <Text style={styles.modalsubheading}>Enter your Group name</Text>
                <TextInput
                    style={styles.modalinput}
                    placeholder='Group name'
                    onChangeText={(value) => setRoomName(value)}
                />

                <View style={styles.modalbuttonContainer}>
                    <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
                        <Text style={styles.modaltext}>CREATE</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.modalbutton, { backgroundColor: "#E14D2A" }]}
                        onPress={closeModal}
                    >
                        <Text style={styles.modaltext}>CANCEL</Text>
                    </Pressable>
                </View>
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

export default CreateChatComponent;