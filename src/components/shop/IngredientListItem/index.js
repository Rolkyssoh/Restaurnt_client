import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useBasketContext} from '../../../contexts/BasketContext';
import styles from '../../../components/DishListItem/styles'

export const IngredientListItem = ({ingredient}) => {
  const navigation = useNavigation();
  const {basketDishes, basket} = useBasketContext();

  const [ingredientQty, setIngredientQty] = useState(0);

  useEffect(() => {
    if (basket === null) setIngredientQty(0);
  }, [basket]);

  useEffect(() => {
    const theCurrentIngredient = basketDishes.find(
      _ => _.Ingredient?.id === ingredient.id,
    );
    if (theCurrentIngredient) {
      // theCurrentIngredient.data
      //   ? setIngredientQty(theCurrentIngredient.data.createBasketDish.quantity) :
      setIngredientQty(theCurrentIngredient.quantity);
    } else {
      setIngredientQty(0);
    }
  }, [basketDishes]);

  return (
    <Pressable 
      style={styles.viewContainer}
      onPress={() => navigation.navigate('IngredientDetails', {id: ingredient.id})}>
      <View style={{width:'31%'}}>
        <Image
          source={{uri: ingredient.image_url}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View
        style={styles.itemCliquable}>
        <View style={{paddingHorizontal:10}}>
          <Text style={styles.name}>{ingredient.name}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {ingredient.description}
          </Text>
          <View style={{marginTop:20}}>
            <Text style={styles.price}>{ingredient.price} MAD/kg</Text>
            {ingredientQty != 0 && <Text style={styles.quantity}>{ingredientQty}x</Text>}
          </View>
        </View>
      </View>
    </Pressable>
  );
};
