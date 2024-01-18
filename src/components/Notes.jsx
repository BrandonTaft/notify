import { useState } from "react";
import { Pressable, View, Text, StyleSheet, Modal, TextInput } from "react-native";
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

function Notes () {
    const [showNotes, setShowNotes] = useState(false);
    const [note, onChangeNote] = useState("");
    return (
        <>
        <Pressable
         android_ripple={
            RippleConfig = {
                color: '#121212',
                foreground: true,
                borderLess: true
            }
        }
                onPress={() => setShowNotes(!showNotes)}
                style={styles.menuBtn}
            >
                <MaterialCommunityIcons name="timer" size={30} color="#b804d1de" />
                <Text style={styles.menuBtnText}>Notes</Text>
                <FontAwesome5 name="chevron-circle-right" size={30} color="#fff" style={{ marginLeft: 'auto', marginTop: 5 }} />

            </Pressable>
            <Modal
                animationType="slide"
                transparent={true}
                visible={showNotes}
                onRequestClose={() => {
                    
                }}>
                <View style={styles.timeIsUp}>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={6}
                        placeholderTextColor="#fff"
                        style={styles.input}
                        onChangeText={onChangeNote}
                        value={note}
                        placeholder="memo"
                    />
                </View>
            </Modal>
        </>
    )
}

export default Notes

const styles = StyleSheet.create({
    menuBtn: {
        backgroundColor: '#121212',
        borderRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10
    },
    menuBtnText: {
        fontFamily: 'Rubik-Medium',
        color: '#b804d1de',
        fontSize: 24,
        margin: 16,
        marginBottom: 8
    },
    input: {
        fontSize: 19,
        width: '100%',
        color: '#fff',
        backgroundColor: '#121212',
        borderRadius: 10,
        margin: 5
      },
})