import { StyleSheet, Text, View, Animated } from 'react-native';
import { List, MD3Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import UpdateReminder from './UpdateReminder';
import { useState, useRef } from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';


function Items({
    list,

}) {
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const itemToEditRef = useRef({});
    const dispatch = useDispatch()
    console.log("ITEMS: LIST: ", list)


    const renderRightActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={{backgroundColor:'blue'}} onPress={() => {
                    setShowUpdateModal(true)
               }}>
                <Text>Delete</Text>
            </RectButton>
        );
    };

    const renderLeftActions = (progress, dragX) => {
        // const trans = dragX.interpolate({
        //     inputRange: [0, 50, 100, 101],
        //     outputRange: [-20, 0, 0, 1],
        // });
        return (
            <RectButton style={{
                backgroundColor:'yellow',
                borderTopLeftRadius:22}} onPress={() => {
                    setShowUpdateModal(true)
               }}>
                <Text>Delete</Text>
            </RectButton>
        );
    };

    function ListItem({ item }) {
        return (
            <Swipeable
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            onSwipeableWillOpen={() => itemToEditRef.current = item}
             containerStyle={{ flex:1, flexDirection:'row'}}
            childrenContainerStyle={{backgroundColor:"orange", flexDirection:'row', flex:1, borderRadius:22}}
            >
           
                
           <List.Icon color={MD3Colors.tertiary70} icon="chevron-left" />
           <View style={{flexDirection:'column', flex:1}}>
                        <Text style={styles.itemText}>

                            {item.title}

                        </Text>
                   
                   
                        {item.selectedDate &&
                            <Text style={styles.time}>
                                {new Date(JSON.parse(item.selectedDate)).toLocaleDateString([], {
                                    weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                })}
                            </Text>
                        } 
                        </View>
                    <List.Icon color={MD3Colors.tertiary70} icon="chevron-right" />
                  
           </Swipeable>    
        )
    }
    return (
        <>
            {list.length > 0 ?
                <>
                    <UpdateReminder
                        showUpdateModal={showUpdateModal}
                        setShowUpdateModal={setShowUpdateModal}
                        itemToEdit={itemToEditRef.current}
                        // setItemToEdit={setItemToEdit}
                    />
                    {/* {list.filter((item) => item.selectedDate && !item.isCompleted && !item.isDeleted).map((item) => { */}
                    {list.filter((item) => item.selectedDate && !item.isCompleted && !item.isDeleted).map((item) => {
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

                            // <List.Item
                            //     key={item._id}
                            //     mode='elevated'
                            //     style={[styles.item, item.selectedDate ? null : styles.unscheduledItem]}
                            //     //contentStyle={styles.itemContent}
                            //     // onPress={() => {
                            //     //     setShowUpdateModal(true)
                            //     //     }
                            //     // }}
                            // //    left={() => <List.Icon color={MD3Colors.tertiary70} icon="chevron-left" />}
                            // //     right={() => <List.Icon color={MD3Colors.tertiary70} icon="chevron-right" style={{ left:25}} />}
                            //     title={() => <ListItem item={item} />}
                            // />
                           
                                
                                <ListItem item={item} />
                                
                              
                        );
                    }
                    )
                    }
                </>
                :
                <View style={[styles.item, styles.empty]}>
                    <Text style={styles.emptyText} >YOU ARE ALL CAUGHT UP</Text>
                </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'green',
       
        
    },
    itemContent: {
        backgroundColor:'black',
        marginHorizontal:'auto',
        height:22
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
        fontSize: 18,
       
    },
    time: {
        // fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 15
    }
});

export default Items