import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const useAlarmSound = () => {
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    // async function loadSound() {
    //     const { sound } = await Audio.Sound.createAsync(
    //         require('../../assets/alarm.wav')
    //     );
    //     setSound(sound);
    // }

    // const playSound = async() => {
    //     if (!sound) {
    //       await loadSound()
    //     }
    //     // console.log(await sound.getStatusAsync());
    //     if(!isPlaying){
    
    //     console.log('Playing Sound');
    //     await sound.playAsync();
    //     }
    //     else{
    //       await sound.stopAsync();
    //     }
    //     setIsPlaying(prev=>!prev)
    //   }

    // useEffect(() => {
    //     loadSound()
    // }, [])
    
    // useEffect(() => {
    //     return sound
    //       ? () => {
    //           console.log('Unloading Sound');
    //           sound.unloadAsync();
    //         }
    //       : undefined;
    //   }, [sound]);
    //   return { playSound }
    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(require('../../assets/alarm.wav')
        );
        setSound(sound);
        await sound.playAsync();
    };

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);
    return { playSound, setSound }
};

export default useAlarmSound