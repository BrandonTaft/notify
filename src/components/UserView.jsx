import { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useAnimatedRef, measure } from "react-native-reanimated";
import { View, Animated, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon } from 'react-native-paper';
import { fetchAllUsers, BASE_URL } from "../utils/api";
import PagerView from 'react-native-pager-view';

const { width, height } = Dimensions.get('window');
const TICKER_HEIGHT = 20;
const CIRCLE_SIZE = width * 0.3;
const PADDING = 12;
const ELEMENT_WIDTH = width * .36

export const UserView = () => {
    const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
    const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
    const AnimatedView = Animated.createAnimatedComponent(View);
    const scrollOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = useRef(new Animated.Value(0)).current;
    const animatedViewWidth = useRef(new Animated.Value(0)).current;
    const elementWidth = useRef(new Animated.Value(0)).current;
    const elementHeight = useRef(new Animated.Value(0)).current;


    const [allUsers, setAllUsers] = useState([]);
    const theme = useTheme();

    useEffect(() => {
        fetchAllUsers().then((data) => {
            console.log("ALLLUSERSSSS", data.users)
            setAllUsers(data.users)

        })
    }, [])


    // const Circle = ({
    //     scrollOffsetAnimatedValue,
    //     animatedViewWidth
    // }) => {
    //     let inputRangeArray = [];
    //     let outputRangeArray = [1];

    //     if (allUsers) {
    //         const peak = ((width * .3) / 2) + PADDING
    //         console.log("WIDTH", peak)
    //         for (let i = 0; i < allUsers.length * 2; i++) {
    //             inputRangeArray.push(peak * i)
    //             if (i > 0 && outputRangeArray[i - 1] === 1) {
    //                 outputRangeArray.push(0)
    //             } else if (i > 0) {
    //                 outputRangeArray.push(1)
    //             }
    //         }
    //     }
    //     return (
    //         <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
    //             {allUsers.map(({ color }, index) => {
    //                 const inputRange = inputRangeArray;
    //                 const inputRangeOpacity = [0, 0.5, 0.99];
    //                 const scale = scrollOffsetAnimatedValue.interpolate({
    //                     inputRange,
    //                     outputRange: outputRangeArray,
    //                     extrapolate: 'clamp',
    //                 });

    //                 const opacity = scrollOffsetAnimatedValue.interpolate({
    //                     inputRange: inputRangeOpacity,
    //                     outputRange: [0.2, 0, 0.2],
    //                 });

    //                 return (
    //                     <Animated.View
    //                         key={index}
    //                         style={[
    //                             styles.circle,
    //                             {
    //                                 backgroundColor: theme.colors.onPrimaryContainer,
    //                                 opacity,
    //                                 transform: [{ scale }],
    //                             },
    //                         ]}
    //                     />
    //                 );
    //             })}
    //         </View>
    //     );
    // };

    const Ticker = ({
        scrollOffsetAnimatedValue,
        positionAnimatedValue,
    }) => {
        const inputRange = [0, allUsers.length];
        const translateX = Animated.add(
            scrollOffsetAnimatedValue,
            positionAnimatedValue
        ).interpolate({
            inputRange,
            outputRange: [allUsers.length, 0],
        });
        let inputRangeArray = [];
        let outputRangeArray = [1];

        if (allUsers) {
            const peak = ELEMENT_WIDTH * .5
            console.log("WIDTH", peak)
            for (let i = 0; i < allUsers.length * 2; i++) {
                inputRangeArray.push(peak * i)
                if (i > 0 && outputRangeArray[i - 1] === 1) {
                    outputRangeArray.push(0)
                } else if (i > 0) {
                    outputRangeArray.push(1)
                }
            }
        }
        const opacity = scrollOffsetAnimatedValue.interpolate({
            inputRange: inputRangeArray,
            outputRange: outputRangeArray,
        });

        
        return (
            <View style={styles.tickerContainer}>
                <Animated.View style={{ transform: [{ translateX: translateX }], opacity, flexDirection:'row', right:allUsers.length}}>
                    {allUsers.map(({ userName }, index) => {
                        
                        return (
                            <Text key={index} style={[styles.tickerText]}>
                                {userName}
                            </Text>
                        );
                    })}
                </Animated.View>
             </View>
        );
    };

    const UserAvatar = ({ user }) => {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', width:ELEMENT_WIDTH}}>
                {
                    user.profileImage
                        ?

                        <Avatar.Image
                            size={ELEMENT_WIDTH * .75}
                            source={{ uri: `${BASE_URL}/images/${user._id}.jpeg` }}
                            style={{}}
                        />
                        :
                        <Avatar.Text
                            size={ELEMENT_WIDTH * .75}
                            label={user.userName.charAt(0).toUpperCase()}
                            style={{ backgroundColor: theme.colors.onPrimaryContainer }}
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
            </View>
        )
    }
    return (
        <>
        
            {/* <Circle scrollOffsetAnimatedValue={scrollOffsetAnimatedValue} /> */}

            <AnimatedScrollView
                onScroll={Animated.event(
                    [
                        {
                            nativeEvent: {
                                contentOffset: { x: scrollOffsetAnimatedValue },
                            },
                        },
                    ],
                    {
                        useNativeDriver: true,
                    }
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: ELEMENT_WIDTH * .8}}
            >
                {allUsers.map((user, index) => {
                    return (
                        <AnimatedView
                            key={index}
                        >
                            <UserAvatar user={user} />
                        </AnimatedView>
                    )
                })}

            </AnimatedScrollView>
            <View style={{paddingHorizontal: ELEMENT_WIDTH * .8}} >
            <Ticker
                scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
                positionAnimatedValue={positionAnimatedValue}
            />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
   
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: CIRCLE_SIZE + PADDING,
        height: CIRCLE_SIZE + PADDING,
        borderRadius: (CIRCLE_SIZE + PADDING) / 2,
        position: 'absolute',

    },
    tickerContainer: {
       
       
        
       overflow:'hidden',
        height: TICKER_HEIGHT,
        width:ELEMENT_WIDTH,
        
    },
    tickerText: {
        flexDirection:'row',
        textAlign:'center',
        fontSize: TICKER_HEIGHT,
        lineHeight: TICKER_HEIGHT,
        textTransform: 'uppercase',
        fontWeight: '800',
        
        width: ELEMENT_WIDTH,
    },
});