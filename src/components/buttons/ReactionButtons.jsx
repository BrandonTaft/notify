import { Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { addReaction } from "../../redux/noteSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀'
  }
  
  export const ReactionButtons = ({ note }) => {
    
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([emojiName, emoji]) => {
      return (
        <Pressable key={emojiName} style={{}}  onPress={() =>
            dispatch(addReaction({ id: note.id, reaction: emojiName }))
        }> 
          <Text style={{color:'#fff'}}>{emoji} {note.reactions[emojiName]}</Text>
        </Pressable>
      )
    })
  
    return <>{reactionButtons}</>
  }