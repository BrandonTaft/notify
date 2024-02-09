import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Modal, Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import { addReminders, deleteMany } from '../api';
import * as SMS from 'expo-sms';


export default function Create({
  onSucess,
  expoPushToken,
  modalVisible,
  setModalVisible,
  editable,
  setEditable
}) {
  const [name, onChangeName] = useState("");
  const [action, setAction] = useState('POST');
  const [selectedDate, setSelectedDate] = useState();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);
  const [number, onChangeNumber] = useState("");

  useEffect(() => {
    if (editable.name) {
      onChangeName(editable.name)
      setAction('PUT')
    }
  }, [editable]);

  const resetState = () => {
    
    setSelectedDate()
    onChangeName("")
    setAction('POST')
    setEditable({})
    setModalVisible(!modalVisible)
  };

  const postReminder = () => {
    if (name) {
      addReminders(name, action, selectedDate, editable._id, expoPushToken)
        .then(result => {
          if (result.success) {
            resetState()
          }
        })
    }
  };

  const handleDeleteReminder = () => {
    if (editable._id) {
      deleteMany(editable._id)
        .then(result => {
          if (result.success) {
            resetState()
          }
        })
    }
  };

  const sendText = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      const { result } = await SMS.sendSMSAsync(
        [number],
        name
      );
    } else {
      console.log("there's no SMS available on this device")
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={sendMessage}
        onRequestClose={() => {
          sendMessage(false);
        }}>
        <View style={styles.messageModal}>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={2}
            placeholderTextColor="#fff"
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="number"
          />
          <Pressable
            android_ripple={
              RippleConfig = {
                color: "#8789f7",
                borderless: false,
                foreground: false
              }
            }
            style={styles.addTime}
            onPress={() => sendText()}
          >
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
              Send
            </Text>
          </Pressable>
          <Pressable
            android_ripple={
              RippleConfig = {
                color: "#8789f7",
                borderless: false,
                foreground: false
              }
            }
            style={styles.addTime}
            onPress={() => setSendMessage(false)}
          >
            <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </Modal>
    
        <View style={styles.modalView}>
          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={6}
            placeholderTextColor="#fff"
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder=""
          />
          <Pressable
            android_ripple={
              RippleConfig = {
                color: "#8789f7",
                borderless: false,
                foreground: false
              }
            }
            style={styles.addTime}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={styles.mainText}>
              {
                (selectedDate || editable.notification)
                  ?
                  new Date((selectedDate || editable.notification)).toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  :
                  'Add Time'
              }
            </Text>
          </Pressable>
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
              <Icon name="message1" style={{ color: 'white' }} size={34} />
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
              onPress={() => postReminder()}
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
              onPress={() => {
                resetState()
              }}
            >
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </Pressable>
          </View>
          <DateTimePickerModal
            date={new Date()}
            isVisible={datePickerVisible}
            mode="datetime"
            onConfirm={(selectedDate) => {
              setDatePickerVisible(false)
              setSelectedDate(selectedDate)
            }}
            onCancel={() => {
              setDatePickerVisible(false)
            }}
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
              style={styles.deleteBtn}
              onPress={handleDeleteReminder}
            >
              <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                Delete
              </Text>
            </Pressable>
          </View>
        </View>
 
    </Modal>
  );
};

const styles = StyleSheet.create({
 
  horizontalView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent:"space-evenly",
    alignItems: 'center',
    flex:1
  },
  modalView: {
    width: '100%',
    flex:1,
    
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
    width:'100%',
    fontSize: 19,
    fontFamily: 'Rubik-Light',
    flex: 4,
    color: '#fff',
    backgroundColor: '#312e3f',
    borderRadius: 10,
    margin: 12,
    marginVertical: 0,
    textAlignVertical: 'top',
    padding:10
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
        margin:20,
        elevation: 5,
  },
  deleteBtn: {
    backgroundColor: 'red',
    width: '50%',
    borderRadius: 215,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    elevation:5
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