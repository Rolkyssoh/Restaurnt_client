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
      onPress={() => navigation.navigate('IngredientDetails', {id: ingredient.id})}
      disabled={ingredient.maxNumber===0}
    >
      <View style={{width:'31%'}}>
        <Image
          source={{uri: ingredient.image_url}}
          style={styles.image}
          resizeMode="cover"maxNumber
          blurRadius={ingredient.maxNumber===0 ? 20:0}
        />
      </View>
      <View
        style={[styles.itemCliquable,ingredient.maxNumberPerDay===0 && {backgroundColor: 'rgba(0, 0, 0, 0.5)',zIndex:100}]}>
        <View style={{paddingHorizontal:10}}>
          <Text style={styles.name}>{ingredient.name}</Text>
          <Text style={[styles.description,ingredient.maxNumberPerDay===0 && {color: 'lightgrey', zIndex:100}]} numberOfLines={1}>
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
