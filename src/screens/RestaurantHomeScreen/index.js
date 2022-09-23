import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import {Divider, Image} from '@rneui/base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from './Header';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {DishListItem} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from '@rneui/themed';
import {DataStore} from 'aws-amplify';
import {Dish, Restaurant} from '../../models';
import {useBasketContext} from '../../contexts/BasketContext';

export const RestaurantHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {setRestaurantInfos, basket, basketDishes} = useBasketContext();

  const [dishes, setDishes] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  const id = route.params?.id;

  useEffect(() => {
    if (!id) {
      return;
    }
    setRestaurantInfos(null);
    // fetch the restaurant with the id
    DataStore.query(Restaurant, id).then(setRestaurant);

    DataStore.query(Dish, dish => dish.restaurantID('eq', id)).then(setDishes);
  }, [id]);

  useEffect(() => {
    setRestaurantInfos(restaurant);
  }, [restaurant]);

  if (!restaurant) {
    return <ActivityIndicator size={'large'} color="black" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={dishes}
        renderItem={({item}) => <DishListItem dish={item} />}
        showsVerticalScrollIndicator={false}
      />
      <IonIcons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="#fff"
        style={styles.iconContainer}
      />
      {basket && (
        <Button
          title={'Voir Panier ' + basketDishes.length}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => navigation.navigate('Basket')}
        />
      )}
    </View>
  );
};
