import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export const BasketDishItem = ({basketDish}) => {
  return (
    <View style={styles.container}>
      <View style={styles.quantityContainer}>
        <Text>{basketDish.quantity}</Text>
      </View>
      <Text
        style={{fontWeight: '600', color: '#000', fontFamily: 'Nunito-Bold'}}>
        {basketDish.Dish.name}
      </Text>
      <Text style={{marginLeft: 'auto', color: '#000'}}>
        ${basketDish.Dish.price}
      </Text>
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
