import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { addChatReaction } from "../../redux/chatRoomSlice";
import { styles } from "../../utils/styles";

const reactionEmoji = {
  thumbsUp: '👍',
  thmbsDown: '👎',
  heart: '❤️',
  eyes: '👀'
}

export const ReactionButtons = ({ message }) => {
console.log("REACTION component", message)
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([emojiName, emoji]) => {
    return (
      <Pressable key={emojiName} style={{}} onPress={() =>
        dispatch(addChatReaction({ room_id: message.room_id, id: message.id, reaction: emojiName }))
      }>
        <Text style={{ color: '#fff' }}>{emoji} {message.reactions[emojiName]}</Text>
      </Pressable>
    )
  })

  return <View style={styles.reactions}>{reactionButtons}</View>
}