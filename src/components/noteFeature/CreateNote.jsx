import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote } from '../../redux/noteSlice';
import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import { styles } from '../../utils/styles';

export default function CreateNote() {
  const dispatch = useDispatch()
  const [content, setContent] = useState("");
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false)
  const theme = useTheme()


  const onSaveNotePress = () => {
    if (content) {
      dispatch(createNote(content))
      setContent('')
      setShowCreateNoteModal(false)
    }
  }

  return (
    <>
      <IconButton
        icon="note-edit"
        iconColor={theme.colors.onPrimaryContainer}
        size={40}
        onPress={() => setShowCreateNoteModal(true)}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCreateNoteModal}
        onRequestClose={() => {
          setShowCreateNoteModal(false);
        }}>
        <View style={styles.modalView}>
          <Text>Add a New Note</Text>
          <TextInput
            multiline={true}
            numberOfLines={6}
            placeholderTextColor="#fff"
            style={styles.input}
            onChangeText={setContent}
            value={content}
            placeholder=""
          />
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
              onPress={() => onSaveNotePress()}
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