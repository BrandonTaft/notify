import { StyleSheet, Text, View, Pressable } from 'react-native';
import { CheckBox } from '@rneui/themed';

function Item({
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
                            <View key={reminder._id}>
                                <Pressable
                                    android_ripple={
                                        RippleConfig = {
                                            color: '#b804d1de',
                                            foreground: true
                                        }
                                    }
                                    onPress={() => {
                                        setEditable(reminder)
                                        setModalVisible(!modalVisible)
                                    }}
                                    style={[styles.item, styles.unscheduledItem]}
                                >
                                    <CheckBox
                                        checked={reminder.priority}
                                        onPress={() => { handleCheck(reminder, list, type) }}
                                        size={25}
                                        containerStyle={styles.checkBox}
                                        right={true}
                                        checkedIcon='check'
                                        checkedColor='#b804d1de'
                                        uncheckedIcon='circle-o'
                                        uncheckedColor='#b804d1de'
                                    />
                                    <View style={styles.horizontal}>
                                        <Text style={styles.itemText}>
                                            {reminder.name}
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
                            </View>
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
        backgroundColor: '#2e2e2f',
        flexDirection: 'row',
        borderRadius: 20,
        margin: 4,
        marginLeft: 0,
        marginRight: 0,
       
    },
    empty: {
        paddingVertical:44,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontFamily: "Rubik-Medium",
        color: '#b804d1de',
        fontSize: 18
    },
    unscheduledItem: {
        paddingTop: 8,
        paddingBottom: 8
    },
    horizontal: {
        flexDirection: 'column',
        alignItems: 'stat',
    },
    checkBox: {
        backgroundColor: '#2e2e2f',
        padding: 0,
    },
    itemText: {
        fontFamily: "Rubik-Regular",
        color: 'white',
        fontSize: 18
    },
    time: {
        fontFamily: "Rubik-Regular",
        color: 'grey',
        fontSize: 15
    }
});

export default Item