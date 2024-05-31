import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { View, Animated, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon } from 'react-native-paper';
import { fetchAllUsers, BASE_URL } from "../utils/api";
import PagerView from 'react-native-pager-view';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.6;

export const UserView = () => {
    const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
    const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
    const AnimatedView = Animated.createAnimatedComponent(View);
    const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
    const animatedViewWidth = useRef(new Animated.Value(0)).current;
    const [allUsers, setAllUsers] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchAllUsers().then((data) => {
            console.log("ALLLUSERSSSS", data.users)
            setAllUsers(data.users)
        })
    }, [])

    
const Circle = ({
    scrollOffsetAnimatedValue,
    animatedViewWidth
  }) => {
    let inputRangeArray = [];
    let outputRangeArray = [1];
    console.log(allUsers)
    if(allUsers) {
    const elementWidth = width / allUsers.length
    const peak = elementWidth / 2
    
    for (let i = 0; i < allUsers.length * 2; i++) {
        inputRangeArray.push(peak * i)
        if (i > 0 && outputRangeArray[i - 1] ===1){
        outputRangeArray.push(0)
        } else if(i > 0) {
            outputRangeArray.push(1)
        }
}
   }
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
        {allUsers.map(({ color }, index) => {
          const inputRange = inputRangeArray;
          const inputRangeOpacity = [0, 0.5, 0.99];
          const scale = scrollOffsetAnimatedValue.interpolate({
            inputRange,
            outputRange: outputRangeArray,
            extrapolate: 'clamp',
          });
  
          const opacity = scrollOffsetAnimatedValue.interpolate({
            inputRange: inputRangeOpacity,
            outputRange: [0.2, 0, 0.2],
          });
  
          return (
            <Animated.View
              key={index}
              style={[
                styles.circle,
                {
                  backgroundColor: theme.colors.onPrimaryContainer,
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

    const UserComponent = ({user}) => {
        return(
            <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 78 }}>
                    {
                        user.profileImage
                            ?

                            <Avatar.Image
                                size={width / 3}
                                source={{ uri: `${BASE_URL}/images/${user._id}.jpeg` }}
                                style={{ marginHorizontal: 10 }}
                            />
                            :
                            <Avatar.Text
                                size={width / 3}
                                label={user.userName.charAt(0).toUpperCase()}
                                style={{ backgroundColor: theme.colors.onPrimaryContainer, marginHorizontal: 10 }}
                                labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
                            />
                    }
                    {user.isLoggedIn
                        ?
                        <Badge style={{ position: 'absolute', top: 5, backgroundColor: 'green' }}>
                            <Icon
                                source="check"
                                color={"white"}

                            />
                        </Badge>
                        :
                        <Badge style={{ position: 'absolute', top: 5, backgroundColor: 'red' }}>
                            <Icon
                                source="close"
                                color={"white"}

                            />
                        </Badge>
                    }
                    <Text>{user.userName}</Text>
                </View>
        )
    }

    return (
        <>
         <Circle scrollOffsetAnimatedValue={scrollOffsetAnimatedValue} />
        
       
        <AnimatedScrollView
                onScroll={Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: { x:scrollOffsetAnimatedValue},
                          contentSize: {width: animatedViewWidth}
                        },
                      },
                    ],
                    {
                      listener: ({ nativeEvent: { contentOffset, contentSize } }) => {
                       
                        // console.log(`Position: ${position} Offset: ${contentOffset.x}`, "SCROLL", scrollOffsetAnimatedValue);
                      },
                      useNativeDriver: true,
                    }
                  )}
                horizontal
               // onScroll={(event) => console.log(event.nativeEvent)}
            >
            {allUsers.map((user, index) => {
                        return(
                        <AnimatedView key={index}>
                        <UserComponent user={user}/>
                        </AnimatedView>
                    )})}
                    </AnimatedScrollView>
                    </>
    )
}

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
    imageStyle: {
      width: width * 0.75,
      height: width * 0.75,
      resizeMode: 'contain',
      flex: 1,
    },
    textContainer: {
      alignItems: 'flex-start',
      alignSelf: 'flex-end',
      flex: 0.5,
    },
    heading: {
      color: '#444',
      textTransform: 'uppercase',
      fontSize: 24,
      fontWeight: 'width / 30',
      letterSpacing: 2,
      marginBottom: 5,
    },
    description: {
      color: '#ccc',
      fontWeight: '600',
      textAlign: 'left',
      width: width * 0.75,
      marginRight: 10,
      fontSize: 16,
      lineHeight: 16 * 1.5,
    },
    
    circleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    circle: {
      width: CIRCLE_SIZE,
      height: CIRCLE_SIZE,
      borderRadius: CIRCLE_SIZE / 2,
      position: 'absolute',
      top: '15%',
    },
  });