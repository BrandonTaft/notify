import { useState, useEffect } from "react";
import { Button, Text, TextInput, useTheme, Icon } from "react-native-paper";
import { logInUser, refreshUser } from "../utils/api";
import { useDispatch } from 'react-redux';
import { createUser } from "../redux/userSlice";
import { View, Image } from "react-native";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterModal from "../components/logInFeature/RegisterModal";
import Alert from "../components/Alert";
import {socket} from "../utils/socket";

const LoginScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [hidePassWord, setHidePassWord] = useState(true);
    const [message, setMessage] = useState('');
    const [notifyUser, setNotifyUser] = useState({
        userName: '',
        password: '',
    });
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        
        socket.on("connect_error", (err) => {
            if (err.message === "invalid user id") {
              console.log("Unable to connect to server")
            }
          });

        (async () => {
            try {
                setIsLoading(true)
                let token = await SecureStore.getItemAsync("secureToken");
                const existingUser = await AsyncStorage.getItem("notify_user");
                if (token !== null && existingUser) {
                    let user = JSON.parse(existingUser)
                    refreshUser(user._id).then(async (result) => {
                        if (result.success) {
                            dispatch(createUser({ ...result.existingUser, isLoggedIn: true }))
                            
                            const jsonValue = JSON.stringify(result.existingUser)
                            await AsyncStorage.setItem("notify_user", jsonValue);

                            socket.auth = {token: token, user: result.existingUser};
                            socket.connect();
                        } else {
                            setMessage(result.message)
                            setIsLoading(false)
                        }
                    })
                } else {
                    setIsLoading(false)
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
            logInUser(notifyUser).then(async (result) => {
                if (result.success) {
                    await SecureStore.setItemAsync("secureToken", result.token);
                    dispatch(createUser({ ...result.existingUser, isLoggedIn: true }))
                    socket.auth = {token: result.token, user: result.existingUser};
                            socket.connect();
                    const jsonValue = JSON.stringify(result.existingUser)
                    await AsyncStorage.setItem("notify_user", jsonValue);
                } else {
                    setMessage(result.message)
                }
            })
        }
    };

    return (
        <View style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        }}>
            {isLoading
                ?
                <Image source={require('../../assets/notify-icon.png')} />
                :
                <>
                    <View style={{ marginBottom: 40 }}>
                        <Icon
                            source="reminder"
                            color={theme.colors.primary}
                            size={120}
                        />
                    </View>
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
                        style={{ width: '80%', margin: 15 }}
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
                        uppercase
                        theme={theme.buttonRoundness}
                        textColor={theme.colors.onSecondary}
                        style={[{ backgroundColor: theme.colors.secondary, margin: 25, width: '50%' }]}
                        onPress={handleSignIn}
                    >
                        Get Started
                    </Button>
                    <RegisterModal />
                </>
            }
            <Alert message={message} setMessage={setMessage} />
        </View>
    );
};

export default LoginScreen;