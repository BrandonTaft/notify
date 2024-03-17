import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementAsync } from '../redux/reminderSlice'
import { addNote, selectNote } from '../redux/noteSlice';
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';

export default function Reminder() {
  const count = useSelector(state => state.reminders.value)
  const dispatch = useDispatch()
  const note = useSelector(selectNote)

  return (
    <View style={{flex:1}}>
      <View>
        <Button
          
          onPress={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Text>{count}</Text>
        <Button
          
          onPress={() => dispatch(decrement())}
        >
          Decrement
        </Button>
        <Button
          
          onPress={() => dispatch(addNote())}
        >
          Get Reminders
        </Button>
        <Text>{note}</Text>
        <Button
          
          onPress={() => dispatch(incrementAsync(100))}
        >
          IncrementAsync
        </Button>
        <Text>{count}</Text>
      </View>
      <HomeScreen/>
    </View>
  )
}