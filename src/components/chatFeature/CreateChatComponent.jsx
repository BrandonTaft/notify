import { View, Text, TextInput, Pressable } from "react-native";
import { Modal, Portal, RadioButton } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { styles } from "../../utils/styles";
import socket from "../../utils/socket";

const CreateChatComponent = ({ showCreateChatComponent, setShowCreateChatComponent }) => {
    const [roomName, setRoomName] = useState("");
    const [organization, setOrganization] = useState("");
    const [isPrivate, setIsPrivate] = useState(false);

    useEffect(() => {
        const getOrgFromStorage = async () => {
        const jsonValue = await AsyncStorage.getItem('notify_user');
        setOrganization(JSON.parse(jsonValue).organization)
        }
        if(showCreateChatComponent) getOrgFromStorage()
    },[showCreateChatComponent])
    const closeModal = () => {
        setOrganization("")
        setShowCreateChatComponent(false)
    };
    const handleCreateRoom = () => {
        socket.emit(
            "createRoom",
            {
                roomName: roomName,
                organization: organization,
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