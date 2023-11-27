import React, {memo, useEffect, useState} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Image, Text} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {Divider} from '@rneui/themed';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AWS from 'aws-sdk';
import Config from 'react-native-config'
import styles from '../../RestaurantItem/styles'

AWS.config.update({
  accessKeyId: Config.REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: Config.REACT_APP_S3_SECRET_ACCESS_KEY,
});

const ShopItem = ({shop}) => {
  const navigation = useNavigation();
  const s3 = new AWS.S3();

  const onPress = () => {
    navigation.navigate('Shop', {ShopId: shop.id});
  };

  return (
    <Pressable onPress={onPress} style={styles.structureItemContainer}>
      <Image source={{uri: shop.image_url}} style={styles.image} />
      <View style={styles.row}>
        <View>
          <Text style={styles.name}>{shop.name}</Text>
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
                {shop.deliveryFee.toFixed(1)} MAD
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
              <Fontisto name="clock" size={15} color="#FF5963" />
              <Text style={{color: '#000', fontSize: 10}}>
                {shop.minDeliveryTime} - {shop.maxDeliveryTime} min
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rating}>
          <Text style={{fontSize: 11, fontWeight: 'bold', color:'#fff'}}>
            {shop.rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default memo(ShopItem);
