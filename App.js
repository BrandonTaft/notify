import { useState } from 'react';
import List from './src/components/List';
import Layout from './src/components/Layout';
import TimePicker from "./src/components/TimePicker";
import useFetch from './src/hooks/useFetch';
import Loader from './src/components/Loader'

export default function App() {
  const {isLoading, reminders, setRefresh, refresh} = useFetch()
  const [showPicker, setShowPicker] = useState(false);
  return (
    <Layout
      setShowPicker={setShowPicker}
    >
      {isLoading ? <Loader /> :
      <List reminders={reminders} onSucess={() => setRefresh(!refresh)}/>
  }
      <TimePicker
        setShowPicker={setShowPicker}
        showPicker={showPicker}
      />
    </Layout>
  );
}