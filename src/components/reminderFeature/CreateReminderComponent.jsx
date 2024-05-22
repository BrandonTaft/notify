import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from "@reduxjs/toolkit";
import { View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { IconButton, useTheme, Button, Text, TextInput, Modal, Portal } from 'react-native-paper';
import { styles } from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReminder } from '../../redux/reminderSlice';
import { addReminder } from '../../utils/api';


export default function CreateReminderComponent({
  showCreateReminderComponent,
  setShowCreateReminderComponent
}) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [dueTime, setDueTime] = useState(null);
  const [dueDay, setDueDay] = useState(null);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState();
  const theme = useTheme()
  const reminderId = nanoid()

  useEffect(() => {
    const getToken = async () => {
      const pushToken = await AsyncStorage.getItem('token')
      setExpoPushToken(pushToken)
    }
    getToken()
  }, [])

  const clearState = () => {
    setDueDay(null)
    setDueTime(null)
    setTitle("")
  }

  const onSubmit = () => {
    dispatch(createReminder(title, dueDay, dueTime, expoPushToken, reminderId))
    addReminder({
      reminderId,
      title,
      dueTime,
      dueDay,
      expoPushToken,
      isChecked: false,
      isCompleted: false,
      isDeleted: false
    })
    clearState()
    setShowCreateReminderComponent(false);
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
    const x = new Date('August 19, 1975 23:15:30');
    console.log("TIMEEEEEE",x.setHours(hours))
    setDueTime({ hours, minutes });
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible, dueDay, setDueTime]);

  const onModalDismiss = useCallback(() => {
    clearState()
    setShowCreateReminderComponent(false)
  }, [setIsDateTimePickerVisible]);

  return (
    <Portal>
      <Modal
        visible={showCreateReminderComponent}
        style={{ padding: 20 }}
        contentContainerStyle={{ backgroundColor: 'red', padding: 20 }}
        onDismiss={() => {
          setShowCreateReminderComponent(false);
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