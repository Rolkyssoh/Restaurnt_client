import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1},
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 5 / 2,
  },
  headerContentContainer: {
    paddingHorizontal: 10,
  },
  name: {fontSize: 30, fontWeight: '600', marginVertical: 10, color: '#000'},
  subtitleCotainer: {flexDirection: 'row'},
  contentSubtitle: {alignItems: 'center'},
  fee: {color: '#525252', fontSize: 15, marginRight: 15},
  time: {color: '#525252', fontSize: 15},
  menuTitle: {
    marginVertical: 15,
    fontSize: 18,
    letterSpacing: 0.7,
    color: '#000',
  },
  buttonContainer: {
    margin: 10,
  },
  button: {
    backgroundColor: '#000',
  },
});
