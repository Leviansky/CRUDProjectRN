import { StyleSheet, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  button: {
    backgroundColor: '#007bff',
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default styles;