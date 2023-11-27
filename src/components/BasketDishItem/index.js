import {View, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useBasketContext} from '../../contexts/BasketContext';
import {useNavigation} from '@react-navigation/native';
import {useOrderContext} from '../../contexts/OrderContext';

export const BasketDishItem = ({basketDish}) => {
  const {basketDishes, addDishToBasket, loading} = useBasketContext();
  const {orders, orderLoading} = useOrderContext();
  const navigation = useNavigation();

  const [qtyIncreased, setQtyIncreased] = useState(0);
  const [showHandlerQtyBtn, setShowHandlerQtyBtn] = useState(true);
  const [currentAction, setCurrentAction] = useState('');

  const increaseNumberOfDishes = async (id, action) => {
    setCurrentAction(action);
    const basketDish = basketDishes.find(_ => _.Dish.id === id);
    if (!basketDish) throw new Error('Dish not found');
    const quantity = qtyIncreased ? qtyIncreased + 1 : basketDish.quantity + 1;
    await addDishToBasket(basketDish.Dish, quantity);
    setQtyIncreased(quantity);
    if (!loading) setCurrentAction('');
    await Promise.resolve();
  };

  const decreaseNumberOfDishes = async (id, action) => {
    setCurrentAction(action);
    const theBasketDish = basketDishes.find(_ => _.Dish.id === id);
    if (!theBasketDish) throw new Error('Dish not found!');
    const quantity = qtyIncreased
      ? qtyIncreased - 1
      : theBasketDish.quantity - 1;
    if (quantity >= 0) await addDishToBasket(theBasketDish.Dish, quantity);
    if (basketDishes.length === 1) {
      if (quantity === 0) {
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
      {basketDish.quantity > 0 && (
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
                    : '#249689'
                }
                increaseNumberOfDishes
                onPress={() =>
                  loading || orderLoading
                    ? console.log('RAS!!!!!')
                    : increaseNumberOfDishes(basketDish.Dish.id, 'isIncreasing')
                }
              />
            ))}
          <View style={styles.quantityContainer}>
            {basketDish.Dish != null ? (
              <Text style={styles.quantiyText}>{basketDish.quantity}</Text>
            ) : (
              <Text style={styles.quantiyText}>{basketDish.quantity?.toFixed(1)}</Text>
            )}
          </View>
          <Text style={styles.dishName}>
            {basketDish.Dish != null
              ? basketDish.Dish?.name
              : basketDish.Ingredient != null ? 
              basketDish.Ingredient?.name
              :null}
          </Text>
          <Text
            style={styles.dishPrice}>
            {basketDish.Dish != null
              ? basketDish.Dish?.price
              : basketDish.Ingredient != null 
              ? basketDish.Ingredient.price
              : null}{' '}
            MAD
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
                    : '#FF5963'
                }
                onPress={() =>
                  loading || orderLoading
                    ? console.log('Not Now!!!!!')
                    : decreaseNumberOfDishes(basketDish.Dish.id, 'isDecreasing')
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
    paddingHorizontal:10
  },
  dishName: {
    fontWeight: '500',
    fontSize:13,
    color: '#000',
    fontFamily: 'Nunito-Bold',
    flexWrap: 'wrap',
    paddingHorizontal: 2,
    marginHorizontal: 5,
  },
  dishPrice:{
    marginLeft: 'auto',
    color: '#000',
    paddingLeft: 2,
    marginRight: 7,
    fontSize:12,
    fontWeight:'700'
  },
  quantityContainer: {
    backgroundColor: '#249689',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
    marginLeft: 7,
  },
  quantiyText:{color:'#fff', fontSize:15, fontWeight:'bold'}
});
