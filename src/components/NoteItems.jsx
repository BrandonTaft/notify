import { StyleSheet, Text, View, Pressable } from 'react-native';
import { List, MD3Colors, Icon } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { ElapsedTime } from './ElapsedTime';
import { deleteNote } from '../redux/noteSlice';
import { useState, useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import UpdateNote from './UpdateNote';
import { ReactionButtons } from './buttons/ReactionButtons';

function NoteItems({ list }) {
    const [showUpdateNoteModal, setShowUpdateNoteModal] = useState(false);
    const itemToEditRef = useRef({});
    const listItemRef = useRef([]);
    const prevOpenedRow = useRef();
    const dispatch = useDispatch()
 console.log(list)
    const renderRightActions = (item) => {
        return (
            <View style={{ flexDirection: 'row' }} >
                <Pressable
                    android_ripple={
                        RippleConfig = {
                            color: "#15131d",
                            borderless: false,
                            foreground: true
                        }
                    }
                    style={styles.listItemRightInsideButton}
                    onPress={() => {
                        itemToEditRef.current = item
                        setShowUpdateNoteModal(true)
                        prevOpenedRow.current.close();
                    }}>
                    <Icon
                        source="note-edit"
                        color={MD3Colors.primary0}
                        size={30}
                    />
                </Pressable>
                
            </View>
        );
    };

    const renderLeftActions = (item) => {
        return (
            <Pressable
                android_ripple={
                    RippleConfig = {
                        color: "#15131d",
                        borderless: false,
                        foreground: true
                    }
                }
                style={styles.listItemLeftButton}
                onPress={() => {
                    dispatch(deleteNote(item.id))
                }}>
                <Icon
                    source="delete"
                    color={MD3Colors.primary100}
                    size={30}
                />
            </Pressable>
        );
    };

    const closeRow = (index) => {
        if (prevOpenedRow.current && prevOpenedRow.current !== listItemRef.current[index]) {
            prevOpenedRow.current.close();
        }
        prevOpenedRow.current = listItemRef.current[index];
    }

    return (
                <>
                    <UpdateNote
                        showUpdateNoteModal={showUpdateNoteModal}
                        setShowUpdateNoteModal={setShowUpdateNoteModal}
                        itemToEdit={itemToEditRef.current}
                    />
                    {list.filter((item) => item.isNote && !item.isCompleted && !item.isDeleted).map((item, index) => {
                        return (
                            <Swipeable
                                renderLeftActions={() => renderLeftActions(item)}
                                renderRightActions={() => renderRightActions(item)}
                                onSwipeableWillOpen={() => closeRow(index)}
                                containerStyle={styles.swipeableContainerBack}
                                childrenContainerStyle={styles.swipeableContainerFront}
                                key={item.id}
                                ref={ref => listItemRef.current[index] = ref}
                            >
                                <List.Icon color={MD3Colors.tertiary70} icon="chevron-left" />
                                <View style={styles.listItemContents}>
                                    <Text style={styles.listItemTitle}>
                                        {item.content}
                                    </Text>
                                    <ElapsedTime timestamp={item.timeStamp} />
                                    <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                    <ReactionButtons note={item} />
                                    </View>
                                </View>
                                <List.Icon color={MD3Colors.tertiary70} icon="chevron-right" />
                            </Swipeable>
                        );
                    })}
                </>
    )
}

const styles = StyleSheet.create({
    swipeableContainerBack: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "black",
        borderRadius: 15,
        overflow: 'hidden',
        margin: 1
    },
    swipeableContainerFront: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "black",
        overflow: 'hidden'
    },
    listItemContents: {
        flexDirection: 'column',
        flex: 1,
        padding: 10
    },
    listItemTitle: {
        // fontFamily: "Rubik-Regular",
        color: '#f0edf3',
        fontSize: 18,
    },
    listItemTime: {
        // fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 15
    },
    listItemLeftButton: {
        backgroundColor: 'red',
        borderRadius: 15,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    listItemRightButton: {
        backgroundColor: 'grey',
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    listItemRightInsideButton: {
        backgroundColor: 'white',
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    empty: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        // fontFamily: "Rubik-Medium",
        color: '#8789f7',
        fontSize: 18,
        marginVertical: 44
    }
});

export default NoteItems