import {View, StyleSheet, Pressable} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {Image, Text} from '@rneui/base';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Divider} from '@rneui/themed';
import AWS from 'aws-sdk';
import {
  REACT_APP_S3_ACCESS_KEY_ID,
  REACT_APP_S3_SECRET_ACCESS_KEY,
  S3_BUCKET,
  S3_BUCKET_ITEM,
  REGION,
} from '@env';
import styles from './styles'

AWS.config.update({
  accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
});

const RestaurantItem = ({restaurant}) => {
  const navigation = useNavigation();
  const [structurePicture, setStructurePicture] = useState();
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
          setStructurePicture(data.toString());
        }
      });
    }
  }, [restaurant.image]);

  return (
    <Pressable
      style={styles.structureItemContainer}
      onPress={() => navigation.navigate('Restaurant', {id: restaurant.id})}>
      <Image source={{uri: structurePicture}} style={styles.image} />

      <View style={styles.row}>
        <View>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 3,
            }}>
            {/* DeliveryFee */}
            <View style={styles.fee}>
              <MaterialIcons
                name="delivery-dining"
                size={15}
                color="#FF5963"
              />
              <Text style={{color: '#000', fontSize: 10}}>
                {restaurant.deliveryFee?.toFixed(1)} MAD{' '}
              </Text>
            </View>
            <Divider
              color="lightgrey"
              width={1}
              orientation="vertical"
              style={{marginHorizontal: 10}}
            />
            {/* DiliveryTime */}
            <View style={styles.time}>
              <SimpleLineIcons name="clock" size={15} color="#FF5963" />
              <Text style={{color: '#000', fontSize: 10}}>
                {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} min
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rating}>
          <Text style={{fontSize: 11, fontWeight: 'bold', color:'#fff'}}>
            {restaurant.rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(RestaurantItem);