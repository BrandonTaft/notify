import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postNoteToDb } from '../../redux/userSlice';
import { Text, View, Pressable } from 'react-native';
import { Button, useTheme, Modal, FAB, TextInput, } from 'react-native-paper';
import { styles } from '../../utils/styles';

export default function CreateNoteModal() {
  const dispatch = useDispatch()
  const [content, setContent] = useState("");
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false)
  const theme = useTheme()


  const saveNote = () => {
    if (content) {
      console.log("IRAN")
      dispatch(postNoteToDb(content))
      setContent('')
      setShowCreateNoteModal(false)
    }
  }

  return (
    <>
      <FAB
        icon="note-edit"
        style={{
          position: 'absolute',
          margin: 8,
          right: 0,
          bottom: 0,
        }}
        onPress={() => setShowCreateNoteModal(true)}
      />
      <Modal
        visible={showCreateNoteModal}
        contentContainerStyle={{ flex: 1 }}
        onSubmit={() => {
          setShowCreateNoteModal(false);
        }}>
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
          <TextInput
            editable
            multiline={true}
            numberOfLines={6}
            placeholderTextColor="#fff"
            style={{}}
            onChangeText={setContent}
            value={content}
            placeholder=""
          />
          <View style={styles.horizontalView}>
            {/* <Pressable
              android_ripple={
                RippleConfig = {
                  color: "#312e3f",
                  borderless: true,
                  foreground: false
                }
              }
              style={styles.round}
              onPress={() => saveNote()}
            >
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                Save
              </Text>
            </Pressable> */}
            <Button  mode="contained" onPress={() => saveNote()}>
              Save
            </Button>
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
                setShowCreateNoteModal(false)
              }}
            >
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  )
}