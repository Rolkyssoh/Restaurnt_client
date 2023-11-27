import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  constainerScreen: {
    height: '100%',
  },
  name: {fontSize: 30, fontWeight: '600', margin: 10, color: '#000'},
  description: {color: 'gray', marginBottom: 5, marginHorizontal: 10},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 50,
  },
  quantity: {fontSize: 25, marginHorizontal: 20, color: '#000'},
  buttonContainer: {
    marginTop: 'auto',
    borderTopRightRadius:18,
    borderTopLeftRadius:18
  },
  styleButton: {
    backgroundColor: '#FF5963',
    height:100
  },
});
