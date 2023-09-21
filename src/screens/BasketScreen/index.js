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
      if (newOrder) navigation.navigate('HomeTabs', {screen: 'Orders'});
    }
    if (shopInfos) {
      const newIngredientOrder = await createIngredientOrder();
      setBasketDishes([]);
      // if (newIngredientOrder) navigation.navigate('orderList');
      if (newIngredientOrder) navigation.push('HomeTabs', {screen: 'Orders'});
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
          padding:10
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
            titleStyle={{fontSize:20, fontWeight:'300', marginBottom:15}}
            title={'Commander: ' + totalPrice.toFixed(2) + ' MAD'}
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
    paddingTop: 40,
  },
  retaurantName: {fontWeight: 'bold', color: '#000', fontSize: 20, padding:10},
  footerContainer: {
    marginTop: 'auto',
  },
  buttonContainer: {
    borderTopRightRadius:18,
    borderTopLeftRadius:18
  },
  button: {
    backgroundColor: '#FF5963',
    height:100,
  },
});
