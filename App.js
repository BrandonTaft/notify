import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from './src/components/Loader';
import List from './src/components/List';
import Layout from './src/components/Layout';
import Alarm from './src/components/Alarm';
import useFetch from './src/hooks/useFetch';


export default function App() {
  const { isLoading, reminders, setRefresh, refresh } = useFetch();

  return (
    <SafeAreaProvider>
      {isLoading
        ?
        <Loader />
        :
        <Layout
          reminders={reminders}
          onSucess={() => setRefresh(!refresh)}
        >
          <List
            reminders={reminders}
            onSucess={() => setRefresh(!refresh)}
          />
          <Alarm />
          <StatusBar backgroundColor='#b804d1de' />
        </Layout>
      }
    </SafeAreaProvider>
  );
}