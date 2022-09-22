import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import dishes from '../../../assets/data/dashboard/dishes.json';

const dish = dishes[0];

export const BasketDishItem = () => {
  return (
    <View style={styles.container}>
      <View style={styles.quantityContainer}>
        <Text>{dish.quantity}</Text>
      </View>
      <Text
        style={{fontWeight: '600', color: '#000', fontFamily: 'Nunito-Bold'}}>
        {dish.name}
      </Text>
      <Text style={{marginLeft: 'auto', color: '#000'}}>${dish.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  quantityContainer: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginRight: 10,
    borderRadius: 3,
  },
});
