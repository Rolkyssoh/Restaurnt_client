import {View, StyleSheet, Pressable} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {Image, Text} from '@rneui/base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {Divider} from '@rneui/themed';
import AWS from 'aws-sdk';
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

const RestaurantItem = ({restaurant}) => {
  const navigation = useNavigation();
  const [structurePicture, setStructurePicture] = useState();
  const s3 = new AWS.S3();

  useEffect(() => {
    if (restaurant.image) {
      const params = {
        Bucket: S3_BUCKET,
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
      style={styles.restaurantItemContainer}
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
                size={20}
                color="yellowgreen"
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
              <Fontisto name="clock" size={20} color="yellowgreen" />
              <Text style={{color: '#000', fontSize: 10}}>
                {restaurant.minDeliveryTime} - {restaurant.maxDeliveryTime} min
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rating}>
          <Text style={{fontSize: 11, fontWeight: 'bold'}}>
            {restaurant.rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(RestaurantItem);

const styles = StyleSheet.create({
  restaurantItemContainer: {
    padding: 4,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 15,

    borderWidth: 1,
    borderColor: '#adff29',
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
    backgroundColor: 'lightgrey',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
