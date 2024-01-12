import { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable, Button } from "react-native";
import { Audio } from 'expo-av';

function Timer({ setShowTimer, stopTime }) {
    const [started, setStarted] = useState(false);
    const [paused, setPaused] = useState(false)
    const [difference, setDifference] = useState()
    const [sound, setSound] = useState();
    const [timeUnits, setTimeUnits] = useState({ 
        hours: 0, 
        minutes: 0, 
        seconds: 0, 
    }); 
    
    async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(require('../../assets/alarm.wav')
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    
    useEffect(() => {
        var d = new Date();
        setDifference((stopTime.getTime() - d.setHours(0, 0, 0, 0)) / 10)
    },[])

    useEffect(() => {
        if (difference <= 0) {
            playSound()
            return;
        }

        setTimeUnits({
            seconds: Math.floor((difference % 6000) / 100),
            minutes: Math.floor((difference % 360000) / 6000),
            hours: Math.floor((difference % 21600000) / 360000)
        }); 

        
        if(started && !paused) {
        const timer = setInterval(() => {
            setDifference((prevDifference) => prevDifference - 100);
        }, 1000);

        return () => clearInterval(timer);
    }
    }, [difference, started, paused]);

    // Format the remaining time (e.g., “00:05:10” for 5 minutes and 10 seconds)
    // const formatTime = (timeInSeconds) => {
    //     const minutes = Math.floor(timeInSeconds / 60)
    //         .toString()
    //         .padStart(2, '0');
    //     const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
    //     return `${minutes}:${seconds}`;
    // };

    // useEffect(() => {
    //     let intervalId
    //     if(time === 0) {
    //         playSound()
    //         setStarted(false)
    //     }
    //     if (started) {
    //         intervalId = setInterval(() => setTime(time - 1), 10);
    //     }
    //     return () => clearInterval(intervalId);
    // }, [started, time]);

    // const minutes = Math.floor((time % 360000) / 6000);
    // const seconds = Math.floor((time % 6000) / 100);
    // const milliseconds = time % 100;
    // let seconds = Math.floor(difference / 1000);
    // let minutes = Math.floor((seconds % (60 * 60)) / 60)
    // let hours = Math.floor(
    //     (seconds % (24 * 60 * 60)) / (60 * 60)
    // )

    return (
        // <View>
        //     <Text style={styles.stopwatch}>
        //     <Text style={[ 
        //                     styles.timeUnit, 
        //                     styles.yearUnit, 
        //                 ]}  
        //     >
        //         {timeUnits.hours.toString().padStart(2, "0")}
        //     </Text>
        //     <Text>:</Text>
        //     <Text style={[ 
        //                     styles.timeUnit, 
        //                     styles.yearUnit, 
        //                 ]} 
        //     >
        //         {timeUnits.minutes.toString().padStart(2, "0")}
        //     </Text>
        //     <Text>:</Text>
        //     <Text style={[ 
        //                     styles.timeUnit, 
        //                     styles.yearUnit, 
        //                 ]} 
        //     >
        //         {timeUnits.seconds.toString().padStart(2, "0")}
        //     </Text>
                
                
        //         {/* <Text>{formatTime(seconds)}</Text> */}
        //     </Text>
        //     <Pressable android_ripple={
        //         RippleConfig = {
        //             color: '#121212',
        //             foreground: true,
        //             borderLess: true
        //         }
        //     }
        //         style={styles.alarmBtn}
        //         onPress={() => {
        //             setStarted(true)
        //         }}
        //     >
        //         <Text style={{ color: 'white', fontSize: 19 }}>Start</Text>
        //     </Pressable>

        //     <Pressable android_ripple={
        //         RippleConfig = {
        //             color: '#121212',
        //             foreground: true,
        //             borderLess: true
        //         }
        //     }
        //         style={styles.alarmBtn}
        //         onPress={() => {
        //             setSound()
        //             setStarted(false)
        //             //setSeconds(0)
        //             setShowTimer(false)
        //         }}
        //     >
        //         <Text style={{ color: 'white', fontSize: 19 }}>Clear</Text>
        //     </Pressable>
        // </View>
        <View style={styles.container}> 
                {/* <Text style={styles.title}> 
                    Geeksforgeeks 
                </Text> 
                <Text style={styles.subtitle}> 
                    React Native Countdown Timer 
                </Text>  */}
                <View style={styles.timer}> 
                    
                    <Text 
                        style={[ 
                            styles.timeUnit, 
                            styles.hourUnit, 
                        ]} 
                    > 
                         {timeUnits.hours.toString().padStart(2, "0")} 
                    </Text> 
                    <Text 
                        style={styles.timeSeparator} 
                    >:</Text> 
                    <Text 
                        style={[ 
                            styles.timeUnit, 
                            styles.minuteUnit, 
                        ]} 
                    > 
                        {timeUnits.minutes.toString().padStart(2, "0")}
                    </Text> 
                    <Text 
                        style={styles.timeSeparator} 
                    >:</Text> 
                    <Text 
                        style={[ 
                            styles.timeUnit, 
                            styles.secondUnit, 
                        ]} 
                    > 
                        {timeUnits.seconds.toString().padStart(2, "0")}
                    </Text> 
                    <Text 
                        style={styles.timeSeparator} 
                    ></Text> 
                </View> 
                {/* <Text style={styles.timetitle}> 
                    Years Days Hours Minutes Seconds 
                </Text>  */}
                <View style={styles.buttonContainer}> 
                    <Button 
                        title="Start Timer"
                        onPress={() =>  setStarted(true)} 
                        style={styles.button} 
                    /> 
                    <Button 
                        title="Pause Timer"
                        onPress={() =>  setPaused(!paused)} 
                        style={styles.button} 
                    /> 
                    <Button 
                        title="Reset Timer"
                        onPress={() => {
                                        setSound()
                                        setStarted(false)
                                        //setSeconds(0)
                                        setShowTimer(false)
                                    }}
                        style={[ 
                            styles.button, 
                            styles.resetButton, 
                        ]} 
                    /> 
                </View> 
                </View>
    )
}

export default Timer

// const styles = StyleSheet.create({
//     stopwatch: {
//         width: 'fit-content',
//         margin: 'auto',
//         padding: 16,
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 22,
//         backgroundColor: 'red',
//         borderRadius: 12
//     },
//     timeUnit: { 
//         fontSize: 24, 
//         fontWeight: "bold", 
//         paddingHorizontal: 10, 
//         paddingVertical: 5, 
//     }, 
//     yearUnit: { 
//         backgroundColor: "blue", 
//         borderRadius: 15, 
//         color: "white", 
//     }, 
// })

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 20, 
        justifyContent: "center", 
        alignItems: "center", 
    }, 
    title: { 
        fontSize: 30, 
        fontWeight: "bold", 
        paddingVertical: 20, 
        color: "green", 
    }, 
    subtitle: { 
        marginBottom: 20, 
        fontSize: 18, 
    }, 
    timer: { 
        flexDirection: "row", 
        alignItems: "center", 
    }, 
    timeUnit: { 
        fontSize: 30, 
        fontWeight: "bold", 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
    }, 
    hourUnit: { 
        backgroundColor: "red", 
        borderRadius: 15, 
        color: "white", 
    }, 
    minuteUnit: { 
        backgroundColor: "red", 
        borderRadius: 15, 
        color: "white", 
    }, 
    secondUnit: { 
        backgroundColor: "red", 
        borderRadius: 15, 
        color: "white", 
    }, 
    timeSeparator: { 
        color:'#fff',
        fontSize: 24, 
        fontWeight: "bold", 
        marginHorizontal: 5, 
    }, 
    timetitle: { 
        fontSize: 17, 
        padding: 10, 
        paddingRight: 19, 
        fontWeight: "bold", 
    }, 
}); 