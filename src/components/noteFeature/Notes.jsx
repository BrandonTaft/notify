import { useState } from "react";
import { Pressable, View, StyleSheet, ScrollView } from "react-native";
import { Portal, Button, Modal, Text, useTheme, IconButton, FAB } from 'react-native-paper';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import NoteItems from "./NoteItems";
import CreateNoteModal from "./CreateNoteModal";
//import { styles } from '../utils/styles';

export default function Notes() {
    const theme = useTheme();
    const user = useSelector(state => state.user)
    const [showNotes, setShowNotes] = useState(false);
    const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
    const showModal = () => setShowNotes(true);
    const hideModal = () => setShowNotes(false);
    const containerStyle = { backgroundColor: theme.colors.background, flex: 1 };
    console.log("NOTESSSS PAGE", user.notes)
    return (

        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Portal>
                <Modal visible={showNotes} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text variant="titleLarge">Notes</Text>
                    <IconButton
                        mode='contained'
                        icon="close"
                        size={20}
                        onPress={hideModal}
                    />
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <NoteItems list={user.notes} />
                    </ScrollView>
                    <CreateNoteModal />
                </Modal>
            </Portal>
            <Button icon={'pencil'} onPress={showModal} uppercase={false} mode="elevated">
                Notes
            </Button>
        </View>

        //     <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
        //     {/* <CreateNote /> */}
        //     <Button icon={'pencil'} onPress={() => setShowNotes(!showNotes)} uppercase={false} mode="elevated">
        //      Notes
        //     </Button>
        //         {/* <Pressable
        //             android_ripple={
        //                 RippleConfig = {
        //                     color: "#8789f7",
        //                     borderless: false,
        //                     foreground: false
        //                 }
        //             }
        //             style={[styles.menuBtn, showNotes && styles.active]}
        //             onPress={() => {
        //                 setShowNotes(!showNotes)
        //             }}
        //         >
        //             <MaterialIcons
        //                 name="event-note"
        //                 size={28}
        //                 color="#8789f7"
        //             />
        //             <Text style={styles.menuBtnText}>
        //                 Notes
        //             </Text>
        //             {showNotes ?
        //                 <FontAwesome5
        //                     name="chevron-circle-down"
        //                     size={30} color="#fff"
        //                     style={{
        //                         marginLeft: 'auto',
        //                         marginTop: "auto",
        //                         marginBottom: 'auto'
        //                     }}
        //                 />
        //                 :
        //                 <FontAwesome5
        //                     name="chevron-circle-right"
        //                     size={30} color="#fff"
        //                     style={{
        //                         marginLeft: 'auto',
        //                         marginTop: "auto",
        //                         marginBottom: 'auto'
        //                     }}
        //                 />
        //             }
        //         </Pressable> */}
        //         {showNotes &&
        //             <>
        //                  <ScrollView keyboardShouldPersistTaps="handled">
        //                     <NoteItems list={notes} />
        //                 </ScrollView>
        //             </>
        //         }

        //     </View>
    )
}

const styles = StyleSheet.create({


    topHorizontal: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#15131d',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        marginHorizontal: 4,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "35%",
        backgroundColor: "#8789f7",
        padding: 6,
        borderRadius: 50,
        elevation: 3
    },
    item: {
        backgroundColor: '#312e3f',
        flexDirection: 'row',
        marginHorizontal: 4,
        marginBottom: 5,
        paddingVertical: 3,
        overflow: 'hidden',
        paddingRight: '15%'
    },
    checkBox: {
        backgroundColor: '#312e3f',
        padding: 0,
        marginRight: 5,
        marginLeft: 10
    },
    itemText: {
        // fontFamily: "Rubik-Regular",
        color: 'white',
        fontSize: 18,
        marginRight: 15
    },
    time: {
        // fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 16
    },
    notes: {
        flex: 1,
        backgroundColor: '#121212'
    },
    title: {
        // fontFamily: 'Rubik-Bold',
        color: '#8789f7',
        fontSize: 40,
        textAlign: "center",
    },
    input: {
        fontSize: 19,
        // fontFamily: 'Rubik-Light',
        flex: 4,
        color: '#fff',
        backgroundColor: '#312e3f',
        borderRadius: 10,
        margin: 12,
        marginVertical: 0,
        textAlignVertical: 'top',
        padding: 10
    },
    inputPanel: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderRadius: 16,
        marginHorizontal: 15,
        marginVertical: 20,
        paddingVertical: 10,
        backgroundColor: '#312e3f',
    },
    editBtn: {
        backgroundColor: '#8789f7',
        flexDirection: 'row',
        width: '35%',
        justifyContent: 'center',
        borderRadius: 50,
        paddingVertical: 6,
        elevation: 5
    },
    editBtnText: {
        // // fontFamily: 'Rubik-Medium',
        color: '#fff',
        fontSize: 18
    },
    round: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8789f7',
        borderRadius: 50,
        width: 70,
        height: 70,
        elevation: 5,
    },
    x: {
        fontSize: 32,
    },
    btnText: {
        fontSize: 18,
        color: "#fff",
        // // fontFamily: 'Rubik-Medium',
    }
})
