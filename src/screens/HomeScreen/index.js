import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {RestaurantItem} from '../../components';
import restaurants from '../../../assets/data/restaurants.json';

export const HomeScreen = () => {
  return (
    <View style={styles.homeContainer}>
      <FlatList
        data={restaurants}
        renderItem={({item}) => <RestaurantItem restaurant={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    marginHorizontal: 10,
  },
});
