import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useDishContext} from '../../contexts/DishContext';
import {useBasketContext} from '../../contexts/BasketContext';

export const DishListItem = ({dish}) => {
  const navigation = useNavigation();
  const {quantity} = useDishContext();
  const {basketDishes, basket} = useBasketContext();

  const [dishQty, setDishQty] = useState(0);

  useEffect(() => {
    if (basket === null) setDishQty(0);
  }, [basket]);

  useEffect(() => {
    console.log({basketDishes});
    basketDishes.map(_ => {
      if (_.Dish.id == dish.id) {
        console.log('dans le if!! DishListItem');
        setDishQty(_.quantity);
      }
      console.log({_});
    });
  }, [basketDishes, quantity]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Dish', {id: dish.id})}>
      <View style={{flex: 1}}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {dish.description}
        </Text>
        <Text style={styles.price}>${dish.price}</Text>
        {dishQty != 0 && <Text style={styles.quantity}>{dishQty}x</Text>}
      </View>
      <Image
        source={{uri: dish.image}}
        style={styles.image}
        resizeMode="cover"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 10,
    paddingLeft: 5,
    margin: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  name: {fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5, color: '#000'},
  description: {color: 'gray', marginVertical: 5, marginHorizontal: 2},
  price: {fontSize: 16, color: '#000'},
  quantity: {
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-end',
    marginHorizontal: 5,
  },
  image: {height: 101, aspectRatio: 1},
});
