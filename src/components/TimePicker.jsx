import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Timer from './Timer';
import { Pressable, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";

function TimePicker({
    setShowPicker,
    showPicker,
    
}) {
    const [showTimer, setShowTimer] = useState(false);
    const [stopTime, setStopTime] = useState();

    let initialValue = new Date()
    initialValue.setHours(0, 1, 0, 0)
    return (
        <View style={styles.container}>
            {showTimer &&
                <View style={styles.alarm}>
                    <Timer setShowTimer={setShowTimer} stopTime={stopTime} />
                </View>
            }
            {showPicker &&
                <DateTimePicker
                    value={initialValue}
                    is24Hour={true}
                    mode="time"
                    display='spinner'
                    onChange={(selectedTime) => {
                        let t = new Date(selectedTime.nativeEvent.timestamp)
                        t.setSeconds(0)
                        setShowPicker(false)
                        setStopTime(t)
                        setShowTimer(true)
                       
                    }}
                    onCancel={() => {
                        console.log("STOP")
                        setShowPicker(false)
                    }}
                />
            }
        </View>
    )
}

export default TimePicker

const styles = StyleSheet.create({
    drawer: {
        flex: 1
    },
    container: {

        backgroundColor: '#000',
        position: 'absolute',
        flex: 1
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    alarm: {

        left: 0,
        right: 0,
        backgroundColor: '#00030ae0',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20
    }
})