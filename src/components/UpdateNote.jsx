import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNote, deleteNote } from '../redux/noteSlice';
import { Text, View, TextInput, Pressable, Modal } from 'react-native';
import { IconButton, MD3Colors } from 'react-native-paper';
import { styles } from '../utils/styles';





export default function UpdateNote({showUpdateNoteModal, setShowUpdateNoteModal, itemToEdit}) {
  const dispatch = useDispatch()
  const [content, setContent] = useState();
 

  useEffect(()=> {
    if(itemToEdit) {
    setContent(itemToEdit.content || "")
    }
  },[showUpdateNoteModal])

  const onSaveNotePress = () => {
      dispatch(
        updateNote({
          id: itemToEdit.id,
          content
        })
      )
      setContent('')
      setShowUpdateNoteModal (false)
  }

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showUpdateNoteModal}
        onRequestClose={() => {
          setShowUpdateNoteModal(false);
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
              onPress={() => {
                dispatch(deleteNote(itemToEdit.id))
                setShowUpdateNoteModal(false)
            }}
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
                setShowUpdateNoteModal(false)
              }}
            >
              <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
   
  )
}