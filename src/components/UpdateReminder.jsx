import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {  updateReminder, deleteReminder } from '../redux/reminderSlice';
import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IconButton, MD3Colors } from 'react-native-paper';
import { styles } from '../utils/styles';

import AsyncStorage from '@react-native-async-storage/async-storage';



export default function UpdateReminder({showUpdateModal, setShowUpdateModal, itemToEdit}) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState();
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  useEffect(()=> {
    if(itemToEdit) {
    setTitle(itemToEdit.title || "")
    setSelectedDate(itemToEdit.selectedDate || null)
    }
  },[showUpdateModal])

  const onSaveReminderPress = () => {
      dispatch(
        updateReminder({
          id: itemToEdit.id,
          title,
          selectedDate
        })
      )
      setTitle('')
      setSelectedDate("")
      setShowUpdateModal (false)
  }

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showUpdateModal}
        onRequestClose={() => {
          setShowUpdateModal(false);
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
                selectedDate
                  ?
                  new Date(JSON.parse(selectedDate)).toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
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
              onPress={() => {
                dispatch(deleteReminder(itemToEdit.id))
                setShowUpdateModal(false)
            }}
            >
             
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
              onPress={() => onSaveReminderPress()}
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
                setShowUpdateModal(false)
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
              setSelectedDate(JSON.stringify(selectedDate))
            }}
            onCancel={() => {
              setDatePickerVisible(false)
            }}
          />
        </View>
      </Modal>
   
  )
}