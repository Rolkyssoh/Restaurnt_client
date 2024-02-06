import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Divider, Image, SearchBar} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from '../RestaurantHomeScreen/styles';
import AWS from 'aws-sdk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Config from 'react-native-config'
import { useAuthContext } from '../../contexts/AuthContext';
import {generateClient} from 'aws-amplify/api';
import { updateUser } from '../../graphql/mutations';

AWS.config.update({
  accessKeyId: Config.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: Config.REACT_APP_S3_SECRET_ACCESS_KEY,
});

const ShopHeader = ({shop, searchTerm, setTerm}) => {
  const s3 = new AWS.S3();
  const client = generateClient();
  const { dbUser, setDbUser } = useAuthContext()
  const [shopPicture, setShopPicture] = useState();
  const [isFavorite, setIsFavorite] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const [arrayOfFavorite, setArrayOfFavorite] = useState(dbUser.favouriteRestaurants)

  useEffect(() => {
    /**Manage the display of favorite icon */
    if(shop){
      if(arrayOfFavorite && arrayOfFavorite.length >0){
          const isInclude = arrayOfFavorite.includes(shop.id)
          if(isInclude){
            setIsFavorite(true)
          } else {
            setIsFavorite(false)
          }
      } else {
        setIsFavorite(false)
      }
    }
  }, [arrayOfFavorite]);

  useEffect(() => {
    if (shop) {
      const params = {
        Bucket: Config.S3_BUCKET_ITEM,
        Key: `${shop.image}`,
      };
      s3.getSignedUrl('getObject', params, (err, data) => {
        if (err) {
          console.log('we have some error:', err, err.stack);
        } else {
          setShopPicture(data.toString());
        }
      });
    }
  }, [shop]);


  const doHandleFavoriteShop = async (action) => {
    setIsFavorite(!isFavorite)
    setIsLoading(true)
    if(action==='add'){
      /**Add structure to my favorite */
      let updated;
      if(arrayOfFavorite ===null || arrayOfFavorite.length ===0){
        updated = await client.graphql({
          query: updateUser,
          variables: {
            input: {
              favouriteRestaurants: [shop.id],
              id: dbUser.id,
            }
          }
        })
      }else if(arrayOfFavorite!=null && 
          arrayOfFavorite.length>0 &&
          arrayOfFavorite.find((_) => _.id === shop.id)==undefined)
      {
        updated = await client.graphql({
          query: updateUser,
          variables: {
            input: {
              favouriteRestaurants: [shop.id, ...arrayOfFavorite],
              id: dbUser.id,
            }
          }
        })
      } else {
        console.log('This shop is already in your favoris!!!')
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
      const removed = arrayOfFavorite.filter((favorite) => favorite != shop.id)
      const updated = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            favouriteRestaurants: removed,
            id: dbUser.id,
          }
        }
      });
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
    <View style={styles.container}>
      <View style={{backgroundColor:'#249689', borderBottomLeftRadius:135,   elevation: 20, shadowColor: '#249689',}}>
        <Image source={{uri: shop.image_url}} style={styles.image} />
      </View>
      <View style={styles.headerContentContainer}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View>
            <Text style={styles.name}>{shop?.name}</Text>
            <Text style={[styles.textDeliveryStyle, {color:'#000'}]}>Boutique</Text>
          </View>
           { isFavorite ? <Ionicons
            name="bookmark"
            size={25}
            color="#000"
            onPress={() => !isLoading && doHandleFavoriteShop('remove')}
          /> :
          <Ionicons
            name="bookmark-outline"
            size={25}
            color="#000"
            onPress={() => !isLoading && doHandleFavoriteShop('add')}
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
            <Text style={styles.textDeliveryStyle}>{shop?.deliveryFee.toFixed(1)} MAD</Text>
          </View>
          <View style={styles.time}>
            <Octicons
              name="clock"
              size={10}
              color="white"
            />
            <Text style={styles.textDeliveryStyle}>{shop?.minDeliveryTime}-{shop?.maxDeliveryTime}</Text>
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
        <View style={styles.nav}>
          <Text style={{color:'#fff', fontSize:10, fontWeight:'bold'}}>MENU</Text>
        </View>
      </View>
      <Divider color="lightgrey" width={1} />
    </View>
  );
};

export default ShopHeader;
