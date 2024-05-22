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
  console.log("ITEMTOEDIT", itemToEdit)
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [selectedTime, setSelectedTime] = useState(null);
  const [dueDay, setDueDay] = useState(null);
  const [dueTime, setDueTime] = useState(null);
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
      setDueDay(itemToEdit.dueDay || null);
      setDueTime(itemToEdit.dueTime || null);
    }
  }, [showUpdateReminderComponent]);

  const clearState = () => {
    setDueDay(null)
    setSelectedTime(null)
    setTitle("")
  }

  const onSubmit = () => {
    dispatch(updateReminder({
      reminderId:itemToEdit.reminderId, 
      title, 
      dueDay,
    dueTime
  }))
    updateReminderApi({
      reminderId:itemToEdit.reminderId,
      title,
      dueTime,
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
    setDueDay(params.date.toString());
    setIsTimePickerVisible(true);
  }, [setIsDateTimePickerVisible, setDueTime]);

  const onTimePickerDismiss = useCallback(() => {
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible]);

  const onTimePickerConfirm = useCallback(({ hours, minutes }) => {
    const x = new Date(dueDay).setHours(hours, minutes);
    setDueTime({ hours, minutes });
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible, dueDay, setDueTime]);
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
        {dueTime
            ?
            <>
              <Text >
                {new Date(dueDay).toLocaleDateString([], {
                  weekday: 'short', month: 'numeric', day: 'numeric'
                })}
              </Text>
              <Text >
                &nbsp;&nbsp;{((dueTime.hours + 11) % 12 + 1)}:{dueTime.minutes.toString().padStart(2, '0')} {dueTime.hours >= 12 ? 'PM' : 'AM'}
              </Text>
            </>
            :
            <Text>Add Time</Text>
          }
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
          date={dueDay ? new Date(dueDay) : null}
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