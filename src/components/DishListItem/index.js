import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/base';
import {useNavigation} from '@react-navigation/native';
import {useDishContext} from '../../contexts/DishContext';
import {useBasketContext} from '../../contexts/BasketContext';

export const DishListItem = ({dish}) => {
  const navigation = useNavigation();
  const {basketDishes, basket} = useBasketContext();

  const [dishQty, setDishQty] = useState(0);

  useEffect(() => {
    if (basket === null) setDishQty(0);
  }, [basket]);

  useEffect(() => {
    console.log('le basket dish dans DishlistItem:', basketDishes);
    const theCurrentDish = basketDishes.find(_ => _.Dish?.id === dish.id);
    if (theCurrentDish) {
      setDishQty(theCurrentDish.quantity);
    } else {
      setDishQty(0);
    }
    console.log('the quantiy:', theCurrentDish?.quantity);
  }, [basketDishes]);

  return (
    <View style={styles.viewContainer}>
      <View style={{width:'31%'}}>
        <Image
          source={{uri: dish.image}}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Pressable
        style={styles.itemCliquable}
        onPress={() => navigation.navigate('Dish', {id: dish.id})}>
        <View style={{paddingHorizontal:10}}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.description} numberOfLines={1}>
            {dish.description}
          </Text>
          <View style={{marginTop:20}}>
            <Text style={styles.price}>{dish.price} MAD</Text>
            {dishQty != 0 && <Text style={styles.quantity}>{dishQty}x</Text>}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer:{
    flexDirection:'row',
    margin: 10,
    overflow:'hidden'
  },
  image: {
    height: 101, 
    aspectRatio: 1, 
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius:7,
    marginRight:-1
  },
  itemCliquable:{
    width:'69%',
    backgroundColor:'#fff',
    height:115,
    borderBottomLeftRadius:22,
    borderTopRightRadius:20,
    borderBottomRightRadius:7
  },
  container: {
    padding: 5,
    paddingLeft: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    // borderColor: 'lightgrey',
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  name: {fontWeight: 'bold', fontSize: 15, letterSpacing: 0.5, color: '#000'},
  description: {color: 'gray', marginVertical: 3, marginHorizontal: 2},
  price: {fontSize: 16, color: '#000', fontWeight:'300'},
  quantity: {
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-end',
    marginHorizontal: 5,
  },
});
