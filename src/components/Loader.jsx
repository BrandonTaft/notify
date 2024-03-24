import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function Loader() {

    return (
      <View  style={styles.container}>
        <ActivityIndicator size={66} color="#b804d1de" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%"
    },
    spinner : {
      width: 44,
    }
  });