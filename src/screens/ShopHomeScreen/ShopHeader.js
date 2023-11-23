import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Divider, Image, SearchBar} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from '../RestaurantHomeScreen/styles';
import AWS from 'aws-sdk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  REACT_APP_S3_ACCESS_KEY_ID,
  REACT_APP_S3_SECRET_ACCESS_KEY,
  S3_BUCKET,
  S3_BUCKET_ITEM,
  REGION,
} from '@env';
import { useAuthContext } from '../../contexts/AuthContext';
import { API, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../../graphql/mutations';

AWS.config.update({
  accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
});

const ShopHeader = ({shop, searchTerm, setTerm}) => {
  const s3 = new AWS.S3();
  const { dbUser, setDbUser } = useAuthContext()
  const [shopPicture, setShopPicture] = useState();
  const [isFavorite, setIsFavorite] = useState()
  const [arrayOfFavorite, setArrayOfFavorite] = useState(dbUser.favouriteRestaurants)

  useEffect(() => {
    if (shop) {
      const params = {
        Bucket: S3_BUCKET_ITEM,
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
  }, [shop, arrayOfFavorite]);


  const doHandleFavorite = async (action) => {
    setIsFavorite(!isFavorite)
    if(action==='add'){
      /**Add structure to my favorite */
      const updated = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            _version: dbUser._version,
            favouriteRestaurants: [shop.id, ...arrayOfFavorite],
            id: dbUser.id,
          },
        }),
      );
      setDbUser(updated.data.updateUser)
      setArrayOfFavorite(updated.data.updateUser.favouriteRestaurants)
    } else if(action==='remove'){
      /**Remove structure to my favorite */
      const removed = arrayOfFavorite.filter((favorite) => favorite != shop.id)
      const updated = await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            _version: dbUser._version,
            favouriteRestaurants: removed,
            id: dbUser.id,
          },
        }),
      );
      setDbUser(updated.data.updateUser)
      setArrayOfFavorite(updated.data.updateUser.favouriteRestaurants)
    }
  }

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'#249689', borderBottomLeftRadius:135,   elevation: 20, shadowColor: '#249689',}}>
        <Image source={{uri: shopPicture}} style={styles.image} />
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
            onPress={() => doHandleFavorite('remove')}
          /> :
          <Ionicons
            name="bookmark-outline"
            size={25}
            color="#000"
            onPress={() => doHandleFavorite('add')}
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
