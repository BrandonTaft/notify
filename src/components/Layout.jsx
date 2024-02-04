import { useRef } from "react";
import { View, StyleSheet, DrawerLayoutAndroid } from "react-native";
import Header from "./Header";
import Menu from "./Menu";

export default function Layout({ setShowPicker, children }) {
    const drawer = useRef(null);
    const navigationView = () => (
        <Menu
            setShowPicker={setShowPicker}
            close={() => drawer.current.closeDrawer()}
        />
    );

    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={300}
            drawerPosition={'left'}
            renderNavigationView={navigationView}
            drawerBackgroundColor="rgba(21,19,29,0.75)"
        >
            <View style={styles.container}>
                <Header open={() => drawer.current.openDrawer()} />
                <View style={styles.listContainer}>
                    {children}
                </View>
            </View>

        </DrawerLayoutAndroid>
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