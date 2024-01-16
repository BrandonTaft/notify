import { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Modal, Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { addReminders, deleteReminder } from '../api';


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
  const [messageVisible, setMessageVisible] = useState(false);



  useEffect(() => {
    if (editable.name) {
      onChangeName(editable.name)
      setAction('PUT')
    }
  }, [editable])


  const resetState = () => {
    onSucess()
    setSelectedDate()
    onChangeName("")
    setAction('POST')
    setEditable({})
    setModalVisible(!modalVisible)
  }



  const postReminder = () => {
    if (name) {
      addReminders(name, action, selectedDate, editable._id, expoPushToken)
      .then(result => {
        if (result.success) {
          resetState()
        }
      })
     
    }
  }

  const handleDeleteReminder = () => {
    if (editable._id) {
      deleteReminder(editable._id)
        .then(result => {
          if (result.success) {
            resetState()
          }
        })
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <TextInput
            autoFocus={true}
            multiline={true}
            numberOfLines={6}
            placeholderTextColor="#fff"
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="memo"
          />

          <Pressable android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    }
            style={styles.addTime}
            onPress={() => setDatePickerVisible(true)}
          >
            <Text style={{ color: 'white', fontSize: 19 }}>{(selectedDate || editable.notification) ? new Date((selectedDate || editable.notification)).toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Add Time'}</Text>
          </Pressable>

          <View style={styles.horizontalView}>
            <Pressable android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    } style={styles.round}>
              <IonIcon name="mic-outline" color='white' size={38}></IonIcon>
            </Pressable>
            <Pressable android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    } style={styles.round} onPress={() => setMessageVisible(true)}>
              <Icon name="message1" style={{ color: 'white' }} size={34} />
            </Pressable>
            <Pressable android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    } style={styles.round} onPress={postReminder}>
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Save</Text>
            </Pressable>
            <Pressable android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    }
            style={styles.round}
              onPress={() => {
                resetState()
              }}
            >
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>Cancel</Text>
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
            <Pressable android_ripple={
                        RippleConfig = {
                            color: '#121212',
                            foreground: true,
                            borderLess: true
                        }
                    } style={styles.deleteBtn} onPress={handleDeleteReminder}>
              <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#00030ae0',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 10
  },
  modalView: {
    width: '100%',
    margin: 20,
    backgroundColor: '#000',
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    fontSize: 19,
    width: '100%',
    color: '#fff',
    backgroundColor: '#121212',
    borderRadius: 10,
    margin: 5
  },
  addTime: {
    width: '100%',
    color: '#fff',
    backgroundColor: '#121212',
    borderRadius: 10,
    margin: 5,
    padding: 10
  },
  round: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b804d1de',
    borderRadius: 50,
    width: 80,
    height: 80,
    elevation: 2,
},
deleteBtn: {
  backgroundColor: 'red',
  width:'75%',
  borderRadius: 20,
  padding:6,
  justifyContent:'center',
  alignItems:'center',
}
});