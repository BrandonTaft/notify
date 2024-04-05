import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import Root from './src/Root';

export default function App() {
    return (
        <Provider store={store} >
            <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Root />
                </GestureHandlerRootView>
            </SafeAreaProvider>
        </Provider>
    );
};