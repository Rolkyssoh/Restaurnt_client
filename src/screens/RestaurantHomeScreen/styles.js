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
    aspectRatio: 5 / 2.5,
  },
  headerContentContainer: {
    paddingHorizontal: 10,
  },
  name: {fontSize: 30, fontWeight: '600', marginVertical: 5, color: '#000'},
  subtitleCotainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
  },
  searBarContainer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    borderTopColor: 'lightgrey',
    borderTopWidth: 0.5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
    marginTop: 10,
  },
  contentSubtitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fee: {color: '#000', fontSize: 10, alignSelf: 'flex-end'},
  time: {color: '#000', fontSize: 10, alignSelf: 'flex-end'},
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
