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
import { socket } from "../utils/socket";

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

    const signInToSocket = async (token, user) => {
        //Updates state and sets logged in true to navigate to home page
        dispatch(createUser({ ...user, isLoggedIn: true }))

        //checks for existing sessio id
        const sessionID = await AsyncStorage.getItem("sessionID");

        console.log("SESSION", sessionID)
        // if there is one it sends it to socket server for login
        if (sessionID) {
            socket.auth = { token: token, sessionID: sessionID };
            socket.connect();
        } else {
            // if no session id it sends creds to login and be added to active user array
            socket.auth = { token: token, userID: user._id, username: user.userName };
            socket.connect();
        }
    }

    useEffect(() => {
        //error handler
        socket.on("connect_error", (err) => {
            if (err.message === "invalid user id") {
                setMessage("Unable to connect Server - Invalid credentials")
                console.log("Unable to connect to socket")
            }
        });

        (async () => {
            //await AsyncStorage.removeItem("sessionID")
            // await AsyncStorage.removeItem("notify_user");
            // await SecureStore.deleteItemAsync("secureToken")
            try {
                setIsLoading(true)
                //checks for existing logged in user and token
                const token = await SecureStore.getItemAsync("secureToken");
                if (token !== null) {
                    //sends user and token to be logged back in
                    refreshUser(token).then(async (result) => {
                        //once authenticated and logged in it sends session and/or user to socket server
                        if (result.success) {
                            signInToSocket(token, result.existingUser)
                        } else {
                            //displays message if not authenticated
                            setMessage(result.message)
                            setIsLoading(false)
                        }
                    })
                } else {
                    setIsLoading(false)
                }
            } catch (error) {
                setMessage(result.message)
                console.log("Unable to access token", error);
            }
        })();

        return () => {
            socket.off("connect_error");
        }
    }, []);

    const handleSignIn = () => {
        if (!notifyUser.userName.trim()) {
            setMessage("You must enter a user name")
        } else if (!notifyUser.password.trim()) {
            setMessage("You must enter a password")
        } else {
            
            //sends username and password to be authenticated
            logInUser(notifyUser).then(async (result) => {
                //if auth. then store token and user - then sign in to socket
                if (result.success) {
                    const jsonValue = JSON.stringify(result.existingUser)
                    await AsyncStorage.setItem("notify_user", jsonValue);
                    await SecureStore.setItemAsync("secureToken", result.token);
                    signInToSocket(result.token, result.existingUser)
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