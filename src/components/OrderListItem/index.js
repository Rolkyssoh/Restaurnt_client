import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {OrderDish} from '../../models';

dayjs.extend(relativeTime);

export const OrderListItem = ({order}) => {
  const navigation = useNavigation();

  const [totalQty, setTotalQty] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  // const OrderStatus = {
  //   NEW: 'NEW',
  //   COOKING: 'COOKING',
  //   READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  //   PICKED_UP: 'PICKED_UP',
  //   COMPLETED: 'COMPLETED',
  //   ACCEPTED: 'ACCEPTED',
  // };

  useEffect(() => {
    console.log({order});
    if (order.orderDishes !== null) {
      const theTotalQty = order.OrderDishes.items.reduce(
        (sum, orderDish) => sum + orderDish.quantity,
        0,
      );
      const theTotalPrice = order.OrderDishes.items.reduce(
        (sum, orderDish) =>
          orderDish.Dish
            ? sum + orderDish.quantity * orderDish.Dish.price
            : orderDish.Ingredient
            ? sum + orderDish.quantity * orderDish.Ingredient.price
            : null,
        order.Structure.deliveryFee,
      );
      setTotalQty(theTotalQty);
      setTotalPrice(theTotalPrice);
    }
  }, [order]);

  // useEffect(() => {}, [totalPrice]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Order', {id: order.id})}>
      <Image source={{uri: order.Structure?.image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{order.Structure?.name}</Text>
        <Text style={{marginVertical: 5, color: '#000'}}>
          {`${
            order.Structure.type === 'RESTAURANT'
              ? totalQty + ' items'
              : totalQty?.toFixed(1) + ' g'
          }`}
          &#8226; {totalPrice?.toFixed(2)} MAD
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#000'}}>
            {dayjs(order.createdAt).fromNow(true)} &#8226;{' '}
          </Text>
          {order.status === 'NEW' && (
            <Text style={{color: 'green', fontWeight: 'bold'}}>
              {order.status}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 80,

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
    aspectRatio: 1,
    height: '101%',
  },
  detailsContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    flex: 1,
    height: '100%',
  },
  name: {fontWeight: 'bold', fontSize: 16, color: '#000'},
});
