import React, { useState, useEffect } from "react";
import {
    Text,
    SafeAreaView,
    View,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../utils/styles";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        const checkForExistingUser = async () => {
            //await AsyncStorage.clear()
            const existingUser = await AsyncStorage.getItem("username");
            if (existingUser) navigation.navigate("Home");
        }
        checkForExistingUser()
    }, []);

    const storeUsername = async () => {
        try {
            await AsyncStorage.setItem("username", username);
            navigation.navigate("Home");
        } catch (e) {
            Alert.alert("Error! While saving username");
        }
    };

    const handleSignIn = () => {
        if (username.trim()) {
            storeUsername();
        } else {
            Alert.alert(
                "TRY AGAIN",
                "Username is required to chat.",
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
            <View style={styles.loginscreen}>
                <Text style={styles.loginheading}>Sign in</Text>
                <View style={styles.logininputContainer}>
                    <TextInput
                        autoCorrect={false}
                        placeholder='Enter your username'
                        style={styles.logininput}
                        onChangeText={(value) => setUsername(value)}
                    />
                </View>

                <Pressable onPress={handleSignIn} style={styles.loginbutton}>
                    <View>
                        <Text style={styles.loginbuttonText}>Get Started</Text>
                    </View>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Login;