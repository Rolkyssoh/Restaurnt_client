import {View, Text} from 'react-native';
import React from 'react';
import styles from './styles';
import {Image} from '@rneui/base';
import {Divider} from '@rneui/themed';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Header = ({restaurant}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: restaurant.image}} style={styles.image} />
      <View style={styles.headerContentContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.subtitleCotainer}>
          <View style={styles.contentSubtitle}>
            <Fontisto name="clock" size={15} color="grey" />
            <Text style={styles.fee}>
              {restaurant.deliveryFee.toFixed(1)} MAD
            </Text>
          </View>
          <View style={styles.contentSubtitle}>
            <Fontisto name="clock" size={15} color="grey" />
            <Text style={styles.time}>
              {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} min
            </Text>
          </View>
        </View>
        <Text style={styles.menuTitle}>Menu</Text>
      </View>
      <Divider color="lightgrey" width={1} />
    </View>
  );
};

export default Header;
