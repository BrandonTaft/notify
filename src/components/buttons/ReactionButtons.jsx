import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../utils/socket";
import { styles } from "../../utils/styles";
import { useEffect, useLayoutEffect, useState } from "react";

const reactionEmoji = {
  thumbsUp: '👍',
  thumbsDown: '👎',
  heart: '❤️',
  eyes: '👀'
}

export const ReactionButtons = ({ message }) => {
  const [chatReaction, setChatReaction] = useState({})
console.log("REACTION component", message)
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setChatReaction(message.reactions)
  },[])

  useEffect(() => {
    socket.on("newReaction", (reaction) => setChatReaction(reaction));
  },[socket])

  const handleNewReaction = (emojiName) => {
        socket.emit("newReaction", {
          room_id: message.room_id,
          id: message.id,
          reaction: emojiName
        }); 
};

  const reactionButtons = Object.entries(reactionEmoji).map(([emojiName, emoji]) => {
    return (
      <Pressable key={emojiName} style={{}} onPress={() =>
        handleNewReaction(emojiName)
      }>
        <Text style={{ color: '#fff' }}>{emoji} {chatReaction[emojiName]}</Text>
      </Pressable>
    )
  })

  return <View style={styles.reactions}>{reactionButtons}</View>
}