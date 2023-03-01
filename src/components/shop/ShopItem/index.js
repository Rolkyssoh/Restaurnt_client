import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {memo, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image} from '@rneui/themed';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ShopItem = ({shop}) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Shop', {ShopId: shop.id});
  };

  return (
    <Pressable onPress={onPress} style={styles.shopItemContainer}>
      <Image source={{uri: shop.image}} style={styles.image} />

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
              <MaterialIcons name="delivery-dining" size={20} color="grey" />
              <Text style={{color: '#000'}}>
                {shop.deliveryFee.toFixed(1)} MAD
              </Text>
            </View>
            {/* DiliveryTime */}
            <View style={styles.time}>
              <Fontisto name="clock" size={20} color="grey" />
              <Text style={{color: '#000'}}>
                {shop.minDeliveryTime} - {shop.maxDeliveryTime} min
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rating}>
          <Text style={{fontSize: 11, fontWeight: 'bold'}}>
            {shop.rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  shopItemContainer: {
    marginVertical: 8,
    padding: 4,
    borderRadius: 15,
    backgroundColor: '#fff',

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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  name: {fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#000'},
  fee: {color: 'grey', alignItems: 'center', marginRight: 25},
  time: {color: 'grey', alignItems: 'center'},
  rating: {
    marginLeft: 'auto',
    backgroundColor: 'lightgrey',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});

export default memo(ShopItem);
