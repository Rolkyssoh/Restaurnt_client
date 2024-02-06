import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Divider} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';
import {generateClient} from 'aws-amplify/api';
import {useBasketContext} from '../../contexts/BasketContext';
import {useIngredientContext} from '../../contexts/IngredientContext';
import {getIngredient} from '../../graphql/queries';
import styles from '../DishDetailsScreen/styles'
import { Image } from '@rneui/base';

export const IngredientDetailsSCreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const client = generateClient()
  const {addIngredientToBasket, basketDishes, loading} = useBasketContext();
  const {onMinus, onPlus, quantity, setQuantity} = useIngredientContext();

  const id = route.params?.id;

  const [ingredient, setIngredient] = useState(null);

  const gettingIngredient = async (ingredID) => {
    const resp = await client.graphql({
      query: getIngredient,
      variables: {id: ingredID}
    })
    setIngredient(resp.data.getIngredient)
  }

  useEffect(() => {
    if (id)
      gettingIngredient(id)
  }, [id]);

  useEffect(() => {
    console.log({ingredient});
    if (ingredient) {
      const currentIngredient = basketDishes.find(
        _ => _.Ingredient?.id === ingredient.id,
      );

      if (currentIngredient) {
        setQuantity(currentIngredient.quantity);
      } else {
        setQuantity(0);
      }
    }
  }, [ingredient]);

  const onAddToBasket = async () => {
    await addIngredientToBasket(ingredient, quantity.toFixed(1));
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
      <Image source={{uri: ingredient.image_url}} style={{aspectRatio:5/2}} />
      <Text style={styles.name}>{ingredient.name}</Text>
      <Text style={styles.description}>{ingredient.description}</Text>
      <Divider color="lightgrey" width={2} />
      <View style={styles.row}>
        <AntDesign
          name="minuscircle"
          size={60}
          color={loading ? 'lightgrey' : '#249689'}
          onPress={loading ? console.log('Wait until loading end!!') : onMinus}
        />
        <Text style={styles.quantity}>{quantity.toFixed(1)}</Text>
        <AntDesign
          name="pluscircle"
          size={60}
          color={loading ? 'lightgrey' : '#249689'}
          onPress={loading ? console.log('Wait until loading end!!') : onPlus}
        />
      </View>
      {quantity >= 0.1 && (
        <Button
          titleStyle={{ fontSize:18, marginBottom:15}}
          title={`Ajouter ${quantity.toFixed(
            1,
          )} kg(s) au Panier: ${getTotalPrice()} MAD`}
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
