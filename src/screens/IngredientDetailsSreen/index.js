import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Divider} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {useBasketContext} from '../../contexts/BasketContext';
import {useIngredientContext} from '../../contexts/IngredientContext';
import {getIngredient} from '../../graphql/queries';

export const IngredientDetailsSCreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {addIngredientToBasket, basketDishes} = useBasketContext();
  const {onMinus, onPlus, quantity, setQuantity} = useIngredientContext();

  const id = route.params?.id;

  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    if (id)
      API.graphql(graphqlOperation(getIngredient, {id})).then(resp =>
        setIngredient(resp.data.getIngredient),
      );
  }, [id]);

  useEffect(() => {
    console.log({ingredient});
    if (ingredient) {
      basketDishes.map(_ => {
        if (_.Ingredient.id === ingredient.id) {
          setQuantity(_.quantity);
        } else {
          setQuantity(0);
        }
      });
    }
  }, [ingredient]);

  const onAddToBasket = async () => {
    await addIngredientToBasket(ingredient, quantity);
    navigation.goBack();
  };

  const getTotalPrice = () => {
    return (ingredient.price * quantity).toFixed(2);
  };

  if (!ingredient) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <View style={styles.constainerScreen}>
      <Text style={styles.name}>{ingredient.name}</Text>
      <Text style={styles.description}>{ingredient.description}</Text>
      <Divider color="lightgrey" width={2} />
      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={60}
          color="#000"
          onPress={onMinus}
        />
        <Text style={styles.quantity}>{quantity.toFixed(1)}</Text>
        <AntDesign name="pluscircleo" size={60} color="#000" onPress={onPlus} />
      </View>
      {quantity >= 0.3 && (
        <Button
          title={`Ajouter ${quantity.toFixed(
            1,
          )} kg(s) au Panier (${getTotalPrice()})MAD`}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.styleButton}
          onPress={onAddToBasket}
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
