import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { View, FlatList, Animated } from "react-native";
import { fetchGroups } from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { addChatRoom, addAllRoomsFromServer } from "../../redux/chatRoomSlice";
import { ChatRoomPreviewItem } from "./ChatRoomPreviewItem";
import { Text, useTheme, Chip, FAB } from 'react-native-paper';
import socket from "../../utils/socket";
import CreateChatComponent from "./CreateChatComponent";
import PagerView from 'react-native-pager-view';
import { styles } from "../../utils/styles";

export default function ChatRoomPreview() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [showCreateChatComponent, setShowCreateChatComponent] = useState(false);
  const dispatch = useDispatch()
  const theme = useTheme();
  const rooms = useSelector(state => state.chatRooms);
  const user = useSelector(state => state.user);

  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    setIsLoading(true)
    fetchGroups()
      .then((result) => {
        if (result.success) {
          setIsLoading(false)
          setChatRooms(result.chatRooms)
          dispatch(addAllRoomsFromServer(result.chatRooms))
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  useEffect(() => {
    socket.on("chatRoomList", (rooms) => {
      setChatRooms(rooms)
      dispatch(addChatRoom(rooms))
    });
  }, [socket]);

  const Pagination = ({
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  }) => {
    const inputRange = [0, rooms.length];
    const translateX = Animated.add(
      scrollOffsetAnimatedValue,
      positionAnimatedValue
    ).interpolate({
      inputRange,
      outputRange: [0, rooms.length * 40 ],
    });
  
    return (
      <View style={[styles.pagination]}>
        <Animated.View
          style={[
            styles.paginationIndicator,
            {
              position: 'absolute',
              transform: [{ translateX: translateX }],
            },
          ]}
        />
        {rooms.map((item) => {
          return (
            <View key={item.key} style={styles.paginationDotContainer}>
              <View
                style={[styles.paginationDot, { backgroundColor: item.color }]}
              />
            </View>
          );
        })}
      </View>
    );
  };
  const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
  return (
    <View style={[{ flex: 1 }]}>
      {rooms.length > 0 ? (
        <>
          <AnimatedPagerView style={{ flex: 1 }} 
          
          initialPage={0}
          onPageScroll={Animated.event(
            [
              {
                nativeEvent: {
                  offset: scrollOffsetAnimatedValue,
                  position: positionAnimatedValue,
                },
              },
            ],
            {
              listener: ({ nativeEvent: { offset, position } }) => {
                console.log(`Position: ${position} Offset: ${offset}`);
              },
              useNativeDriver: true,
            }
          )}
          
          >
            {rooms.map((room, index) => {
              return (
                <View key={index}>
                  <ChatRoomPreviewItem item={room} />
                </View>
              )
            })}
          </AnimatedPagerView>
          <FAB
            icon="plus"
            style={{
              position: 'absolute',
              margin: 8,
              right: 0,
              bottom: 0,
            }}
            onPress={() => setShowCreateChatComponent(true)}
          />
           <Pagination
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
      />
        </>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="headlineSmall" style={{ color: theme.colors.text }}>No rooms created!</Text>
          <Chip
            icon="chat"
            elevated={true}
            rippleColor="rgba(0, 0, 0, .25)"
            onPress={() => setShowCreateChatComponent(true)}
            style={{ margin: 20 }}
            textStyle={{ fontSize: 17, fontWeight: 'bold' }}
          >
            Create Room
          </Chip>
        </View>
      )}
      <CreateChatComponent
        showCreateChatComponent={showCreateChatComponent}
        setShowCreateChatComponent={setShowCreateChatComponent}
      />
    </View >
  );
}