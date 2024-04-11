import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Loader() {
const theme = useTheme();
    return (
      <View  style={[ styles.container, {backgroundColor: theme.colors.primary} ]}>
        <Image
        source={require('../../assets/notify-icon.png')}
      />
        <ActivityIndicator size={66} color="#b804d1de" />
      </View>
    );
    };
    
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: "100%"
    },
    spinner : {
      width: 44,
    }
  });