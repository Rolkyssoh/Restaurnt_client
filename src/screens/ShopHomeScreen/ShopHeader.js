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
  REGION,
} from '@env';

AWS.config.update({
  accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
});

const ShopHeader = ({shop, searchTerm, setTerm}) => {
  const [shopPicture, setShopPicture] = useState();
  const s3 = new AWS.S3();

  useEffect(() => {
    if (shop) {
      const params = {
        Bucket: S3_BUCKET,
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
          <Ionicons
            name="bookmark"
            size={20}
            color="#000"
          />
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
