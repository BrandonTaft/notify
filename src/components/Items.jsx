import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CheckBox, ListItem, Icon, Button } from '@rneui/themed';

function Items({
    list,
    deleteChecked,
    type,
    setEditable,
    modalVisible,
    setModalVisible,
    deleteReminder
}) {
console.log(list)
    return (
        <>
            {list.length > 0 ?
                <>
                    {/* {list.filter((item) => item.selectedDate && !item.isCompleted && !item.isDeleted).map((item) => { */}
                   { list.map((item) => {
                        return (
                            //             <Pressable
                            //                android_ripple={
                            //                 RippleConfig = {
                            //                     color: "#15131d",
                            //                     borderless: false,
                            //                     foreground: true
                            //                 }
                            //             }
                            //             key={item._id}
                            //             style={[styles.item, item.selectedDate ? null : styles.unscheduledItem]}
                            //                 onPress={() => {
                            //                     setEditable(item)
                            //                     setModalVisible(!modalVisible)
                            //                 }}

                            //             >
                            //                 <CheckBox
                            //                     checked={item.isChecked}
                            //                     onPress={() => { deleteitem(item, list, type) }}
                            //                     size={25}
                            //                     containerStyle={styles.checkBox}
                            //                     right={true}
                            //                     checkedIcon='check'
                            //                     checkedColor='#8789f7'
                            //                     uncheckedIcon='circle-o'
                            //                     uncheckedColor='#8789f7'
                            //                 />
                            //                 <View style={styles.horizontal}>
                            //                     <Text style={styles.itemText}>
                            //                         {item.title}
                            //                     </Text>
                            //                     {item.selectedDate &&
                            //                     <Text style={styles.time}>
                            //                         {new Date(item.selectedDate).toLocaleDateString([], {
                            //                             weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            //                         })}
                            //                     </Text>
                            // }
                            //                 </View>
                            //             </Pressable>
                           
                            <ListItem.Swipeable
                                key={item._id}
                                containerStyle={styles.item}
                                leftWidth={75}
                                animation={{ duration: 500, type: 'timing' }}
                                leftContent={(reset) => (
                                    <Button
                                        title="Info"
                                        onPress={() => deleteReminder(item._id)}
                                        icon={{ name: 'info', color: 'white' }}
                                        buttonStyle={styles.leftButton}
                                    />
                                )}
                            // rightContent={(reset) => (
                            //     <Button
                            //         title="Delete"
                            //         onPress={() => reset()}
                            //         icon={{ name: 'delete', color: 'white' }}
                            //        // buttonStyle={ backgroundColor: 'red' }}
                            //     />
                            // )}
                            >
                                {/* <ListItem.CheckBox /> */}
                                <ListItem.Content>
                                    <ListItem.Title style={styles.itemText}>

                                        {item.title}

                                    </ListItem.Title>
                                    <ListItem.Subtitle style={styles.time}>

                                        {new Date(item.selectedDate).toLocaleDateString([], {
                                            weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                        })}

                                    </ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem.Swipeable>
                                    
                        );
                    })}
                </>
                :
                <View style={[styles.item, styles.empty]}>
                    <Text style={styles.emptyText} >YOU ARE ALL CAUGHT UP</Text>
                </View>}
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'red',
        flexDirection: 'row',
        borderRadius: 22,
        paddingVertical: 0,
        paddingHorizontal: 15,
        marginBottom: 5
    },
    leftButton: {
        borderRadius: 22,

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
    },

    // horizontal: {
    //     flexDirection: 'column',
    //     alignItems: 'stat',
    // },
    checkBox: {
        backgroundColor: '#312e3f',
        padding: 0,
    },
    itemText: {
        // fontFamily: "Rubik-Regular",
        color: '#f0edf3',
        fontSize: 18
    },
    time: {
        // fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 15
    }
});

export default Items