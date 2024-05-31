import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { View, FlatList, Animated, Dimensions, StyleSheet } from "react-native";
import { fetchGroups } from "../../utils/api";
import { useSelector, useDispatch } from 'react-redux';
import { addChatRoom, addAllRoomsFromServer } from "../../redux/chatRoomSlice";
import { ChatRoomPreviewItem } from "./ChatRoomPreviewItem";
import { Text, useTheme, Chip, FAB, IconButton } from 'react-native-paper';
import socket from "../../utils/socket";
import CreateChatComponent from "./CreateChatComponent";
import PagerView from 'react-native-pager-view';

const { width, height } = Dimensions.get('window');
  const DOT_SIZE = 35;
  const CIRCLE_SIZE = width * 0.6;

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
          setChatRooms(result.chatRooms.slice(0, 5))
          dispatch(addAllRoomsFromServer(result.chatRooms))
        }
      })
      .catch((err) => {
        console.error(err)
      });
  }, []);

  useEffect(() => {
    socket.on("chatRoomList", (rooms) => {
      setChatRooms(rooms.slice(0, 5))
      console.log("ROOMS",rooms)
      dispatch(addChatRoom(rooms))
    });
                      
    dispatch(addChatRoom(rooms))
  }, [socket, rooms]);

  // const Circle = ({
  //   scrollOffsetAnimatedValue,
  // }) => {
  //   return (
  //     <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
  //       {rooms.map(({ color }, index) => {
  //         const inputRange = [0, 0.5, 0.99];
  //         const inputRangeOpacity = [0, 0.5, 0.99];
  //         const scale = scrollOffsetAnimatedValue.interpolate({
  //           inputRange,
  //           outputRange: [1, 0, 1],
  //           extrapolate: 'clamp',
  //         });
  
  //         const opacity = scrollOffsetAnimatedValue.interpolate({
  //           inputRange: inputRangeOpacity,
  //           outputRange: [0.2, 0, 0.2],
  //         });
  
  //         return (
  //           <Animated.View
  //             key={index}
  //             style={[
  //               styles.circle,
  //               {
  //                 backgroundColor: theme.colors.onPrimaryContainer,
  //                 opacity,
  //                 transform: [{ scale }],
  //               },
  //             ]}
  //           />
  //         );
  //       })}
  //     </View>
  //   );
  // };

  const Pagination = ({
    scrollOffsetAnimatedValue,
    positionAnimatedValue,
  }) => {
    const inputRange = [0, chatRooms.length];
    const translateX = Animated.add(
      scrollOffsetAnimatedValue,
      positionAnimatedValue
    ).interpolate({
      inputRange,
      outputRange: [0, chatRooms.length * DOT_SIZE],
    });

    return (
      <View style={[styles.pagination]}>
        <Animated.View
          style={[
            styles.paginationIndicator,
            {
              //position: 'absolute',
              position:'relative',
              left: DOT_SIZE / 2,
              transform: [{ translateX: translateX }],
            },
          ]}
        />
        {chatRooms.map((item) => {
          return (
            <View key={item._id} style={styles.paginationDotContainer}>
              <View
                style={[styles.paginationDot, { backgroundColor: theme.colors.primaryContainer }]}
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
      {chatRooms.length > 0 ? (
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
            {chatRooms.map((room, index) => {
              return (
                <View key={room._id}>
                  <ChatRoomPreviewItem item={room} />
                </View>
              )
            })}
          </AnimatedPagerView>

          <IconButton
            mode="contained"
            icon="plus"
            iconColor={theme.colors.onPrimaryContainer}
            size={24}
            style={{
              backgroundColor: theme.colors.primaryContainer,
              position: 'absolute',
              margin: 0,
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pagination: {
   justifyContent:'center',
    bottom:0,
    flexDirection: 'row',
    height: DOT_SIZE,
   
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    right: DOT_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  }
});