import { useState } from 'react';
import { Surface, useTheme, Button, Text, TextInput, Modal, Portal } from 'react-native-paper';
import { registerUser } from '../../utils/api';
import Alert from '../Alert';
import CreateOrgModal from './CreateOrgModal';

export default function RegisterModal() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [hidePassWord, setHidePassWord] = useState(true);
  const [hidePassWordCopy, setHidePassWordCopy] = useState(true);
  const [passwordCopy, setPasswordCopy] = useState("");
  const [newUser, setNewUser] = useState({
    userName: '',
    password: '',
    organization: ''
  });
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const registerNewUser = () => {
    if (!newUser.userName.trim()) {
      setMessage("You must enter a user name")
    } else if (!newUser.password.trim()) {
      setMessage("You must enter a password")
    } else if (!newUser.organization.trim()) {
      setMessage("You must enter an organization")
    } else if (newUser.password !== passwordCopy) {
      setMessage("Passwords do not match")
    } else {
      registerUser(newUser).then(result => {
        if (result.success) {
          setShowRegisterModal(false)
        } else {
          setMessage(result.message)
        }
      })
    }
  };

  return (
    <>
      <Button
        mode='outlined'
        uppercase
        style={[{ width: '50%', borderRadius: 16 }]}
        onPress={() => setShowRegisterModal(true)}
      >
        Register
      </Button>
      <Portal>
        <Modal
          visible={showRegisterModal}
          style={{ padding: 20 }}
          onDismiss={() => {
            setShowRegisterModal(false);
          }}>
          <Surface
            elevation={3}
            style={{
              justifyContent: 'center',
              borderRadius: 20,
              paddingVertical: 50,
              paddingHorizontal: 20,
              alignItems: 'center'
            }}
          >
            <Text
              variant="headlineMedium"
              style={{ color: theme.colors.primary }}
            >
              Register
            </Text>
            <TextInput
              mode="outlined"
              autoCorrect={false}
              label='User Name'
              theme={theme.roundness}
              style={{ width: '100%', margin: 5 }}
              onChangeText={(value) => {
                setNewUser({ ...newUser, userName: value.trim() })
              }}
            />
            <TextInput
              mode="outlined"
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
              label='Create Password'
              theme={theme.roundness}
              style={{ width: '100%', margin: 5 }}
              textContentType="password"
              secureTextEntry={hidePassWord ? true : false}
              onChangeText={(value) => setPasswordCopy(value)}
              right={
                <TextInput.Icon
                  icon="eye"
                  iconColor={theme.colors.primary}
                  onPress={() => setHidePassWord(!hidePassWord)}
                />
              }
            />
            <TextInput
              mode="outlined"
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
              label='Re-enter Password'
              theme={theme.roundness}
              style={{ width: '100%', margin: 5 }}
              textContentType="password"
              secureTextEntry={hidePassWordCopy ? true : false}
              onChangeText={(value) => {
                setNewUser({ ...newUser, password: value.trim() })
              }}
              right={
                <TextInput.Icon
                  icon="eye"
                  iconColor={theme.colors.primary}
                  onPress={() => setHidePassWordCopy(!hidePassWordCopy)}
                />
              }
            />
            <TextInput
              mode="outlined"
              autoCorrect={false}
              label='Organization'
              theme={theme.roundness}
              style={{ width: '100%', margin: 5 }}
              onChangeText={(value) => {
                setNewUser({ ...newUser, organization: value.trim() })
              }}
            />
            <Button
              onPress={() => registerNewUser(newUser)}
              style={[{ backgroundColor: theme.colors.primary, margin: 15, width: '50%' }]}
              theme={theme.buttonRoundness}
              textColor={theme.colors.onPrimary}
            >
              Register
            </Button>
            <CreateOrgModal />
            <Alert message={message} setMessage={setMessage} />
          </Surface>
        </Modal>
      </Portal>
    </>
  )
};