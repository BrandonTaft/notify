import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './reminderSlice'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper';
import HomeScreen from '../../screens/HomeScreen';

export default function Reminder() {
  const count = useSelector(state => state.reminder.value)
  const dispatch = useDispatch()

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
      </View>
      <HomeScreen/>
    </View>
  )
}