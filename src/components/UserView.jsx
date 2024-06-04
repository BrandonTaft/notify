import { useState, useEffect, useRef } from "react";
import { useAnimatedRef, measure } from "react-native-reanimated";
import { View, Animated, Dimensions, StyleSheet, FlatList, ScrollView } from "react-native";
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
                <View style={{position:'absolute', bottom:0, borderRadius:10, alignItems:'center', paddingHorizontal:15, backgroundColor: 'rgba(12,12,12, 0.6)'}}>
                <Text style={{color:"#fff", fontWeight:900}}>{user.userName}</Text>
                </View>
            </View>
        )
    }
    return (
        <>
         <FlatList
                horizontal
                data={allUsers}
                renderItem={({ item }) => <UserAvatar user={item} />}
                keyExtractor={(item) => item._id}
            />
          
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