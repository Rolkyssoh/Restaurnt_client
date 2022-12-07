import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDishContext} from '../../contexts/DishContext';
import {useBasketContext} from '../../contexts/BasketContext';
import {useNavigation} from '@react-navigation/native';
import {useOrderContext} from '../../contexts/OrderContext';

export const BasketIngredientItem = ({basketDish}) => {
  const {onMinus, onPlus, setQuantity} = useDishContext();
  const {basketDishes, addDishToBasket} = useBasketContext();
  const {orders} = useOrderContext();
  const navigation = useNavigation();

  const [qtyIncreased, setQtyIncreased] = useState(0);
  const [showHandlerQtyBtn, setShowHandlerQtyBtn] = useState(true);

  const increaseNumberOfKg = async id => {
    const basketIngredient = basketDishes.find(_ => _.Ingredient.id === id);
    console.log('in stock:', basketDish.quantity);
    if (!basketIngredient) throw new Error('Dish not found');
    const quantity = qtyIncreased
      ? qtyIncreased + 0.1
      : basketIngredient.quantity + 0.1;
    console.log({quantity, qtyIncreased, basketIngredient});
    addDishToBasket(basketIngredient.Ingredient, quantity);
    setQtyIncreased(quantity);
    await Promise.resolve();
  };

  const decreaseNumberOfDishes = async id => {
    const theBasketIngredient = basketDishes.find(_ => _.Ingredient.id === id);
    if (!theBasketIngredient) throw new Error('Dish not found!');
    const quantity = qtyIncreased
      ? qtyIncreased - 1
      : theBasketIngredient.quantity - 1;
    console.log('quantity removed:', quantity);
    if (quantity >= 0)
      addDishToBasket(theBasketIngredient.Ingredient, quantity);
    if (basketDishes.length === 1) {
      if (quantity === 0) {
        navigation.goBack();
      }
    }
    setQtyIncreased(quantity);
    await Promise.resolve();
  };

  useEffect(() => {
    orders.map(_ => {
      if (_.id === basketDish.orderID) {
        console.log('dish dans le order désormais!!!');
        setShowHandlerQtyBtn(false);
      }
    });
  }, [basketDish]);

  return (
    <>
      {basketDish.quantity > 0.2 && (
        <View style={styles.container}>
          {showHandlerQtyBtn && (
            <AntDesign
              name="pluscircleo"
              size={25}
              color="#3fc060"
              onPress={() => increaseNumberOfKg(basketDish.Ingredient.id)}
              // style={{marginRight: 5}}
            />
          )}
          <View style={styles.quantityContainer}>
            <Text>{basketDish.quantity.toFixed(1)}</Text>
          </View>
          <Text style={styles.dishName}>{basketDish.Ingredient.name}</Text>
          <Text
            style={{
              marginLeft: 'auto',
              color: '#000',
              paddingLeft: 2,
              marginRight: 7,
            }}>
            ${basketDish.Ingredient?.price}
          </Text>
          {showHandlerQtyBtn && (
            <AntDesign
              name="minuscircleo"
              size={25}
              color="red"
              onPress={() => decreaseNumberOfDishes(basketDish.Ingredient.id)}
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
