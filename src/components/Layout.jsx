import { useRef } from "react";
import { View, StyleSheet, DrawerLayoutAndroid } from "react-native";
import Header from "./Header";
import Menu from "./Menu";

export default function Layout({
    reminders,
    onSucess,
    setShowPicker,
    children
}) {

    const drawer = useRef(null);
    
    const navigationView = () => (
        <Menu
            reminders={reminders}
            onSucess={onSucess}
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
            drawerBackgroundColor="rgba(0,0,0,0.75)"
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
        backgroundColor: '#000',
        position: 'relative',
        flex: 1,
    },
    listContainer: {
        flex: 10,
        justifyContent: 'center',
    },
});