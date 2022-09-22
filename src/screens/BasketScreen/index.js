import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import restaurants from '../../../assets/data/restaurants.json';
import {Button, Divider} from '@rneui/themed';
import {BasketDishItem} from '../../components';
import {useNavigation} from '@react-navigation/native';

const restaurant = restaurants[0];

export const BasketScreen = () => {
  const navigation = useNavigation();

  const onCreateOrder = async () => {
    navigation.navigate('Commande(s)');
  };

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.retaurantName}>{restaurant.name}</Text>
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 20,
          fontSize: 19,
          color: '#000',
        }}>
        Vos choix
      </Text>

      <BasketDishItem />

      <View style={styles.footerContainer}>
        <Divider
          color="lightgrey"
          width={1}
          style={{marginTop: 'auto', marginBottom: 0}}
        />

        <Button
          title={'Créer commande 500 MAD'}
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
