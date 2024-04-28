import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { Surface, IconButton, useTheme, Button, Text, TextInput, Modal, Dialog, Portal } from 'react-native-paper';
import { styles } from '../utils/styles';
import { registerUser } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterModal({
  showRegisterModal,
  setShowRegisterModal,
}) {
  const dispatch = useDispatch()
  const [newUser, setNewUser] = useState({
    userName: '',
    password: '',
    organization: ''
  });
  const [message, setMessage] = useState('');
  const hideDialog = () => setMessage(false);
  const theme = useTheme()

  const registerNewUser = () => {
    if (!newUser.userName.trim()) {
      setMessage("You must enter a user name")
  } else if (!newUser.password.trim()) {
    setMessage("You must enter a password")
  }else if (!newUser.organization.trim()) {
    setMessage("You must enter an organization")
  } else {
    registerUser(newUser).then(result => {
      if (result.success) {
        setShowRegisterModal(false)
      } else {
        setMessage(result.message)
      }
    })
  }
  }
  return (
    <Surface elevation={3} style={{ backgroundColor: theme.colors.background, borderRadius: 20, padding: 10, alignItems: 'center', opacity:.8 }}>
      <Text variant="headlineSmall">Register</Text>
      <View style={{width:"90%", paddingVertical:20}}>
        <TextInput
          mode="outlined"
          autoCorrect={false}
          label='User Name'
          theme={theme.roundness}
          style={{ width: '100%', margin:5 }}
          onChangeText={(value) => {
            setNewUser({ ...newUser, userName: value })
          }}
        />
        <TextInput
         mode="outlined"
         autoCorrect={false}
         label='Password'
         theme={theme.roundness}
         style={{ width: '100%', margin:5 }}
          onChangeText={(value) => {
            setNewUser({ ...newUser, password: value })
          }}
        />
        <TextInput
         mode="outlined"
         autoCorrect={false}
         label='Organization'
         theme={theme.roundness}
         style={{ width: '100%', margin:5 }}
          onChangeText={(value) => {
            setNewUser({ ...newUser, organization: value })
          }}
        />
      </View>
      <Button
        onPress={() => registerNewUser(newUser)}
        style={[{ backgroundColor: theme.colors.primary, marginBottom:15, paddingHorizontal:15 }]}
        theme={theme.buttonRoundness}
                        textColor={theme.colors.onPrimary}
      >
        Get Started
      </Button>

      <Portal>
          <Dialog visible={message} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </Surface>


  )
}