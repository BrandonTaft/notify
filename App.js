import Login from './src/screens/Login';
import Chat from './src/screens/Chat';
import Messaging from './src/screens/Messaging';
import Home from './src/screens/Home';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen
                    name='Login'
                    component={Login}
                />

                <Stack.Screen
                    name='Home'
                    component={Home}
                    initialParams={{ itemId: 42 }}
                />

                <Stack.Screen
                    name='Chat'
                    component={Chat}
                    options={{
                        headerShown: true,
                        headerTitle: ""
                    }}
                />
                <Stack.Screen
                    name='Messaging'
                    component={Messaging}
                    options={{
                        headerShown: true,
                        headerTitle: ""
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    );
}