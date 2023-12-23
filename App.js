import { StyleSheet, View, StatusBar, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from './src/components/Loader';
import List from './src/components/List';
import useFetch from './src/components/useFetch';
import Header from './src/components/Header';


export default function App() {
  const { isLoading, reminders, setRefresh, refresh } = useFetch();
  return (
    <SafeAreaProvider>
      {isLoading ? <Loader /> :
        <Header reminders={reminders}>
            <List
              reminders={reminders}
              onSucess={() => setRefresh(!refresh)}
            />
          <StatusBar backgroundColor='#b804d1de' />
        </Header>
      }
    </SafeAreaProvider>
  );
}