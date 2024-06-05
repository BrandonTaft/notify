import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  ImageRequireSource,
} from 'react-native';
import type { PagerViewOnPageScrollEventData } from 'react-native-pager-view';
import PagerView from 'react-native-pager-view';

const data = [
  {
    type: 'Humlan P',
    imageUri: require('../assets/urbanears_blue.png'),
    heading: 'Vibrant colors',
    description: 'Four on-trend colorways to seamlessly suit your style.',
    key: 'first',
    color: '#9dcdfa',
  },
  {
    type: 'Pampas',
    imageUri: require('../assets/urbanears_pink.png'),
    heading: 'Redefined sound',
    description: 'A bold statement tuned to perfection.',
    key: 'second',
    color: '#db9efa',
  },
  {
    type: 'Humlan P',
    imageUri: require('../assets/urbanears_grey.png'),
    heading: 'Great quality',
    description:
      'An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology',
    key: 'third',
    color: '#999',
  },
  {
    type: 'Humlan B',
    imageUri: require('../assets/urbanears_mint.png'),
    heading: 'From Sweden',
    description:
      'The “Plattan” in Plattan headphones is Swedish for “the slab.”',
    key: 'fourth',
    color: '#a1e3a1',
  },
];

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

    useLayoutEffect(() => {
        fetchAllUsers().then((data) => {
            console.log("ALLLUSERSSSS", data.users)
            setAllUsers(data.users)

        })
    }, [])


    useEffect(() => {
        fetchAllUsers().then((data) => {
            console.log("ALLLUSERSSSS", data.users)
            setAllUsers(data.users)

        })
    }, [])


    const Circle = ({
        children,
        scrollOffsetAnimatedValue,
        animatedViewWidth
    }) => {
        let inputRangeArray = [];
        let outputRangeArray = [1];

        if (allUsers) {
            const peak = ((width * .3) / 2) + PADDING
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
                        >{children}</Animated.View>
                    );
                })}
            </View>
        );
    };

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
            const peak = ((width * .3) / 2) + PADDING
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
       
        return (
            <View style={styles.tickerContainer}>
                <Animated.View style={[{ transform: [{ translateX: translateX }], flexDirection:'row', right:allUsers.length}]}>
                    {allUsers.map(({ userName }, index) => {
                         const opacity = scrollOffsetAnimatedValue.interpolate({
                            inputRange: [0, 0.5, 0.99],
                            outputRange: [0.2, 0, 0.2],
                        });
                        return (
                            <Animated.Text key={index} style={[styles.tickerText,{opacity}]}>
                                {userName}
                            </Animated.Text>
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

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Circle = ({
  scrollOffsetAnimatedValue,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
      {data.map(({ color }, index) => {
        const inputRange = [0, 0.5, 0.99];
        const inputRangeOpacity = [0, 0.5, 0.99];
        const scale = scrollOffsetAnimatedValue.interpolate({
          inputRange,
          outputRange: [1, 0, 1],
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
                backgroundColor: color,
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

const Ticker = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}) => {
  const inputRange = [0, data.length];
  const translateY = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, data.length * -TICKER_HEIGHT],
  });
  return (
    <View style={styles.tickerContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data.map(({ type }, index) => {
          return (
            <Text key={index} style={styles.tickerText}>
              {type}
            </Text>
          );
        })}
      </Animated.View>
    </View>
  );
};

const Item = ({
  imageUri,
  heading,
  description,
  scrollOffsetAnimatedValue,
}: {
  imageUri: ImageRequireSource;
  description: string;
  heading: string;
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}) => {
  const inputRange = [0, 0.5, 0.99];
  const inputRangeOpacity = [0, 0.5, 0.99];
  const scale = scrollOffsetAnimatedValue.interpolate({
    inputRange,
    outputRange: [1, 0, 1],
  });

  const opacity = scrollOffsetAnimatedValue.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [1, 0, 1],
  });

  return (
    <View style={styles.itemStyle}>
      <Animated.Image
        source={imageUri}
        style={[
          styles.imageStyle,
          {
            transform: [{ scale }],
          },
        ]}
      />
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
            },
          ]}
        >
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
            },
          ]}
        >
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};

const Pagination = ({
  scrollOffsetAnimatedValue,
  positionAnimatedValue,
}: {
  scrollOffsetAnimatedValue: Animated.Value;
  positionAnimatedValue: Animated.Value;
}) => {
  const inputRange = [0, data.length];
  const translateX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, data.length * DOT_SIZE],
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
      {data.map((item) => {
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

export default function HeadphonesCarouselExample() {
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Circle scrollOffsetAnimatedValue={scrollOffsetAnimatedValue} />
      <AnimatedPagerView
        initialPage={0}
        style={{ width: '100%', height: '100%' }}
        onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
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
        {data.map((item, index) => (
          <View collapsable={false} key={index}>
            <Item
              {...item}
              scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
              positionAnimatedValue={positionAnimatedValue}
            />
          </View>
        ))}
      </AnimatedPagerView>
      <Image
        style={styles.logo}
        source={require('../assets/ue_black_logo.png')}
      />
      <Pagination
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
      />
      <Ticker
        scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
        positionAnimatedValue={positionAnimatedValue}
      />
    </View>
  );
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
    fontWeight: '800',
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
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      { translateX: -LOGO_WIDTH / 2 },
      { translateY: -LOGO_HEIGHT / 2 },
      { rotateZ: '-90deg' },
      { translateX: LOGO_WIDTH / 2 },
      { translateY: LOGO_HEIGHT / 2 },
    ],
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  tickerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    fontWeight: '800',
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