import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CheckBox } from '@rneui/themed';

function Items({
    list,
    type,
    setEditable,
    modalVisible,
    setModalVisible,
    handleCheck
}) {
    
    return (
        <>
            {list.length > 0 ?
                <>
                    {list.map((reminder) => {
                        return (
                                <Pressable
                                   android_ripple={
                                    RippleConfig = {
                                        color: "#15131d",
                                        borderless: false,
                                        foreground: true
                                    }
                                }
                                key={reminder._id}
                                style={[styles.item, reminder.notification ? null : styles.unscheduledItem]}
                                    onPress={() => {
                                        setEditable(reminder)
                                        setModalVisible(!modalVisible)
                                    }}
                                    
                                >
                                    <CheckBox
                                        checked={reminder.isChecked}
                                        onPress={() => { handleCheck(reminder, list, type) }}
                                        size={25}
                                        containerStyle={styles.checkBox}
                                        right={true}
                                        checkedIcon='check'
                                        checkedColor='#8789f7'
                                        uncheckedIcon='circle-o'
                                        uncheckedColor='#8789f7'
                                    />
                                    <View style={styles.horizontal}>
                                        <Text style={styles.itemText}>
                                            {reminder.title}
                                        </Text>
                                        {reminder.notification &&
                                        <Text style={styles.time}>
                                            {new Date(reminder.notification).toLocaleDateString([], {
                                                weekday: 'short', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                            })}
                                        </Text>
                    }
                                    </View>
                                </Pressable>
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
        backgroundColor: '#312e3f',
        flexDirection: 'row',
        borderRadius: 20,
        margin: 4,
        marginLeft: 8,
        marginRight: 8,
        paddingTop:4,
        paddingBottom:2
    },
    empty: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontFamily: "Rubik-Medium",
        color: '#8789f7',
        fontSize: 18,
        marginVertical:44
    },
    unscheduledItem: {
        paddingTop: 12,
        paddingBottom: 12
    },
    horizontal: {
        flexDirection: 'column',
        alignItems: 'stat',
    },
    checkBox: {
        backgroundColor: '#312e3f',
        padding: 0,
    },
    itemText: {
        fontFamily: "Rubik-Regular",
        color: '#f0edf3',
        fontSize: 18
    },
    time: {
        fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 15
    }
});

export default Items