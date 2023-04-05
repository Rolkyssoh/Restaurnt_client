import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Divider, Image, SearchBar} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from '../RestaurantHomeScreen/styles';
import AWS from 'aws-sdk';

const S3_BUCKET = 'la-tchop-test-2-encours132818-staging';
const REGION = 'us-east-1';

AWS.config.update({
  accessKeyId: 'AKIAXPDYJX65M2ZLEVFP',
  secretAccessKey: '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',
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
      <Image source={{uri: shopPicture}} style={styles.image} />
      <View style={styles.headerContentContainer}>
        <Text style={styles.name}>{shop?.name}</Text>
        <View style={styles.subtitleCotainer}>
          <View style={styles.contentSubtitle}>
            <MaterialIcons
              name="delivery-dining"
              size={20}
              color="yellowgreen"
            />
            <Text style={styles.fee}>{shop?.deliveryFee.toFixed(1)} MAD</Text>
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
              {shop?.minDeliveryTime}-{shop?.maxDeliveryTime} min
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
        <Text style={styles.menuTitle}>Produit(s)</Text>
      </View>
      <Divider color="lightgrey" width={1} />
    </View>
  );
};

export default ShopHeader;
