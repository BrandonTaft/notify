import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createReminder } from '../../redux/reminderSlice';
import { View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { IconButton, useTheme, Button, Text, TextInput, Modal, Portal } from 'react-native-paper';
import { styles } from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateReminder() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [token, setToken] = useState();

  const [showCreateReminderModal, setShowCreateReminderModal] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    const getToken = async () => {
      const pushToken = await AsyncStorage.getItem('token')
      setToken(pushToken)
    }
    getToken()
  }, [])

  const onSaveReminderPress = () => {
    if (title) {
      dispatch(createReminder(title, selectedDate, token));
      setTitle('');
      setSelectedDate("");
      setShowCreateReminderModal(false);
    }
  };

  const onCalendarDismiss = useCallback(() => {
    setIsDatePickerVisible(false);
  }, [setIsDatePickerVisible]);

  const onCalendarConfirm = useCallback((params) => {
    setIsDatePickerVisible(false);
    setSelectedDay(params.date);
    setIsTimePickerVisible(true);
  }, [setIsDatePickerVisible, setSelectedDate]);

  const onTimePickerDismiss = useCallback(() => {
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible]);

  const onTimePickerConfirm = useCallback(({ hours, minutes }) => {
    const x = new Date(selectedDay).setHours(hours, minutes);
    setSelectedDate(JSON.stringify(x));
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible, selectedDay, setSelectedDate]);

  const onModalDismiss = useCallback(() => {
    setShowCreateReminderModal(false)
  }, [setIsDatePickerVisible]);

  return (
    <>
      <IconButton
        icon="reminder"
        iconColor={theme.colors.onPrimaryContainer}
        size={40}
        onPress={() => setShowCreateReminderModal(true)}
      />
      <Portal>
        <Modal
          visible={showCreateReminderModal}
          style={{ padding: 20 }}
          contentContainerStyle={{ backgroundColor: 'red', padding: 20 }}
          onDismiss={() => {
            setShowCreateReminderModal(false);
          }}>

          <Text>Add a New Reminder</Text>
          <TextInput
            multiline={true}

            placeholderTextColor="#fff"

            onChangeText={setTitle}
            value={title}
            placeholder=""
          />
          <Button icon={'content-save-check-outline'} uppercase={false} mode="elevated" onPress={()=> setIsDatePickerVisible(true)}>
            <Text style={styles.mainText}>
              {
                selectedDate
                  ?
                  new Date(JSON.parse(selectedDate)).toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })
                  :
                  'Add Time'
              }
            </Text>
          </Button>
          <View>

            <Button icon={'content-save-check-outline'} onPress={() => onSaveReminderPress()} uppercase={false} mode="elevated">
              Save
            </Button>

            <Button icon={'content-save-check-outline'} onPress={() => onModalDismiss()} uppercase={false} mode="elevated">
              <Text variant="labelLarge">Cancel</Text>
            </Button>
          </View>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={isDatePickerVisible}
            onDismiss={onCalendarDismiss}
            date={selectedDay}
            onConfirm={onCalendarConfirm}
          />
          <TimePickerModal
            visible={isTimePickerVisible}
            onDismiss={() => onTimePickerDismiss()}
            onConfirm={(props) => onTimePickerConfirm(props)}
            hours={12}
            minutes={14}
          />
          {/* </View> */}
        </Modal>
      </Portal>
    </>
  )
}