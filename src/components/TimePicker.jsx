import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Timer from './Timer';
import { View } from "react-native";

function TimePicker({
    setShowPicker,
    showPicker,
    
}) {
    const [showTimer, setShowTimer] = useState(false);
    const [stopTime, setStopTime] = useState();

    let initialValue = new Date()
    initialValue.setHours(0, 1, 0, 0)
    return (
        <View style={{ backgroundColor: '#00030ae0', position: 'absolute', borderRadius:33, margin:25}}>
            {showTimer &&
                
                    <Timer setShowTimer={setShowTimer} stopTime={stopTime} />
              
            }
            {showPicker &&
                <DateTimePicker
                    value={initialValue}
                    is24Hour={true}
                    mode="time"
                    display='spinner'
                    onChange={(selectedTime) => {
                        if(selectedTime.type === "set"){
                        let t = new Date(selectedTime.nativeEvent.timestamp)
                        t.setSeconds(0)
                        setShowPicker(false)
                        setStopTime(t)
                        setShowTimer(true)
                        } else{
                        setShowPicker(false)
                        setShowTimer(false)
                        }
                       
                    }}
                />
            }
        </View>
    )
}

export default TimePicker