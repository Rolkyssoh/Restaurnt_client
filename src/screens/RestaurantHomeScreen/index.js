import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import restaurants from '../../../assets/data/restaurants.json';
import {Divider, Image} from '@rneui/base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Header from './Header';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {DishListItem} from '../../components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Button} from '@rneui/themed';

const restaurant = restaurants[0];

export const RestaurantHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    setDishes(restaurant.dishes);
  }, [id]);

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
      <Button
        title="Voir Panier 4"
        buttonStyle={styles.button}
        containerStyle={styles.buttonContainer}
        onPress={() => navigation.navigate('Basket')}
      />
    </View>
  );
};
