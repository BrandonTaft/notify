import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { createUser } from "../redux/userSlice";
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

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [organization, setOrganization] = useState("");
    const dispatch = useDispatch();
//     useEffect(() => {
//         const checkForExistingUser = async () => {
//    await AsyncStorage.clear()
//             const existingUser = await AsyncStorage.getItem("username");
//             if (existingUser) navigation.navigate("HomeScreen");
//         }
//         checkForExistingUser()
//     }, []);

    const storeCredentials = async () => {
        try {
            // await AsyncStorage.setItem("username", username);
            // await AsyncStorage.setItem("organization", organization);
            dispatch( createUser({userName:username, organization: organization}))
            
        } catch (e) {
            console.log(e.message)
            Alert.alert("Error! While saving username");
        }
    };

    const handleSignIn = () => {
        if (username.trim() && organization.trim()) {
            storeCredentials();
        } else {
            Alert.alert(
                "TRY AGAIN",
                "Username and Organization are required to chat.",
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
                     <TextInput
                        autoCorrect={false}
                        placeholder='Enter your organization'
                        style={styles.logininput}
                        onChangeText={(value) => setOrganization(value)}
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

export default LoginScreen;