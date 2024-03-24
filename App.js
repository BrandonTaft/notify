import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Root from './src/Root';

export default function App() {
    return (
        <Provider store={store} >
            <SafeAreaProvider>
                <StatusBar />
                <Root />
            </SafeAreaProvider>
        </Provider>
    );
}