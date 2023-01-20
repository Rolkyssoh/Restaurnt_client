import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Divider} from '@rneui/themed';
import {BasketDishItem, BasketIngredientItem} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useBasketContext} from '../../contexts/BasketContext';
import {useOrderContext} from '../../contexts/OrderContext';

export const BasketScreen = () => {
  const navigation = useNavigation();
  const {
    restaurantInfos,
    shopInfos,
    basketDishes,
    totalPrice,
    setBasketDishes,
    basket,
    loading,
  } = useBasketContext();
  const {createNewOrder, createIngredientOrder, orderLoading} =
    useOrderContext();

  useEffect(() => {
    // if (basket === null) navigation.goBack();
  }, [basket]);

  const onCreateOrder = async () => {
    if (restaurantInfos) {
      const newOrder = await createNewOrder();
      setBasketDishes([]);
      // if (newOrder) navigation.navigate('orderList');
      if (newOrder) navigation.navigate('Orders');
    }
    if (shopInfos) {
      const newIngredientOrder = await createIngredientOrder();
      setBasketDishes([]);
      // if (newIngredientOrder) navigation.navigate('orderList');
      if (newIngredientOrder) navigation.navigate('Orders');
    }
  };

  // 31.9360370271;
  // -6.80877377532;

  return (
    <View style={styles.containerStyle}>
      {restaurantInfos && (
        <Text style={styles.retaurantName}>{restaurantInfos.name}</Text>
      )}
      {shopInfos && <Text style={styles.retaurantName}>{shopInfos.name}</Text>}
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 20,
          fontSize: 19,
          color: '#000',
        }}>
        Vos choix
      </Text>

      {restaurantInfos !== null && (
        <FlatList
          data={basketDishes}
          renderItem={({item}) => <BasketDishItem basketDish={item} />}
        />
      )}
      {shopInfos !== null && (
        <FlatList
          data={basketDishes}
          renderItem={({item}) => <BasketIngredientItem basketDish={item} />}
        />
      )}

      <View style={styles.footerContainer}>
        <Divider
          color="lightgrey"
          width={1}
          style={{marginTop: 'auto', marginBottom: 0}}
        />

        {basketDishes.length > 0 && basketDishes[0].quantity > 0 && (
          <Button
            title={'Créer commande ' + totalPrice.toFixed(2) + ' MAD'}
            // title={'test'}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            onPress={onCreateOrder}
            disabled={loading || orderLoading}
            loading={orderLoading}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: '100%',
    paddingVertical: 40,
    padding: 10,
  },
  retaurantName: {fontWeight: 'bold', color: '#000', fontSize: 20},
  footerContainer: {
    marginTop: 'auto',
  },
  buttonContainer: {
    padding: 10,
  },
  button: {
    backgroundColor: '#000',
  },
});
