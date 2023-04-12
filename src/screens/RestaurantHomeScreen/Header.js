import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Image} from '@rneui/base';
import {Divider} from '@rneui/themed';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SearchBar} from '@rneui/themed';
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

const Header = ({restaurant, searchTerm, setTerm}) => {
  const [structureImg, setStructureImg] = useState();
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
          setStructureImg(data.toString());
        }
      });
    }
  }, [restaurant]);

  return (
    <View style={styles.container}>
      <Image source={{uri: structureImg}} style={styles.image} />
      <View style={styles.headerContentContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.subtitleCotainer}>
          <View style={styles.contentSubtitle}>
            <MaterialIcons
              name="delivery-dining"
              size={20}
              color="yellowgreen"
            />
            <Text style={styles.fee}>
              {restaurant.deliveryFee.toFixed(1)} MAD
            </Text>
          </View>
          <Divider
            color="lightgrey"
            width={1}
            orientation="vertical"
            style={{marginHorizontal: 12}}
          />
          <View style={styles.contentSubtitle}>
            <Fontisto name="clock" size={20} color="yellowgreen" />
            <Text style={styles.time}>
              {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} min
            </Text>
          </View>
        </View>
        <SearchBar
          placeholder="Que recherchez vous?"
          containerStyle={styles.searBarContainer}
          inputContainerStyle={{
            height: 32,
            backgroundColor: 'whitesmoke',
            borderRadius: 15,
          }}
          value={searchTerm}
          onChangeText={val => setTerm(val)}
        />
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
      <Divider color="lightgrey" width={1} />
    </View>
  );
};

export default Header;
