
import DateTimePicker from "./reminderFeature/CreateReminderComponent";
import Notes from "./noteFeature/Notes";
import { View, FlatList } from "react-native";
import { Avatar, useTheme, Text, Badge, Icon } from 'react-native-paper';
import { fetchAllUsers } from "../utils/api";
import { useEffect, useState } from "react";
import { UserView } from "./UserView";
import PagerView from 'react-native-pager-view';


//const CIRCLE_SIZE = width * 0.6;
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


function Tools() {
    const [allUsers, setAllUsers] = useState([]);
    const theme = useTheme();
    useEffect(() => {
        fetchAllUsers().then((data) => {
            console.log("ALLLUSERSSSS", data.users)
            setAllUsers(data.users)
        })
    }, [])

    // const UserView = ({ user }) => {
    //     return (
    //         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //             {
    //                 user.profileImage
    //                     ?

    //                     <Avatar.Image
    //                         size={80}
    //                         source={{ uri: `https://aaf9-75-131-25-248.ngrok-free.app/images/${user._id}.jpeg` }}
    //                         style={{ marginHorizontal: 10 }}
    //                     />
    //                     :
    //                     <Avatar.Text
    //                         size={80}
    //                         label={user.userName.charAt(0).toUpperCase()}
    //                         style={{ backgroundColor: theme.colors.onPrimaryContainer, marginHorizontal: 10 }}
    //                         labelStyle={{ color: theme.colors.onPrimary, fontWeight: 'bold' }}
    //                     />
    //             }
    //             {user.isLoggedIn
    //             ?
    //             <Badge style={{ position: 'absolute', top: 5, backgroundColor: 'green' }}>
    //                 <Icon
    //                     source="check"
    //                     color={"white"}

    //                 />
    //             </Badge>
    //             :
    //             <Badge style={{ position: 'absolute', top: 5, backgroundColor: 'red' }}>
    //             <Icon
    //                 source="close"
    //                 color={"white"}

    //             />
    //         </Badge>
    // }
    //             <Text>{user.userName}</Text>
    //         </View>
    //     )
    // }

    return (
        <View style={{ flex: 1 }}>
            {/* <FlatList
                horizontal
                data={allUsers}
                renderItem={({ item }) => <UserView user={item} />}
                keyExtractor={(item) => item._id}
            /> */}
            <UserView />
            {/* <Notes /> */}
        </View>
    )
};

export default Tools;