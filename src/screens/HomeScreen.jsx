import { useState, useLayoutEffect, useEffect } from "react";
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import UpcomingReminders from '../components/reminderFeature/UpcomingReminders';
import Tools from '../components/Tools';
import ChatRoomPreview from '../components/chatFeature/ChatRoomPreview';
import { Surface, useTheme, Divider } from 'react-native-paper';
import DirectMessagePreview from '../components/chatFeature/DirectMessagePreview';
import { socket } from "../utils/socket";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { fetchAllUsers } from "../utils/api";
import { UserView } from "../components/UserView";

const HomeScreen = () => {
    const [users, setUsers] = useState([]);
    const theme = useTheme();
    const rooms = useSelector(state => state.chatRooms);
    const dispatch = useDispatch();


    const self = useSelector(state => state.user);

    const sortUsers = (users) => {
        users.sort((a, b) => {
            if (a._id === self._id) return -1;
            if (b._id === self._id) return 1;
            if (a.userName.toUpperCase() < b.userName.toUpperCase()) return -1;
            return a.userName.toUpperCase() > b.userName.toUpperCase() ? 1 : 0;
        });
       setUsers(users)
    };

    useLayoutEffect(() => {
        //fetches users on layout
        fetchAllUsers().then(({ users }) => {
            if (users) {
                sortUsers(users)
            }
        });
    }, []);

   
    useEffect(() => {
         //refreshes list anytime a user logs in/out or is disco'd/connected from/to server
        socket.on("user connected", () => {
            console.log("someone else connected")
            fetchAllUsers().then(({ users }) => {
                console.log("USERS",self.userName, users)
                if (users) {         
                        sortUsers(users)            
                }
            })
        });

          //refreshes list anytime a user logs in/out or is disco'd/connected from/to server
          socket.on("user disconnected", () => {
            console.log("someone disconnected")
            fetchAllUsers().then(({ users }) => {
                console.log("USERS",self.userName, users)
                if (users) {
                        sortUsers(users)
                }
            })
        });

        //stores session once logged in
        socket.on("session", async ({ sessionID, userID }) => {
            const token = SecureStore.getItem("secureToken");
            // attach the session ID to the next reconnection attempts
            socket.auth = { token: token, sessionID: sessionID };
            // store it in the localStorage
            await AsyncStorage.setItem("sessionID", sessionID);
            // save the ID of the user
            socket.userID = userID;
            console.log("SESSION STORED")
        });
       
    }, [])

    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Surface style={{ flexDirection: 'column', flex: 2, margin: 10, borderRadius: 10 }} elevation={2}>
                <ChatRoomPreview rooms={rooms}/>
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 2, margin: 10, borderRadius: 10 }} elevation={2}>
               
                <DirectMessagePreview />
            </Surface>
            <Divider horizontalInset />
            <Surface style={{ flexDirection: 'column', flex: 1,  margin: 10, borderRadius: 10 }} elevation={2}>
                <UserView  allUsers={users}/>
            </Surface>
        </View>
    )
}

export default HomeScreen