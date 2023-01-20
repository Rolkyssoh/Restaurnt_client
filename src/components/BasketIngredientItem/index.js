import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDishContext} from '../../contexts/DishContext';
import {useBasketContext} from '../../contexts/BasketContext';
import {useNavigation} from '@react-navigation/native';
import {useOrderContext} from '../../contexts/OrderContext';

export const BasketIngredientItem = ({basketDish}) => {
  const {onMinus, onPlus, setQuantity} = useDishContext();
  const {basketDishes, addIngredientToBasket, loading} = useBasketContext();
  const {orders, orderLoading} = useOrderContext();
  const navigation = useNavigation();

  const [qtyIncreased, setQtyIncreased] = useState(0);
  const [showHandlerQtyBtn, setShowHandlerQtyBtn] = useState(true);
  const [currentAction, setCurrentAction] = useState('');

  const increaseNumberOfKg = async (id, action) => {
    setCurrentAction(action);
    const basketIngredient = basketDishes.find(_ => _.Ingredient.id === id);
    console.log('in stock:', basketDish.quantity);
    if (!basketIngredient) throw new Error('Dish not found');
    const quantity = qtyIncreased
      ? qtyIncreased + 0.1
      : basketIngredient.quantity + 0.1;

    await addIngredientToBasket(
      basketIngredient.Ingredient,
      quantity.toFixed(1),
    );
    setQtyIncreased(quantity);
    if (!loading) setCurrentAction('');
    await Promise.resolve();
  };

  const decreaseNumberOfDishes = async (id, action) => {
    setCurrentAction(action);
    const theBasketIngredient = basketDishes.find(_ => _.Ingredient.id === id);
    if (!theBasketIngredient) throw new Error('Dish not found!');
    console.log('qty in stock:', qtyIncreased);
    console.log('qty in bd:', theBasketIngredient.quantity);
    const quantity = qtyIncreased
      ? qtyIncreased - 0.1
      : theBasketIngredient.quantity - 0.1;
    if (quantity >= 0)
      await addIngredientToBasket(
        theBasketIngredient.Ingredient,
        quantity.toFixed(1),
      );
    if (basketDishes.length === 1) {
      if (quantity < 0.1) {
        navigation.goBack();
      }
    }
    setQtyIncreased(quantity);
    if (!loading) setCurrentAction('');
    await Promise.resolve();
  };

  useEffect(() => {
    orders.map(_ => {
      if (_.id === basketDish.orderID) {
        setShowHandlerQtyBtn(false);
      }
    });
  }, [basketDish]);

  return (
    <>
      {basketDish.quantity >= 0.1 && (
        <View style={styles.container}>
          {showHandlerQtyBtn &&
            (loading && currentAction === 'isIncreasing' ? (
              <ActivityIndicator size={'small'} color="lightgray" />
            ) : (
              <AntDesign
                name="pluscircleo"
                size={25}
                color={
                  currentAction === 'isDecreasing' || orderLoading
                    ? 'lightgray'
                    : '#3fc060'
                }
                onPress={() =>
                  loading || orderLoading
                    ? console.log('RASS!!!')
                    : increaseNumberOfKg(
                        basketDish.Ingredient.id,
                        'isIncreasing',
                      )
                }
              />
            ))}
          <View style={styles.quantityContainer}>
            <Text>{basketDish.quantity.toFixed(1)}</Text>
          </View>
          <Text style={styles.dishName}>
            {basketDish.Ingredient != null && basketDish.Ingredient?.name}
          </Text>
          <Text
            style={{
              marginLeft: 'auto',
              color: '#000',
              paddingLeft: 2,
              marginRight: 7,
            }}>
            ${basketDish.Ingredient?.price}
          </Text>
          {showHandlerQtyBtn &&
            (loading && currentAction === 'isDecreasing' ? (
              <ActivityIndicator size={'small'} color="lightgray" />
            ) : (
              <AntDesign
                name="minuscircleo"
                size={25}
                color={
                  currentAction === 'isIncreasing' || orderLoading
                    ? 'lightgray'
                    : 'red'
                }
                onPress={() =>
                  loading || orderLoading
                    ? console.log('Wait small!!!')
                    : decreaseNumberOfDishes(
                        basketDish.Ingredient.id,
                        'isDecreasing',
                      )
                }
              />
            ))}
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
