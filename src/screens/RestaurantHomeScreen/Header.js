import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Image} from '@rneui/base';
import {Divider} from '@rneui/themed';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from '@rneui/themed';
import AWS from 'aws-sdk';
import {
  REACT_APP_S3_ACCESS_KEY_ID,
  REACT_APP_S3_SECRET_ACCESS_KEY, 
  S3_BUCKET,
  S3_BUCKET_ITEM,
  REGION,
} from '@env';

AWS.config.update({
  accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
});

const Header = ({restaurant, searchTerm, setTerm}) => {
  const [structureImg, setStructureImg] = useState();
  const s3 = new AWS.S3();

  useEffect(() => {
    if (restaurant.image) {
      const params = {
        Bucket: S3_BUCKET_ITEM,
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

  return (
    <View style={[styles.container]}>
      <View style={{backgroundColor:'#249689', borderBottomLeftRadius:135,   elevation: 20, shadowColor: '#249689',}}>
        <Image source={{uri: structureImg}} style={styles.image} />
      </View>
      <View style={styles.headerContentContainer}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
          <View>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={[styles.textDeliveryStyle, {color:'#000'}]}>Restaurant</Text>
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
