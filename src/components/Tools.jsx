import DateTimePicker from "./reminderFeature/CreateReminderComponent";
import Notes from "./noteFeature/Notes";
import { View } from "react-native";


function Tools() {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* <DateTimePicker /> */}
                <Notes />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* <DateTimePicker /> */}
                <Notes />
            </View>
        </View>
    )
};

export default Tools;