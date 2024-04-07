import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createReminder } from '../../redux/reminderSlice';
import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { IconButton, useTheme } from 'react-native-paper';
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

  return (
    <>
      <IconButton
        icon="reminder"
        iconColor={theme.colors.onPrimaryContainer}
        size={40}
        onPress={() => setShowCreateReminderModal(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCreateReminderModal}
        onRequestClose={() => {
          setShowCreateReminderModal(false);
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
            onPress={() => setIsDatePickerVisible(true)}
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
              onPress={() => console.log("PRESSED")}
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
                setShowCreateReminderModal(false)
              }}
            >
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </Pressable>
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
        </View>
      </Modal>
    </>
  )
}