import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";
import { View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { IconButton, useTheme, Button, Text, TextInput, Modal, Portal } from 'react-native-paper';
import { styles } from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateReminder } from '../../redux/reminderSlice';
import { updateReminderApi } from '../../utils/api';


export default function UpdateReminderComponent({
  showUpdateReminderComponent,
  setShowUpdateReminderComponent,
  handleSave,
  itemToEdit
}) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [dueDay, setDueDay] = useState(null);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState();
  const theme = useTheme()

  useEffect(() => {
    const getToken = async () => {
      const pushToken = await AsyncStorage.getItem('token')
      setExpoPushToken(pushToken)
    }
    getToken()
  }, [])

  useEffect(() => {
    if (itemToEdit) {
      setTitle(itemToEdit.title || "")
      setDueDay(JSON.stringify(itemToEdit.dueDay) || null)
    }
  }, [showUpdateReminderComponent]);

  const clearState = () => {
    setDueDay(null)
    setSelectedTime(null)
    setTitle("")
  }

  const onSubmit = () => {
    dispatch(updateReminder({reminderId:itemToEdit.reminderId, title, dueDay:JSON.stringify(dueDay)}))
    updateReminderApi({
      reminderId:itemToEdit.reminderId,
      title,
      dueDay
    })
    clearState()
    setShowUpdateReminderComponent(false);
  }

  const onCalendarDismiss = useCallback(() => {
    setIsDateTimePickerVisible(false);
  }, [setIsDateTimePickerVisible]);

  const onCalendarConfirm = useCallback((params) => {
    setIsDateTimePickerVisible(false);
    console.log("DAAAAAAAA", params.date)
    setDueDay(params.date);
    setIsTimePickerVisible(true);
  }, [setIsDateTimePickerVisible, setSelectedTime]);

  const onTimePickerDismiss = useCallback(() => {
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible]);

  const onTimePickerConfirm = useCallback(({ hours, minutes }) => {
    const x = new Date(dueDay).setHours(hours, minutes);
    setSelectedTime(JSON.stringify(x));
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible, dueDay, setSelectedTime]);

  const onModalDismiss = useCallback(() => {
    clearState()
    setShowUpdateReminderComponent(false)
  }, [setIsDateTimePickerVisible]);

  return (
    <Portal>
      <Modal
        visible={showUpdateReminderComponent}
        style={{ padding: 20 }}
        contentContainerStyle={{ backgroundColor: 'red', padding: 20 }}
        onDismiss={() => {
          setShowUpdateReminderComponent(false);
        }}>

        <Text>Add a New Reminder</Text>
        <TextInput
          multiline={true}

          placeholderTextColor="#fff"

          onChangeText={setTitle}
          value={title}
          placeholder=""
        />
        <Button icon={'content-save-check-outline'} uppercase={false} mode="elevated" onPress={() => setIsDateTimePickerVisible(true)}>
          <Text style={styles.mainText}>
            {
              dueDay
                ?
                new Date(JSON.parse(selectedTime)).toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                :
                'Add Time'
            }
          </Text>
        </Button>
        <View>

          <Button icon={'content-save-check-outline'} onPress={() => onSubmit()} uppercase={false} mode="elevated">
            Save
          </Button>

          <Button icon={'content-save-check-outline'} onPress={() => onModalDismiss()} uppercase={false} mode="elevated">
            <Text variant="labelLarge">Cancel</Text>
          </Button>
        </View>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={isDateTimePickerVisible}
          onDismiss={onCalendarDismiss}
          date={dueDay}
          onConfirm={onCalendarConfirm}
        />
        <TimePickerModal
          visible={isTimePickerVisible}
          onDismiss={() => onTimePickerDismiss()}
          onConfirm={(props) => onTimePickerConfirm(props)}

        />

      </Modal>
    </Portal>
  )
}