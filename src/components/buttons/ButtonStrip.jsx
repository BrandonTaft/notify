import CreateNote from "../CreateNote";
import CreateReminder from "../CreateReminder";
import { View } from "react-native";

export default function ButtonStrip() {
    return (
        <View style={{flexDirection:'row'}}>
        <CreateNote />
        <CreateReminder />
        </View>
    )
}