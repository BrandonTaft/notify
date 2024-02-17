import { useRef, useCallback, useState } from "react";
import { View, StyleSheet, DrawerLayoutAndroid } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Header from "./Header";
import Menu from "./Menu";

export default function Layout({ setShowPicker, children }) {
    const [refresh, setRefresh] = useState(false);
    const drawer = useRef(null);
    const [fontsLoaded] = useFonts({
        'Rubik-Black': require('../../assets/fonts/Rubik-Black.ttf'),
        'Rubik-Bold': require('../../assets/fonts/Rubik-ExtraBold.ttf'),
        'Rubik-Medium': require('../../assets/fonts/Rubik-Medium.ttf'),
        'Rubik-Light': require('../../assets/fonts/Rubik-Light.ttf'),
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
            refresh={refresh}
            setRefresh={setRefresh}
            setShowPicker={setShowPicker}
            close={() => drawer.current.closeDrawer()}
        />
    );

    return (
        <SafeAreaProvider>
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={navigationView}
            drawerBackgroundColor="rgba(21,19,29,0.75)"
            onDrawerOpen={() => setRefresh(!refresh)}
        >
            <View style={styles.container}>
                <Header open={() => drawer.current.openDrawer()} />
                <View style={styles.listContainer}>
                    {children}
                </View>
            </View>
            <StatusBar />
        </DrawerLayoutAndroid>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#15131d',
        position: 'relative',
        flex: 1,
    },
    listContainer: {
        flex: 10,
        justifyContent: 'center',
    },
});