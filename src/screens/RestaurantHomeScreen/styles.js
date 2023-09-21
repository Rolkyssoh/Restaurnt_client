import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor:'whitesmoke'},
  iconContainer: {
    position: 'absolute',
    top: 15,
    left: 25,
    height:45,
    width:45,
    borderRadius:25,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems:'center'
  },
  image: {
    width: '100%',
    aspectRatio: 5 / 2.5,
    borderBottomLeftRadius:150
  },
  headerContentContainer: {
    paddingHorizontal: 10,
  },
  name: {fontSize: 30, fontWeight: '600', marginTop: 5, color: '#000'},
  searBarContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    borderWidth: 0,
    borderTopColor: 'lightgrey',
    borderTopWidth: 0,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0,
    borderRadius:30,
    marginTop: 20,
  },
  rating:{
    flexDirection:'row',
    alignItems:'center',
    marginRight:15
  },
  fee: {
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#249689',
    paddingHorizontal:15,
    marginHorizontal:15,
    borderRadius:20,
    flexDirection:'row'
  },
  textDeliveryStyle:{
    color:'#fff', 
    marginLeft:5, 
    fontSize:12, 
    fontWeight:'300'
  },
  time: {
    height:30,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:10,
    borderRadius:20,
    backgroundColor:'#249689',
  },
  nav:{
    height:20,
    backgroundColor:'grey',
    marginTop:20,
    marginBottom:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25,
    backgroundColor:'#249689',
    width:'50%',
    alignSelf:'center'
  },
  menuTitle: {
    marginVertical: 15,
    fontSize: 18,
    letterSpacing: 0.7,
    color: '#000',
  },
  buttonContainer: {
    paddingTop:5
  },
  button: {
    backgroundColor:'#249689',
    height:70,
    borderTopRightRadius:60
  },
});
