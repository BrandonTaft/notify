import { View, Text, TextInput, Pressable } from "react-native";
import { Modal, Portal } from "react-native-paper";
import React, { useState } from "react";
import { styles } from "../../utils/styles";
import socket from "../../utils/socket";
import { nanoid } from "@reduxjs/toolkit";


const CreateChatComponent = ({ showCreateChatComponent, setShowCreateChatComponent }) => {
    const [roomName, setRoomName] = useState("");
    const closeModal = () => setShowCreateChatComponent(false);
    const handleCreateRoom = () => {
        socket.emit("createRoom", { roomName: roomName, organization: "brandon's org" });
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
               
            </Modal>
        </Portal>
    );
};

export default CreateChatComponent;