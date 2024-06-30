import { useState } from 'react';
import { 
    Surface, 
    useTheme, 
    Button, 
    Text, 
    TextInput, 
    Modal, 
    Portal,
    RadioButton 
} from 'react-native-paper';
import { createNewOrg } from '../../utils/api';
import Alert from '../Alert';

export default function CreateOrgModal({setRefresh, refresh}) {
  const [showModal, setShowModal] = useState(false);
  const [hidePassWord, setHidePassWord] = useState(true);
  const [hidePassWordCopy, setHidePassWordCopy] = useState(true);
  const [passwordCopy, setPasswordCopy] = useState("");
  const [newOrg, setNewOrg] = useState({
    name: '',
    password: '',
    isPrivate: false
  });
  const [message, setMessage] = useState('');
  const theme = useTheme();

  const registerNewOrg = () => {
    if (!newOrg.name.trim()) {
      setMessage("You must enter a name")
    } else if (newOrg.isPrivate && !newOrg.password.trim()) {
            setMessage("You must enter a password")
    } else if (newOrg.isPrivate && (newOrg.password !== passwordCopy)) {
            setMessage("Passwords do not match")
    }
    else {
      createNewOrg(newOrg).then(result => {
        if (result.success) {
          setRefresh(!refresh)
          setShowModal(false)
        } else {
          setMessage(result.message)
        }
      })
    }
  };

  return (
    <>
      <Button
        mode= 'outlined'
        uppercase
        theme={theme.buttonRoundness}
        elevation={5}
        style={{ width: '100%', margin: 5 }}
        onPress={() => setShowModal(true)}
      >
        Create New Organization
      </Button>
      <Portal>
        <Modal
          visible={showModal}
          style={{ padding: 20 }}
          onDismiss={() => {
            setShowModal(false);
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
              variant="titleLarge"
              style={{ color: theme.colors.primary }}
            >
              Create New Organization
            </Text>
            <TextInput
              mode="outlined"
              autoCorrect={false}
              label='Organization Name'
              theme={theme.roundness}
              style={{ width: '100%', margin: 5 }}
              onChangeText={(value) => {
                setNewOrg({ ...newOrg, name: value.trim() })
              }}
            />
            <RadioButton.Item 
                label="Private"
                 value={newOrg.isPrivate} 
                 status={newOrg.isPrivate ? 'checked' : 'unchecked'} 
                 onPress={() => setNewOrg({...newOrg, isPrivate: !newOrg.isPrivate})}
                 />
            <TextInput
            disabled={!newOrg.isPrivate}
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
             disabled={!newOrg.isPrivate}
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
                setNewOrg({ ...newOrg, password: value.trim() })
              }}
              right={
                <TextInput.Icon
                  icon="eye"
                  iconColor={theme.colors.primary}
                  onPress={() => setHidePassWordCopy(!hidePassWordCopy)}
                />
              }
            />         
            <Button
              onPress={() => registerNewOrg(newOrg)}
              style={[{ backgroundColor: theme.colors.primary, margin: 15, width: '50%' }]}
              theme={theme.buttonRoundness}
              textColor={theme.colors.onPrimary}
            >
              DONE
            </Button>
            <Button
              onPress={() => setShowModal(false)}
              style={[{ backgroundColor: theme.colors.primary, margin: 15, width: '50%' }]}
              theme={theme.buttonRoundness}
              textColor={theme.colors.onPrimary}
            >
              CANCEL
            </Button>
            <Alert message={message} setMessage={setMessage} />
          </Surface>
        </Modal>
      </Portal>
    </>
  )
};