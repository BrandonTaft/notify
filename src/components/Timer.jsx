import { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable, Modal } from "react-native";
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';

function Timer({ setShowTimer, stopTime }) {
    const [started, setStarted] = useState(false);
    const [isTimeUp, setisTimeUp] = useState(false)
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
        if (stopTime) {
            setDifference((stopTime.getTime() - d.setHours(0, 0, 0, 0)) / 10)
        } else {
            setDifference(1)
        }
    }, [stopTime])

    useEffect(() => {
        if (difference < 0) {
            const timerAudio = setInterval(() => {
                setisTimeUp(true)
                playSound()
            }, 15000);

            return () => clearInterval(timerAudio);
        }

        setTimeUnits({
            seconds: Math.floor((difference % 6000) / 100),
            minutes: Math.floor((difference % 360000) / 6000),
            hours: Math.floor((difference % 21600000) / 360000)
        });


        if (started) {
            const timer = setInterval(() => {
                setDifference((prevDifference) => prevDifference - 100);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [difference, started]);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isTimeUp}
                onRequestClose={() => {
                    setShowAlarm(!showAlarm);
                }}>
                <View style={styles.timeIsUp}>
                    <Text style={styles.timeIsUpText}>TIME IS UP</Text>
                
                <Pressable android_ripple={
                    RippleConfig = {
                        color: '#121212',
                        foreground: true,
                        borderLess: true
                    }
                }
                    style={styles.timeIsUpBtn}
                    onPress={() => {
                        setSound()
                        setStarted(false)
                        setisTimeUp(false)
                        setShowTimer(false)
                    }}
                >
                    <Text style={styles.timeIsUpBtnText}>End</Text>
                </Pressable>
                </View>
            </Modal>
            <View style={styles.timer}>
                <View>
                    <Text style={styles.subtitle}>
                        H
                    </Text>
                    <Text style={styles.timeUnit}>
                        {timeUnits.hours.toString().padStart(2, "0")}
                    </Text>
                </View>
                <Text style={styles.timeSeparator} >
                    :
                </Text>
                <View>
                    <Text style={styles.subtitle}>
                        M
                    </Text>
                    <Text style={styles.timeUnit} >
                        {timeUnits.minutes.toString().padStart(2, "0")}
                    </Text>
                </View>
                <Text style={styles.timeSeparator}>
                    :
                </Text>
                <View>
                    <Text style={styles.subtitle}>
                        S
                    </Text>
                    <Text style={styles.timeUnit}>
                        {timeUnits.seconds.toString().padStart(2, "0")}
                    </Text>
                </View>
                <Text style={styles.timeSeparator}></Text>
            </View>
            <View style={styles.buttonContainer}>

                <Pressable android_ripple={
                    RippleConfig = {
                        color: '#121212',
                        foreground: true,
                        borderLess: true
                    }
                }
                    style={styles.alarmBtn}
                    onPress={() => {
                        setStarted(!started)
                    }}
                >
                    {!started ?
                        <FontAwesome name="play" size={24} color="#fff" />
                        :
                        <FontAwesome name="pause" size={24} color="#fff" />
                    }
                </Pressable>
                <Pressable android_ripple={
                    RippleConfig = {
                        color: '#121212',
                        foreground: true,
                        borderLess: true
                    }
                }
                    style={styles.alarmBtn}
                    onPress={() => {
                        setSound()
                        setStarted(false)
                        setisTimeUp(false)
                        setShowTimer(false)
                    }}
                >
                    <Text style={{ fontSize: 19, fontWeight: "bold", color: "#fff" }}>End</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Timer

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
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
        fontSize: 17,
        padding: 10,
        paddingRight: 19,
        fontWeight: "bold",
        color: "rgba(128,128,128,0.75)",
        textAlign: "center"
    },
    timer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    timeUnit: {
        backgroundColor: "red",
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        color: "white",
    },
    timeSeparator: {
        color: '#fff',
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 8,
        marginTop: 'auto',
        marginBottom: 15
    },
    timetitle: {
        fontSize: 17,
        padding: 10,
        paddingRight: 19,
        fontWeight: "bold",
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 10
    },
    alarmBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b804d1de',
        borderRadius: 50,
        width: 70,
        height: 70,
        elevation: 2,
    },
    timeIsUp: {
        height: '40%',
        width: '90%',
        backgroundColor: '#b804d1de',
        borderRadius: 18,
        position: 'absolute',
        top:'33%',
        bottom:'33%',
        alignItems: 'center',
        justifyContent: 'center',
       
        marginLeft:20,
        marginRight:20,
    },
    timeIsUpText: {
        color:'#fff',
        fontSize:35,
        fontWeight:'bold',    
    },
    timeIsUpBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 20,
        width: '50%',
        padding:20,
        marginTop:20,
        elevation: 2,
    },
    timeIsUpBtnText: {
        fontSize:25,
        fontWeight:'bold',
        color:'#fff'
    }
}); 