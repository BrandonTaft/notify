import { parseISO, formatDistanceToNow } from 'date-fns';
import { Text } from 'react-native';
import { styles } from '../utils/styles';

export const ElapsedTime = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <Text style={{color:'grey'}}>
     {timeAgo}
     </Text>
  )
}