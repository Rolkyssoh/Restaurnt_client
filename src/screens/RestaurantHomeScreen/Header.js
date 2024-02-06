import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Image} from '@rneui/base';
import {Divider} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from '@rneui/themed';
import AWS from 'aws-sdk';
import Config from 'react-native-config'
import {generateClient} from 'aws-amplify/api';
import { updateUser } from '../../graphql/mutations';
import { useAuthContext } from '../../contexts/AuthContext';

AWS.config.update({
  accessKeyId: Config.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: Config.REACT_APP_S3_SECRET_ACCESS_KEY,
});

const Header = ({restaurant, searchTerm, setTerm}) => {
  const s3 = new AWS.S3();
  const client = generateClient()
  const { dbUser, setDbUser } = useAuthContext()
  const [structureImg, setStructureImg] = useState();
  const [isFavorite, setIsFavorite] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [arrayOfFavorite, setArrayOfFavorite] = useState(dbUser.favouriteRestaurants)
  
  useEffect(() => {
    /**Manage the display of favorite icon */
    if(arrayOfFavorite && arrayOfFavorite.length >0){
        const isInclude = arrayOfFavorite.includes(restaurant.id)
        if(isInclude){
          setIsFavorite(true)
        } else {
          setIsFavorite(false)
        }
    } else {
      setIsFavorite(false)
    }
  },[arrayOfFavorite])

  useEffect(() => {
    /**Get the picture of the current restaurant */
    if (restaurant.image) {
      const params = {
        Bucket: Config.S3_BUCKET_ITEM,
        Key: `${restaurant.image}`,
      };
      s3.getSignedUrl('getObject', params, (err, data) => {
        if (err) {
          console.log('we have some error:', err, err.stack);
        } else {
          setStructureImg(data.toString());
        }
      });
    }
  }, [restaurant]);

  const doHandleFavorite = async (action) => {
    console.log('the current action:::', action)
    console.log('the current state of arrayOfFavorite:::', arrayOfFavorite)
    setIsFavorite(!isFavorite)
    setIsLoading(true)
    if(action==='add'){
      /**Add structure to my favorite */
      /**Here we make 2 checks
        1- first, check if arrayOfFavorite is empty or null
        2- second, check if the new elt we add don't exist already in the array
      */
      let updated
      if(arrayOfFavorite === null || arrayOfFavorite.length ===0){
        updated = await client.graphql({
          query: updateUser,
          variables: {
            input: {
              favouriteRestaurants: [restaurant.id],
              id: dbUser.id,
            }
          }
        })
      } else if(arrayOfFavorite != null && 
          arrayOfFavorite.length >0 && 
          arrayOfFavorite.find((_) => _.id === restaurant.id)==undefined)
      {
        updated = await client.graphql({
          query: updateUser,
          variables: {
            input: {
              favouriteRestaurants: [restaurant.id, ...arrayOfFavorite],
              id: dbUser.id,
            }
          }
        })
      } else{
        console.log('Existe déjà dans les favoris!!!')
        setIsLoading(false)
      }

      if(updated){
        setDbUser(updated.data.updateUser)
        setArrayOfFavorite(updated.data.updateUser.favouriteRestaurants)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    } else if(action==='remove'){
      /**Remove structure to my favorite */
      const removed = arrayOfFavorite.filter((favorite) => favorite != restaurant.id)
      const updated = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            favouriteRestaurants: removed,
            id: dbUser.id,
          }
        }
      })
      if(updated){
        setDbUser(updated.data.updateUser)
        setArrayOfFavorite(updated.data.updateUser.favouriteRestaurants)
        setIsLoading(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  return (
    <View style={[styles.container]}>
      <View style={{backgroundColor:'#249689', borderBottomLeftRadius:135,   elevation: 20, shadowColor: '#249689',}}>
        <Image source={{uri: restaurant.image_url}} style={styles.image} />
      </View>
      <View style={styles.headerContentContainer}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={[styles.textDeliveryStyle, {color:'#000'}]}>Restaurant</Text>
          </View>
          { isFavorite ? <Ionicons
            name="bookmark"
            size={25}
            color="#000"
            onPress={() => !isLoading ? doHandleFavorite('remove'): console.log("NOUVELLE SUPPRESSION EN COURS!!")}
          /> :
          <Ionicons
            name="bookmark-outline"
            size={25}
            color="#000"
            onPress={() => !isLoading ? doHandleFavorite('add'): console.log("NOUVELE AJOUT EN COURS!")}
          />}
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', marginTop:25}}>
          <View style={styles.rating}>
            <Ionicons
              name="star"
              size={10}
              color="#000"
            />
            <Ionicons
              name="star"
              size={10}
              color="#000"
            />
            <Ionicons
              name="star"
              size={10}
              color="#000"
            />
            <Ionicons
              name="star-half"
              size={10}
              color="#000"
            />
            <Ionicons
              name="star-outline"
              size={10}
              color="#000"
            />
            <Text style={{color:'#000', marginLeft:5}}>4.7</Text>
          </View>
          <View style={styles.fee}>
            <MaterialIcons
              name="location-pin"
              size={15}
              color="white"
            />
            <Text style={styles.textDeliveryStyle}>{restaurant.deliveryFee.toFixed(1)} MAD</Text>
          </View>
          <View style={styles.time}>
            <Octicons
              name="clock"
              size={10}
              color="white"
            />
            <Text style={styles.textDeliveryStyle}>{restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime}</Text>
          </View>
        </View>
        <SearchBar
          placeholder="Que recherchez vous?"
          containerStyle={styles.searBarContainer}
          inputContainerStyle={{
            height: 45,
            backgroundColor: '#fff',
            borderRadius: 15,
          }}
          value={searchTerm}
          onChangeText={val => setTerm(val)}
        />
        {/* <Text style={styles.menuTitle}>Menu</Text> */}
        <View style={styles.nav}>
          {/* <Pressable style={{backgroundColor:'#249689', height:'100%', width:'35%'}}>
            <Text style={{color:'#000'}}>Pour vous</Text>
          </Pressable>
          <Pressable style={{backgroundColor:'#249689', height:'100%', width:'30%'}}>
            <Text style={{color:'#000'}}>Promos</Text>
          </Pressable>
          <Pressable style={{backgroundColor:'#249689', height:'100%', width:'35%', alignSelf:'flex-end'}}>
            <Text style={{color:'#000'}}>Autres</Text>
          </Pressable> */}
          <Text style={{color:'#fff', fontSize:10, fontWeight:'bold'}}>MENU</Text>
        </View>
      </View>
      <Divider color="lightgrey" width={1} />
    </View>
  );
};

export default Header;
