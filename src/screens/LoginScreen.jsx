import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { createUser } from "../redux/userSlice";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../utils/styles";
import { logInUser } from "../utils/api";
import {

    SafeAreaView,
    View,


    Alert,
    Image
} from "react-native";
import { Modal, Button, Dialog, Portal, Text, TextInput, useTheme } from "react-native-paper";
import RegisterModal from "../components/RegisterModal";

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hidePassWord, setHidePassWord] = useState(true);
    const [notifyUser, setNotifyUser] = useState({
        userName: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const hideDialog = () => setMessage(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        (async () => {
            try {
                let token = await SecureStore.getItemAsync("secureToken");
                const existingUser = await AsyncStorage.getItem("notify_user");
                if (token !== null && existingUser) {
                    const persistedUser = JSON.parse(existingUser)
                    dispatch(createUser({ ...persistedUser, isLoggedIn: true }))
                }
            } catch (error) {
                console.log("Unable to access token", error);
            }
        })();
    }, []);



    const handleSignIn = () => {
        if (!notifyUser.userName.trim()) {
            setMessage("You must enter a user name")
        } else if (!notifyUser.password.trim()) {
            setMessage("You must enter a password")
        } else {
            setIsLoading(true)
            logInUser(notifyUser).then(async (result) => {
                if (result.success) {
                    dispatch(createUser({ ...result.existingUser, isLoggedIn: true }))
                    const jsonValue = JSON.stringify(result.existingUser)
                    await AsyncStorage.setItem("notify_user", jsonValue);
                    await SecureStore.setItemAsync("secureToken", result.token);
                } else {
                    setMessage(result.message)
                }
                setIsLoading(false)
            })
        }
    };

    return (
        <SafeAreaView style={styles.loginscreen}>
            {isLoading
                ?
                <Image source={require('../../assets/notify-icon.png')} />
                :
                <View style={[{ backgroundColor: theme.colors.background }, styles.loginscreen]}>
                    <Image source={require('../../assets/notify-icon.png')} style={{position:'absolute', height:200, top:40}}/>
                    <Text
                        variant="headlineMedium"
                        style={{ color: theme.colors.primary }}
                    >
                        Sign In
                    </Text>

                    <TextInput
                        mode="outlined"
                        autoCorrect={false}
                        label='User Name'
                        theme={theme.roundness}
                        style={{ width: '80%', margin:15 }}
                        onChangeText={(value) => {
                            setNotifyUser({ ...notifyUser, userName: value.trim() })
                        }}
                    />
                    <TextInput
                        mode="outlined"
                        autoCorrect={false}
                        autoCapitalize="none"
                        blurOnSubmit={false}
                        label='Password'
                        theme={theme.roundness}
                        style={{ width: '80%' }}
                        textContentType="password"
                        secureTextEntry={hidePassWord ? true : false}
                        onChangeText={(value) => {
                            setNotifyUser({ ...notifyUser, password: value.trim() })
                        }}
                        right={
                            <TextInput.Icon
                                icon="eye"
                                iconColor={theme.colors.primary}
                                onPress={() => setHidePassWord(!hidePassWord)}
                            />
                        }
                    />

                    <Button
                        mode='elevated'
                        theme={theme.buttonRoundness}
                        textColor={theme.colors.onPrimary}
                        style={[{ backgroundColor: theme.colors.primary, margin:25, paddingHorizontal:15, width: '50%' }]}
                        onPress={handleSignIn}

                    >
                        Get Started
                    </Button>
                    <Button
                         mode='elevated'
                         theme={theme.buttonRoundness}
                         textColor={theme.colors.primary}
                         style={[{ backgroundColor: theme.colors.background, border:'solid', borderColor: theme.colors.primary, borderWidth:1, paddingHorizontal:15, width: '50%' }]}
                        onPress={() => setShowRegisterModal(true)}
                    >
                        
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