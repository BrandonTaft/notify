import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { createUser } from "../redux/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../utils/styles";
import { logInUser } from "../utils/api";
import {
   
    SafeAreaView,
    View,
    TextInput,
    Pressable,
    Alert,
    Image
} from "react-native";
import { Modal, Button, Dialog, Portal, Text } from "react-native-paper";
import RegisterModal from "../components/RegisterModal";

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [notifyUser, setNotifyUser] = useState({
        userName: '',
    password: '',
    });
    const [message, setMessage] = useState('');
  const hideDialog = () => setMessage(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const dispatch = useDispatch();

    // useEffect(() => {

    //     setIsLoading(true)
    //     const checkForExistingUser = async () => {
    //         await AsyncStorage.clear()
    //         const existingUser = await AsyncStorage.getItem("notify_user");
    //         if (existingUser !== null) {
    //             const persistedUser = JSON.parse(existingUser)
    //             dispatch(createUser({ ...persistedUser, isLoggedIn: true }))
    //         } else {
    //             setIsLoading(false)
    //         }
    //     }
    //     checkForExistingUser()
    // }, []);

    const storeCredentials = async () => {
        try {
            const jsonValue = JSON.stringify(notifyUser)
            await AsyncStorage.setItem("notify_user", jsonValue);
            console.log(notifyUser)
            dispatch(createUser({ ...notifyUser, isLoggedIn: true }))
        } catch (e) {
            Alert.alert("Error! While saving userName");
        }
    };

    const handleSignIn = () => {
        // if (notifyUser.userName.trim() && notifyUser.organization.trim()) {
        //     storeCredentials();
        // } else {
        //     Alert.alert(
        //         "TRY AGAIN",
        //         "UserName and Organization are required to chat.",
        //         [
        //             {
        //                 "text": "OK"
        //             }
        //         ],
        //         {
        //             cancelable: true
        //         }
        //     );
        // }
        if (notifyUser.userName === '') {
            setMessage("You must enter a user name")
        } else if (notifyUser.password === '') {
            setMessage("You must enter a password")
        }  else {
            logInUser(notifyUser).then(result => {
                console.log(result)
                if (result.success) {
                    console.log(notifyUser,"IRANNNN")
                    dispatch(createUser({ ...notifyUser, isLoggedIn: true }))
                } else {
                    setMessage(result.message)
                }
            })
        }
    };

    return (
        <SafeAreaView style={styles.loginscreen}>
            {isLoading
                ?
                <Image source={require('../../assets/notify-icon.png')} />
                :
                <View style={styles.loginscreen}>
                    <Text style={styles.loginheading}>Sign in</Text>
                    <View style={styles.logininputContainer}>
                        <TextInput
                            autoCorrect={false}
                            placeholder='Enter your userName'
                            style={styles.logininput}
                            onChangeText={(value) => {
                                setNotifyUser({ ...notifyUser, userName: value, id: nanoid() })
                            }}
                        />
                        <TextInput
                            autoCorrect={false}
                            placeholder='password'
                            style={styles.logininput}
                            onChangeText={(value) => {
                                setNotifyUser({ ...notifyUser, password: value })
                            }}
                        />
                    </View>
                    <Pressable onPress={handleSignIn} style={styles.loginbutton}>
                        <View>
                            <Text style={styles.loginbuttonText}>Get Started</Text>
                        </View>
                    </Pressable>
                    <Button mode="text" onPress={() => setShowRegisterModal(true)}>
                        Register
                    </Button>
                </View>
            }
            <Portal>
          <Dialog visible={message} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    


            <Modal
                visible={showRegisterModal}
                style={{ padding: 20 }}
                onDismiss={() => {
                    setShowRegisterModal(false);
                }}>
                <RegisterModal setShowRegisterModal={setShowRegisterModal} />
            </Modal>
        </SafeAreaView>
    );
};

export default LoginScreen;