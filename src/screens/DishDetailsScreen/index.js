import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import restaurants from '../../../assets/data/restaurants.json';
import {Button, Divider} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';

const restaurant = restaurants[0].dishes;

export const DishDetailsSCreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params?.id;

  const [dish, setDish] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const theDish = restaurant.filter(_ => _.id === id);
      setDish(theDish);
    }
  }, [id]);

  onAddToBasket = async () => {
    navigation.goBack();
  };

  const onMinus = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  const getTotalPrice = () => {
    return (dish.price * quantity).toFixed(2);
  };

  if (!dish) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <View style={styles.constainerScreen}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <Divider color="lightgrey" width={2} />
      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={60}
          color="#000"
          onPress={onMinus}
        />
        <Text style={styles.quantity}>2</Text>
        <AntDesign name="pluscircleo" size={60} color="#000" onPress={onPlus} />
      </View>
      <Button
        title={`Ajouter ${quantity} plat(s) au Panier (${getTotalPrice()})MAD`}
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.styleButton}
        onPress={onAddToBasket}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  constainerScreen: {
    height: '100%',
    paddingVertical: 40,
  },
  name: {fontSize: 30, fontWeight: '600', margin: 10, color: '#000'},
  description: {color: 'gray', marginBottom: 5, marginHorizontal: 10},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 50,
  },
  quantity: {fontSize: 25, marginHorizontal: 20, color: '#000'},
  buttonContainer: {
    // backgroundColor: '#000',
    marginTop: 'auto',
    // bottom: 0,
    padding: 20,
    // alignItems: 'center',
  },
  styleButton: {
    backgroundColor: '#000',
  },
});
