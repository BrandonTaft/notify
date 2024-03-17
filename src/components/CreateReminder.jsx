import React, { useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { createReminder } from '../redux/reminderSlice';
import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { styles } from '../utils/styles';

import Icon from 'react-native-vector-icons/AntDesign';

export default function CreateReminder({navigation}) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const [modalVisible, setModalVisible] = useState(true)
 const editable = {};

  const onSaveReminder = () => {
    if (title) {
      dispatch(
        createReminder({
          id: nanoid(),
          title,
          selectedDate,
        })
      )

      setTitle('')
      setModalVisible(false)
      navigation.navigate("HomeScreen");
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
        <View style={styles.modalView}>
      <Text>Add a New Reminder</Text>
      <TextInput
        multiline={true}
        numberOfLines={6}
        placeholderTextColor="#fff"
        style={styles.input}
        onChangeText={setTitle}
        value={title}
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
              (selectedDate || editable.selectedDate)
                ?
                new Date((selectedDate || editable.selectedDate)).toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
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
            onPress={() => handleDeleteReminder()}
          >
            <Icon title="delete" style={{ color: 'white' }} size={34} />
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
            onPress={() => onSaveReminder()}
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
              setModalVisible(false)
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
      </View>
    </Modal>
  )
}