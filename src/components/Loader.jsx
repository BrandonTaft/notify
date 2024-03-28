import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';

export default function Loader() {

    return (
      <View  style={styles.container}>
        <Image
        source={require('../../assets/notify-icon.png')}
      />
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