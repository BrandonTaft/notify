import { useState, useEffect } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import useAlarmSound from '../hooks/useAlarmSound';
import { FontAwesome } from '@expo/vector-icons';

export default function Timer({ setShowTimer, stopTime }) {
    const { playSound, setSound } = useAlarmSound();
    const [started, setStarted] = useState(false);
    const [timeIsUp, setTimeIsUp] = useState(false)
    const [difference, setDifference] = useState(0);
    const [timeUnits, setTimeUnits] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        var d = new Date();
        if (stopTime) {
            setDifference((stopTime.getTime() - d.setHours(0, 0, 0, 0)) / 10)
        } else {
            setDifference(1)
        };
    }, [stopTime]);

    useEffect(() => {
        if (difference < 0) {
            setTimeIsUp(true)
            playSound()
            const timerAudio = setInterval(() => {
                setTimeIsUp(true)
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
            {timeIsUp ?
                <>
                    <View style={styles.timer}>
                        <Text style={styles.title}>
                            TIME IS UP
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: '#312e3f',
                                    borderless: true,
                                    foreground: false
                                }
                            }
                            style={[styles.alarmBtn, styles.timeIsUpBtn]}
                            onPress={() => {
                                setSound()
                                setStarted(false)
                                setTimeIsUp(false)
                                setShowTimer(false)
                            }}
                        >
                            <Text style={styles.timeIsUpBtnText}>
                                End
                            </Text>
                        </Pressable>
                    </View>
                </>
                :
                <>
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
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: "#312e3f",
                                    borderless: true,
                                    foreground: false
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
                        <Pressable
                            android_ripple={
                                RippleConfig = {
                                    color: "#312e3f",
                                    borderless: true,
                                    foreground: false
                                }
                            }
                            style={styles.alarmBtn}
                            onPress={() => {
                                setSound()
                                setStarted(false)
                                setTimeIsUp(false)
                                setShowTimer(false)
                            }}
                        >
                            <Text style={styles.btnText}>
                                End
                            </Text>
                        </Pressable>
                    </View>
                </>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingBottom: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#312e3f',
        margin: 25,
        borderRadius: 33
    },
    subtitle: {
        fontSize: 17,
        padding: 10,
        paddingRight: 19,
        fontWeight: "bold",
        color: "grey",
        textAlign: "center",
        marginLeft: 10
    },
    timer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    timeUnit: {
        backgroundColor: "#f0edf3",
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        color: "#000",
    },
    timeSeparator: {
        color: '#fff',
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 8,
        marginTop: 'auto',
        marginBottom: 15
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
        backgroundColor: '#8789f7',
        borderRadius: 50,
        width: 70,
        height: 70,
        elevation: 5,
    },
    title: {
        color: '#fff',
        fontSize: 36,
        fontWeight: 'bold',
        margin:14,
    },
    timeIsUpBtn: {
        width:100,
        height:50
    },
    timeIsUpBtnText: {
        fontSize:22,
        fontWeight: 'bold',
        color: '#fff'
    },
    btnText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
}); 