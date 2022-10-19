import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import RestaurantItem from '../../../components/RestaurantItem';
import {DataStore} from 'aws-amplify';
import {Restaurant} from '../../../models';
import {SearchBar, Text} from '@rneui/themed';

const RestaurantHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    DataStore.query(Restaurant).then(result => setRestaurants(result));
  }, []);

  useEffect(() => {
    const filtering = searchTerm
      ? filterRestaurantByTerm(searchTerm)
      : restaurants;
    setFilteredRestaurants(filtering);
  }, [searchTerm, restaurants]);

  const filterRestaurantByTerm = term => {
    return restaurants.filter(_ => `${_.name} `.indexOf(term) !== -1);
  };

  if (!restaurants) {
    return (
      <ActivityIndicator
        size={'large'}
        color="#000"
        style={{alignSelf: 'center', marginTop: '70%'}}
      />
    );
  }

  return (
    <View style={{flex: 1, marginBottom: 45}}>
      <SearchBar
        placeholder="Que recherchez vous?"
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={{height: 35, backgroundColor: 'lightgrey'}}
        value={searchTerm}
        onChangeText={test => setSearchTerm(test)}
        onClear={() => setSearchTerm('')}
      />
      <View style={styles.homeContainer}>
        {filteredRestaurants.length <= 0 && (
          <Text
            h3
            style={{
              alignSelf: 'center',
              marginTop: '50%',
              color: 'lightgrey',
            }}>
            Aucun restaurant trouvé
          </Text>
        )}
        <FlatList
          data={filteredRestaurants}
          renderItem={({item}) => <RestaurantItem restaurant={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    borderColor: 'lightgrey',
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeContainer: {
    height: '100%',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default RestaurantHome;
