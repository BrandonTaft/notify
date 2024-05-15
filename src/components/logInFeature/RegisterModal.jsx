import { useState, useEffect } from 'react';
import { Surface, useTheme, Button, Text, TextInput, Modal, Portal } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { registerUser, fetchOrgs } from '../../utils/api';
import Alert from '../Alert';
import CreateOrgModal from './CreateOrgModal';
import usePushNotification from '../hooks/usePushNotification';
import { Keyboard } from 'react-native';

export default function RegisterModal() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [hidePassWordCopy, setHidePassWordCopy] = useState(true);
  const [hidePassWord, setHidePassWord] = useState(true);
  const [passwordCopy, setPasswordCopy] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [orgList, setOrgList] = useState([]);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(null);
  const [newUser, setNewUser] = useState({
    userName: '',
    password: '',
    organization: '',
    expoPushToken: ''
  });
  const { expoPushToken } = usePushNotification();
  const theme = useTheme();

  useEffect(() => {
    fetchOrgs().then((result) => {
      setOrgList(result.orgs)
    })
  }, [refresh]);

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
      registerUser({...newUser, expoPushToken: expoPushToken}).then(result => {
        if (result.success) {
          setShowRegisterModal(false)
        } else {
          setMessage(result.message)
        }
      })
    }
  };

  const closeModal = () => {
    setShowRegisterModal(false);
    setValue("")
    setNewUser({
      userName: '',
      password: '',
      organization: '',
      expoPushToken: ''
    })
  };

  const expandDropDown = (isOpen) => {
    if (isOpen) { Keyboard.dismiss() }
    setExpanded(isOpen)
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
          onDismiss={() => closeModal()}>
          <Surface
            elevation={3}
            style={{
              justifyContent: 'center',
              borderRadius: 20,
              paddingVertical: 80,
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
              onFocus={() => setExpanded(false)}
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
              onFocus={() => setExpanded(false)}
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
              blurOnSubmit={true}
              label='Re-enter Password'
              theme={theme.roundness}
              style={{ width: '100%', margin: 5 }}
              textContentType="password"
              secureTextEntry={hidePassWordCopy ? true : false}
              onFocus={() => setExpanded(false)}
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
            <DropDownPicker
              schema={{
                label: 'name',
                value: 'name'
              }}
              itemKey="_id"
              placeholder='Select an organization'
              style={[{
                marginTop: 10,
                marginBottom: 5,
                backgroundColor: theme.colors.background,

                borderRadius: 16
              },
              expanded ? { borderColor: theme.colors.primary, borderWidth: 2 } : { borderColor: theme.colors.outline },
              ]}
              textStyle={{
                fontSize: 17,
                color: theme.colors.secondary
              }}
              itemProps={{ style: { padding: 5, backgroundColor: theme.colors.background } }}
              dropDownContainerStyle={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.primary,
                borderWidth: 2,
                paddingVertical: 5,
                paddingHorizontal: 8,
              }}
              searchable={true}
              open={expanded}
              value={value}
              items={orgList}
              itemSeparator={true}
              setOpen={(isOpen) => expandDropDown(isOpen)}
              setValue={setValue}
              onSelectItem={(item) => {
                setNewUser({ ...newUser, organization: item.name })
              }}
            />
            <Text>
              OR
            </Text>
            <CreateOrgModal setRefresh={setRefresh} refresh={refresh} />
            <Button
              mode='elevated'
              elevation={5}
              onPress={() => registerNewUser(newUser)}
              style={[{ backgroundColor: theme.colors.primary, margin: 15, width: '50%' }]}
              theme={theme.buttonRoundness}
              textColor={theme.colors.onPrimary}
              labelStyle={{fontWeight:'bold', fontSize:17}}
            >
              Register
            </Button>

            <Alert message={message} setMessage={setMessage} />
          </Surface>
        </Modal>
      </Portal>
    </>
  )
};