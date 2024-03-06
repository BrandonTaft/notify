import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Modal, Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { storeBackUpData } from '../api';
import * as SMS from 'expo-sms';
import * as Crypto from 'expo-crypto';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { DefaultEditor } from 'react-simple-wysiwyg';
//import Avatar from 'react-avatar'; control

function isUserEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'userevent';
}

function isDocumentEvent(message) {
  let evt = JSON.parse(message.data);
  return evt.type === 'contentchange';
}

const WS_URL = 'https://57bb-2600-6c5a-4a7f-463a-b548-d98d-5c05-b498.ngrok-free.app';


function LoginSection({ onLogin }) {
  const [username, setUsername] = useState('');
  useWebSocket(WS_URL, {
    share: true,
    filter: () => false
  });
  function logInUser() {
    if (!username.trim()) {
      return;
    }
    onLogin && onLogin(username);
  }

  return (
    <View style={styles.account}>
      <View style={styles.accountWrapper}>
        <View style={styles.accountCard}>
          <View style={styles.accounProfile}>
            <Text style={styles.accountName}>Hello, user!</Text>
            <Text style={styles.accounSub}>Join to edit the document</Text>
          </View>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={1}
            placeholderTextColor="#fff"
            style={styles.formcontrol}
            onChangeText={setUsername}
            value={username}
            placeholder=""
            name="username"
          />
          <Pressable
            android_ripple={
              RippleConfig = {
                color: "#312e3f",
                borderless: true,
                foreground: false
              }
            }
            style={[styles.btn, styles.btnPrimary, styles.accountBtn]}
            onPress={() => logInUser()}
          >
            <Text style={styles.accountName}>JOIN</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function EditorSection() {
  return (
    <View style={styles.mainContent}>
      <View style={styles.documentHolder}>
        <View style={styles.currentUsers}>
          <Users />
        </View>
        <Document />
      </View>
      <View style={styles.historyHolder}>
        <History />
      </View>
    </View>
  );
}

function History() {
  console.log('history');
  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent
  });
  const activities = lastJsonMessage?.data.userActivity || [];
  return (
    <View>
      {activities.map((activity, index) => <Text key={`activity-${index}`}>{activity}</Text>)}
    </View>
  );
}

function Users() {
  const { lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isUserEvent
  });
  const users = Object.values(lastJsonMessage?.data.users || {});
  return users.map(user => (
    <View key={user.username}>
      <View id={user.username} key={user.username}>
        <Text>{user.username}</Text>
      </View>
    </View>
  ));
}

function Document() {
  const [message, setMessage] = useState("")
  const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    filter: isDocumentEvent
  });

  let html = lastJsonMessage?.data.editorContent || '';
useEffect(()=> {


  
    sendJsonMessage({
      type: 'contentchange',
      content: message
    });
  
},[message])
  return (
    //<Text>DOCUMENTS</Text>
    <TextInput
      autoFocus={true}
      multiline={true}
      numberOfLines={1}
      placeholderTextColor="#fff"
      style={styles.formcontrol}
      onChangeText={setMessage}
      value={message}
      placeholder=""
      name="message"
    />
  );
}


export default function Chat({
  showChat,
  setShowChat
}) {

  const [username, setUsername] = useState('');
  const { sendJsonMessage, readyState } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true
  });

  useEffect(() => {
    if (username && readyState === ReadyState.OPEN) {
      sendJsonMessage({
        username,
        type: 'userevent'
      });
    }
  }, [username, sendJsonMessage, readyState]);



  //   useWebSocket(WS_URL, {
  //     onOpen: () => {
  //       console.log('WebSocket connection established.');
  //     }
  //   });


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showChat}
      onRequestClose={() => {
        setShowChat(!showChat);
      }}>

      <View style={styles.modalView}>
        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
          CHAT
        </Text>
        <View>
          {username ? <EditorSection />
            : <LoginSection onLogin={setUsername} />}
        </View>
      </View>

      {/* <View style={styles.modalView}>
      <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
              CHAT
            </Text>
        <TextInput
          autoFocus={true}
          multiline={true}
          numberOfLines={6}
          placeholderTextColor="#fff"
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder=""
        />
        <View style={styles.horizontalView}>
          <Pressable
            android_ripple={
              RippleConfig = {
                color: "#312e3f",
                borderless: true,
                foreground: false
              }
            }
            style={styles.round}
            onPress={() => setSendMessage(true)}
          >
            <Icon title="message" style={{ color: 'white' }} size={34} />
          </Pressable>
          <Pressable
            android_ripple={
              RippleConfig = {
                color: "#312e3f",
                borderless: true,
                foreground: false
              }
            }
            style={styles.round}
            //onPress={() => postReminder()}
          >
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
              Save
            </Text>
          </Pressable>
          <Pressable
            android_ripple={
              RippleConfig = {
                color: "#312e3f",
                borderless: true,
                foreground: false
              }
            }
            style={styles.round}
            // onPress={() => {
            //   resetState()
            // }}
          >
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
              Cancel
            </Text>
          </Pressable>
        </View>
        <View style={styles.horizontalView}>
          <Pressable
            android_ripple={
              RippleConfig = {
                color: "#312e3f",
                borderless: true,
                foreground: false
              }
            }
            style={styles.deleteBtn}
            //onPress={handleDeleteReminder}
          >
            <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
              Delete
            </Text>
          </Pressable>
        </View>
      </View> */}

    </Modal>
  );
};

const styles = StyleSheet.create({

  horizontalView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: "space-evenly",
    alignItems: 'center',
    flex: 1
  },
  modalView: {
    width: '100%',
    flex: 1,

    backgroundColor: '#15131d',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  mainText: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    color: '#fff'
  },
  input: {
    width: '100%',
    fontSize: 19,
    fontFamily: 'Rubik-Light',
    flex: 4,
    color: '#fff',
    backgroundColor: '#312e3f',
    borderRadius: 10,
    margin: 12,
    marginVertical: 0,
    textAlignVertical: 'top',
    padding: 10
  },
  addTime: {
    width: '100%',
    color: '#fff',
    backgroundColor: '#312e3f',
    borderRadius: 10,
    margin: 5,
    padding: 10
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8789f7',
    borderRadius: 35,
    width: 100,
    height: 70,
    margin: 20,
    elevation: 5,
  },
  deleteBtn: {
    backgroundColor: 'red',
    width: '50%',
    borderRadius: 215,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },
  messageModal: {
    backgroundColor: 'red',
    flex: .35,
    margin: 20,
    borderRadius: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'space-evenly',
    padding: 10,
    alignItems: 'center',
  }
});