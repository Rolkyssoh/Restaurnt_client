import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDishContext} from '../../contexts/DishContext';
import {useBasketContext} from '../../contexts/BasketContext';
import {useNavigation} from '@react-navigation/native';

export const BasketDishItem = ({basketDish}) => {
  const {onMinus, onPlus, setQuantity} = useDishContext();
  const {basketDishes, addDishToBasket} = useBasketContext();
  const navigation = useNavigation();

  const [qtyIncreased, setQtyIncreased] = useState(0);
  const [qtyDecreased, setQtyDecreased] = useState(0);

  const increaseNumberOfDishes = async id => {
    const basketDish = basketDishes.find(_ => _.Dish.id === id);
    console.log('in stock:', basketDish.quantity);
    if (!basketDish) throw new Error('Dish not found');
    const quantity = qtyIncreased ? qtyIncreased + 1 : basketDish.quantity + 1;
    console.log({quantity, qtyIncreased, basketDish});
    addDishToBasket(basketDish.Dish, quantity);
    setQtyIncreased(quantity);
    await Promise.resolve();
  };

  const decreaseNumberOfDishes = async id => {
    const theBasketDish = basketDishes.find(_ => _.Dish.id === id);
    if (!theBasketDish) throw new Error('Dish not found!');
    // let quantity;
    // if (qtyDecreased) {
    //   if (qtyDecreased >= 1) quantity = qtyDecreased - 1;
    // } else if (theBasketDish.quantity >= 1)
    //   quantity = theBasketDish.quantity - 1;
    const quantity = qtyIncreased
      ? qtyIncreased - 1
      : theBasketDish.quantity - 1;
    console.log('quantity removed:', quantity);
    if (quantity >= 0) addDishToBasket(theBasketDish.Dish, quantity);
    if (basketDishes.length === 1) {
      if (quantity === 0) {
        navigation.goBack();
      }
    }
    setQtyIncreased(quantity);
    await Promise.resolve();
  };

  return (
    <>
      {basketDish.quantity > 0 && (
        <View style={styles.container}>
          <AntDesign
            name="pluscircleo"
            size={25}
            color="#3fc060"
            onPress={() => increaseNumberOfDishes(basketDish.Dish.id)}
            style={{marginRight: 5}}
          />
          <View style={styles.quantityContainer}>
            <Text>{basketDish.quantity}</Text>
          </View>
          <Text style={styles.dishName}>{basketDish.Dish.name}</Text>
          <Text
            style={{
              marginLeft: 'auto',
              color: '#000',
              paddingLeft: 2,
            }}>
            ${basketDish.Dish?.price}
          </Text>
          <AntDesign
            name="minuscircleo"
            size={25}
            color="red"
            onPress={() => decreaseNumberOfDishes(basketDish.Dish.id)}
            style={{marginLeft: 5}}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  dishName: {
    fontWeight: '600',
    color: '#000',
    fontFamily: 'Nunito-Bold',
    flexWrap: 'wrap',
    paddingHorizontal: 2,
    marginHorizontal: 5,
  },
  quantityContainer: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
});
