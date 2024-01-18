import { useRef, useState, useCallback } from "react";
import { Pressable, View, Text, StyleSheet, DrawerLayoutAndroid, ScrollView } from "react-native";



import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Header from "./Header";
import TimePicker from "./TimePicker";
import Menu from "./Menu";

export default function Layout({
    reminders,
    onSucess,
    children
}) {
    const [showPicker, setShowPicker] = useState(false);
    const drawer = useRef(null);
    const [fontsLoaded] = useFonts({
        'Rubik-Black': require('../../assets/fonts/Rubik-Black.ttf'),
        'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const navigationView = () => (
        <Menu 
        reminders={reminders}
        onSucess={onSucess}
        setShowPicker={setShowPicker}
        showPicker={showPicker}
        />
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={navigationView}
            drawerBackgroundColor="rgba(0,0,0,0.75)"
        >
            <View style={styles.container}>
                <Header open={() => drawer.current.openDrawer()}/>
                <View style={styles.listContainer}>
                    {children}

                    <TimePicker
                        setShowPicker={setShowPicker}
                        showPicker={showPicker}
                        close={() => drawer.current.closeDrawer()}
                    />

                </View>
            </View>

        </DrawerLayoutAndroid>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        position: 'relative',
        flex: 1
    },
    listContainer: {
        flex: 10,
        justifyContent: 'center',

    },
});