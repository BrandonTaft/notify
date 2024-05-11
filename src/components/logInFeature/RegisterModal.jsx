import { useState, useEffect } from 'react';
import { Surface, useTheme, Button, Text, TextInput, Modal, Portal, Divider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { registerUser, fetchOrgs } from '../../utils/api';
import Alert from '../Alert';
import CreateOrgModal from './CreateOrgModal';
import { Keyboard } from 'react-native';

export default function RegisterModal() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [hidePassWord, setHidePassWord] = useState(true);
  const [hidePassWordCopy, setHidePassWordCopy] = useState(true);
  const [passwordCopy, setPasswordCopy] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState(null);
  const [orgList, setOrgList] = useState([]);
  const [newUser, setNewUser] = useState({
    userName: '',
    password: '',
    organization: ''
  });
  const [message, setMessage] = useState('');
  const theme = useTheme();

  useEffect(() => {
    fetchOrgs().then((result) => {
      setOrgList(result.orgs)
    })
  }, []);
  
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

  const closeModal = () => {
    setShowRegisterModal(false);
    setValue("")
    setNewUser({userName: '',
    password: '',
    organization: ''})
  };

  const expandDropDown = (isOpen) => {
    if(isOpen) {
      Keyboard.dismiss()
    }
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
              itemProps={{style:{padding:5,alignItems:'center',justifyContent:'center',backgroundColor: theme.colors.background}}}
              dropDownContainerStyle={{
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.primary,
                 borderWidth: 2,
                 paddingVertical:5,
                 paddingHorizontal:20
              }}
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
            <CreateOrgModal />
            <Button
              mode='elevated'
              elevation={5}
              onPress={() => registerNewUser(newUser)}
              style={[{ backgroundColor: theme.colors.primary, margin: 15, width: '50%' }]}
              theme={theme.buttonRoundness}
              textColor={theme.colors.onPrimary}
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