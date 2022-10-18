import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDishContext} from '../../contexts/DishContext';
import {useBasketContext} from '../../contexts/BasketContext';
import {useNavigation} from '@react-navigation/native';
import {useOrderContext} from '../../contexts/OrderContext';

export const BasketDishItem = ({basketDish}) => {
  const {onMinus, onPlus, setQuantity} = useDishContext();
  const {basketDishes, addDishToBasket} = useBasketContext();
  const {orders} = useOrderContext();
  const navigation = useNavigation();

  const [qtyIncreased, setQtyIncreased] = useState(0);
  const [showHandlerQtyBtn, setShowHandlerQtyBtn] = useState(true);

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
  console.log('details du basketDish:', basketDish);
  console.log('le orders dans basketDishItem:', orders);

  useEffect(() => {
    orders.map(_ => {
      console.log('order in map:', _);
      if (_.id === basketDish.orderID) {
        console.log('dish dans le order désormais!!!');
        setShowHandlerQtyBtn(false);
      }
    });
  }, [basketDish]);

  return (
    <>
      {basketDish.quantity > 0 && (
        <View style={styles.container}>
          {showHandlerQtyBtn && (
            <AntDesign
              name="pluscircleo"
              size={25}
              color="#3fc060"
              onPress={() => increaseNumberOfDishes(basketDish.Dish.id)}
              // style={{marginRight: 5}}
            />
          )}
          <View style={styles.quantityContainer}>
            <Text>{basketDish.quantity}</Text>
          </View>
          <Text style={styles.dishName}>{basketDish.Dish.name}</Text>
          <Text
            style={{
              marginLeft: 'auto',
              color: '#000',
              paddingLeft: 2,
              marginRight: 7,
            }}>
            ${basketDish.Dish?.price}
          </Text>
          {showHandlerQtyBtn && (
            <AntDesign
              name="minuscircleo"
              size={25}
              color="red"
              onPress={() => decreaseNumberOfDishes(basketDish.Dish.id)}
              // style={{marginLeft: 5}}
            />
          )}
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
    marginLeft: 7,
  },
});
