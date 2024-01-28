import { Modal, StyleSheet, View, Pressable, Text } from 'react-native';

function Alarm({
  notification,
  setSound,
  showAlarm,
  setShowAlarm
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showAlarm}
      style={styles.alarmContainer}
      onRequestClose={() => {
        setShowAlarm(!showAlarm);
      }}>
      <View style={styles.alarm}>
        <Text numberOfLines={3} style={styles.alarmText}>
          {notification}
        </Text>
        <Pressable android_ripple={
          RippleConfig = {
            color: "#b804d1de",
            borderless: false,
            foreground: false
          }
        }
          style={styles.alarmBtn}
          onPress={() => {
            setSound()
            setShowAlarm(false)
          }}
        >
          <Text style={styles.alarmBtnText}>
            COMPLETE
          </Text>
        </Pressable>
      </View>
    </Modal>
  )
}
export default Alarm

const styles = StyleSheet.create({
  alarmContainer: {
    flex: 1
  },
  alarm: {
    backgroundColor: '#00030ae0',
    flex: .25,
    margin: 20,
    borderRadius: 20,
    marginTop: 'auto',
    marginBottom: 'auto',
    justifyContent: 'space-evenly',
    padding: 10,
    alignItems: 'center',
  },
  alarmText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
  alarmBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#b804d1de',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14
  },
  alarmBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
})