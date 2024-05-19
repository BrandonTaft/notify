import DateTimePicker from "./reminderFeature/CreateReminderComponent";
import Notes from "./noteFeature/Notes";
import { View } from "react-native";


function Tools() {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            
                <Notes />
            
        </View>
    )
};

export default Tools;