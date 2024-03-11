import { useState } from 'react';
import List from '../components/List';
import Layout from '../components/Layout';
import TimePicker from "../components/TimePicker";
import useFetch from '../hooks/useFetch';
import Loader from '../components/Loader';

const Home = ({ route, navigation }) => {
    const { isLoading, reminders, setRefresh, refresh } = useFetch()
    const [showPicker, setShowPicker] = useState(false);
    console.log("PARAMS", route.params)
    return (
        <Layout
            setShowPicker={setShowPicker}
            reminders={reminders}
            onSuccess={() => setRefresh(!refresh)}
        >
            {isLoading ? <Loader /> :
                <List
                    reminders={reminders}
                    onSuccess={() => setRefresh(!refresh)}
                    navigation={navigation}
                />
            }
            <TimePicker
                setShowPicker={setShowPicker}
                showPicker={showPicker}
            />
        </Layout>
    )
}

export default Home