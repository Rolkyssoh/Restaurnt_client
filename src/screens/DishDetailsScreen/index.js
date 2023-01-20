import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Divider} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {useBasketContext} from '../../contexts/BasketContext';
import {useDishContext} from '../../contexts/DishContext';
import {getDish} from '../../graphql/queries';

export const DishDetailsSCreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {addDishToBasket, basketDishes, loading} = useBasketContext();
  const {onMinus, onPlus, quantity, setQuantity} = useDishContext();

  const id = route.params?.id;

  const [dish, setDish] = useState(null);

  useEffect(() => {
    if (id)
      API.graphql(graphqlOperation(getDish, {id})).then(resp => {
        setDish(resp.data.getDish);
      });
  }, [id]);

  useEffect(() => {
    if (dish) {
      const currentDish = basketDishes.find(_ => _.Dish?.id === dish.id);
      if (currentDish) {
        setQuantity(currentDish.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [dish]);

  const onAddToBasket = async () => {
    await addDishToBasket(dish, quantity);
    navigation.goBack();
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
          color={loading ? 'lightgrey' : '#000'}
          onPress={loading ? console.log('Wait until loading end!!') : onMinus}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <AntDesign
          name="pluscircleo"
          size={60}
          color={loading ? 'lightgrey' : '#000'}
          onPress={loading ? console.log('Wait until loading end!!') : onPlus}
        />
      </View>
      {quantity > 0 && (
        <Button
          title={`Ajouter ${quantity} plat(s) au Panier (${getTotalPrice()})MAD`}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.styleButton}
          onPress={onAddToBasket}
          disabled={loading}
          loading={loading}
        />
      )}
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
    marginTop: 'auto',
    padding: 20,
  },
  styleButton: {
    backgroundColor: '#000',
  },
});
