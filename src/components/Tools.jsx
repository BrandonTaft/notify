import Calendar from "./Calendar";
import Notes from "./noteFeature/Notes";
import { View } from "react-native";


function Tools() {
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Calendar />
                <Notes />
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Calendar />
                <Notes />
            </View>
        </View>
    )
};

export default Tools;