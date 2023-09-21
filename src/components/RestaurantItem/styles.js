import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  structureItemContainer: {
    padding: 4,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 15,

    borderWidth: 1,
    borderColor: '#249689',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 2,
    // borderRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  name: {fontSize: 18, fontWeight: 'bold', marginBottom: 5},
  fee: {color: 'grey', alignItems: 'center'},
  time: {color: 'grey', alignItems: 'center'},
  rating: {
    marginLeft: 'auto',
    backgroundColor: '#FF5963',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
