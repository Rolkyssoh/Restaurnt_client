import {View, Text} from 'react-native';
import React from 'react';
import {Divider, Image, SearchBar} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import styles from '../RestaurantHomeScreen/styles';

const ShopHeader = ({shop, searchTerm, setTerm}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: shop?.image}} style={styles.image} />
      <View style={styles.headerContentContainer}>
        <Text style={styles.name}>{shop?.name}</Text>
        <View style={styles.subtitleCotainer}>
          <View style={styles.contentSubtitle}>
            <MaterialIcons name="delivery-dining" size={20} color="grey" />
            <Text style={styles.fee}>{shop?.deliveryFee.toFixed(1)} MAD</Text>
          </View>
          <View style={styles.contentSubtitle}>
            <Fontisto name="clock" size={20} color="grey" />
            <Text style={styles.time}>
              {shop?.minDeliveryTime}-{shop?.maxDeliveryTime} min
            </Text>
          </View>
        </View>
        <SearchBar
          placeholder="Que recherchez vous?"
          containerStyle={styles.searBarContainer}
          inputContainerStyle={{height: 30, backgroundColor: 'lightgrey'}}
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
