import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { IconButton, useTheme, Button, Text, TextInput, Modal, Portal } from 'react-native-paper';
import { styles } from '../../utils/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createReminder } from '../../redux/reminderSlice';
import { addReminder } from '../../utils/api';


export default function CreateReminderComponent({
  showCreateReminderComponent,
  setShowCreateReminderComponent,
  handleSave,
  itemToEdit
}) {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);
  const [token, setToken] = useState();
  const theme = useTheme()

  useEffect(() => {
    const getToken = async () => {
      const pushToken = await AsyncStorage.getItem('token')
      setToken(pushToken)
    }
    getToken()
  }, [])

  useEffect(()=> {
    if(itemToEdit) {
    setTitle(itemToEdit.title || "")
    setSelectedDate(itemToEdit.selectedDate || null)
    }
  },[showCreateReminderComponent]);

  const onSubmit = () => {
    dispatch(createReminder(title, selectedDate, token))
    addReminder({title, selectedDate, token})
    setTitle('');
      setSelectedDate("");
      setShowCreateReminderComponent(false);
  }

  const onCalendarDismiss = useCallback(() => {
    setIsDateTimePickerVisible(false);
  }, [setIsDateTimePickerVisible]);

  const onCalendarConfirm = useCallback((params) => {
    setIsDateTimePickerVisible(false);
    setSelectedDay(params.date);
    setIsTimePickerVisible(true);
  }, [setIsDateTimePickerVisible, setSelectedDate]);

  const onTimePickerDismiss = useCallback(() => {
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible]);

  const onTimePickerConfirm = useCallback(({ hours, minutes }) => {
    const x = new Date(selectedDay).setHours(hours, minutes);
    setSelectedDate(JSON.stringify(x));
    setIsTimePickerVisible(false);
  }, [setIsTimePickerVisible, selectedDay, setSelectedDate]);

  const onModalDismiss = useCallback(() => {
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
          <Button icon={'content-save-check-outline'} uppercase={false} mode="elevated" onPress={()=> setIsDateTimePickerVisible(true)}>
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

            <Button icon={'content-save-check-outline'} onPress={() => onSubmit(title,selectedDate,token)} uppercase={false} mode="elevated">
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
            date={selectedDay}
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