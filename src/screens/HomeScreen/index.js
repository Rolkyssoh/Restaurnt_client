import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RestaurantItem} from '../../components';
import {DataStore} from 'aws-amplify';
import {Restaurant} from '../../models';
import NetInfo from '@react-native-community/netinfo';

export const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    return NetInfo.addEventListener(state => {
      if (state.isInternetReachable)
        DataStore.query(Restaurant).then(result => setRestaurants(result));
    });
  }, []);

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
