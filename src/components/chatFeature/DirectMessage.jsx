import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { View, Animated, Dimensions, StyleSheet } from "react-native";
import { Text, useTheme, Chip, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { addPrivateRooms } from "../../redux/userSlice";
import { ChatRoomPreviewItem } from "./ChatRoomPreviewItem";
import { CreateChatComponent } from "./CreateChatComponent";
import { fetchDirectMessages } from "../../utils/api";
import PagerView from 'react-native-pager-view';
import {socket, publicSocket, privateSocket} from "../../utils/socket";

const { width, height } = Dimensions.get('window');
const DOT_SIZE = 35;

export default function DirectMessage() {
  const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
  const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showCreateChatComponent, setShowCreateChatComponent] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const rooms = useSelector(state => state.chatRooms);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const theme = useTheme();

  useLayoutEffect(() => {
    setChatRooms(user.privateRooms)
  }, []);

  useEffect(() => {
    positionAnimatedValue.setValue(0)
    scrollOffsetAnimatedValue.setValue(0)
    socket.emit("privateRoomList", user._id);
    socket.on("foundPrivateRooms", (rooms) => {
      setChatRooms(rooms)
      dispatch(addPrivateRooms(rooms))
    });
  }, [socket, rooms]);

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
              position: 'relative',
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
                  console.log(`Position: ${position} Offset: ${offset}`, scrollOffsetAnimatedValue);
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
    justifyContent: 'center',
    bottom: 0,
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