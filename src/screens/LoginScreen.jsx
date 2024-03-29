import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { createUser } from "../redux/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "../utils/styles";
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    Pressable,
    Alert,
    Image
} from "react-native";

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [notifyUser, setNotifyUser] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true)
        const checkForExistingUser = async () => {
            const existingUser = await AsyncStorage.getItem("notify_user");
            if (existingUser !== null) {
                const persistedUser = JSON.parse(existingUser)
                dispatch(createUser({...persistedUser, isLoggedIn: true}))
            } else {
                setIsLoading(false)
            }
        }
        checkForExistingUser()
    }, []);

    const storeCredentials = async () => {
        try {
            const jsonValue = JSON.stringify(notifyUser)
            await AsyncStorage.setItem("notify_user", jsonValue);
            dispatch(createUser({...notifyUser, isLoggedIn: true}))
        } catch (e) {
            Alert.alert("Error! While saving userName");
        }
    };

    const handleSignIn = () => {
        if (notifyUser.userName.trim() && notifyUser.organization.trim()) {
            storeCredentials();
        } else {
            Alert.alert(
                "TRY AGAIN",
                "UserName and Organization are required to chat.",
                [
                    {
                        "text": "OK"
                    }
                ],
                {
                    cancelable: true
                }
            );
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
                            placeholder='Enter your organization'
                            style={styles.logininput}
                            onChangeText={(value) => {
                                setNotifyUser({ ...notifyUser, organization: value })
                            }}
                        />
                    </View>
                    <Pressable onPress={handleSignIn} style={styles.loginbutton}>
                        <View>
                            <Text style={styles.loginbuttonText}>Get Started</Text>
                        </View>
                    </Pressable>
                </View>
            }
        </SafeAreaView>
    );
};

export default LoginScreen;