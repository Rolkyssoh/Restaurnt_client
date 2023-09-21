import {StyleSheet} from 'react-native';

export default StyleSheet.create({
viewContainer:{
    flexDirection:'row',
    margin: 10,
    overflow:'hidden'
  },
  image: {
    height: 101, 
    aspectRatio: 1, 
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius:7,
    marginRight:-1
  },
  itemCliquable:{
    width:'69%',
    backgroundColor:'#fff',
    height:115,
    borderBottomLeftRadius:22,
    borderTopRightRadius:20,
    borderBottomRightRadius:7
  },
  container: {
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    // borderColor: 'lightgrey',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  name: {fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5, color: '#000'},
  description: {color: 'gray', marginVertical: 3, marginHorizontal: 2},
  price: {fontSize: 16, color: '#000', fontWeight:'300'},
  quantity: {
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-end',
    marginHorizontal: 5,
  },
});
