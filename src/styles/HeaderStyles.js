import { StyleSheet, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#007bff',
    padding: 20,
    paddingVertical: ScreenHeight * 0.05,
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default styles;