import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Button, Divider} from '@rneui/themed';
import {BasketDishItem} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {useBasketContext} from '../../contexts/BasketContext';
import {useOrderContext} from '../../contexts/OrderContext';

export const BasketScreen = () => {
  const navigation = useNavigation();
  const {restaurantInfos, basketDishes, totalPrice, basket} =
    useBasketContext();
  const {createOrder, setOrders, orders} = useOrderContext();

  const onCreateOrder = async () => {
    const newOrder = await createOrder();
    setOrders([...orders, newOrder]);
    navigation.navigate('Commande(s)');
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.retaurantName}>{restaurantInfos.name}</Text>
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 20,
          fontSize: 19,
          color: '#000',
        }}>
        Vos choix
      </Text>

      <FlatList
        data={basketDishes}
        renderItem={({item}) => <BasketDishItem basketDish={item} />}
      />

      <View style={styles.footerContainer}>
        <Divider
          color="lightgrey"
          width={1}
          style={{marginTop: 'auto', marginBottom: 0}}
        />

        <Button
          title={'Créer commande ' + totalPrice.toFixed(2) + ' MAD'}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          onPress={onCreateOrder}
        />
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
