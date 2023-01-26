import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import RestaurantItem from '../../../components/RestaurantItem';
import {API, graphqlOperation} from 'aws-amplify';
import {StructureType} from '../../../models';
import {Text} from '@rneui/themed';
import {listStructures} from '../../../graphql/queries';
import {
  onDeleteStructure,
  onCreateStructure,
} from '../../../graphql/subscriptions';

const RestaurantHome = ({search}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    fetchRestaurants();
    watchRestaurantCreation();

    // Watch the restau list for deleting
    const subscription = API.graphql(
      graphqlOperation(onDeleteStructure, {}),
    ).subscribe({
      next: ({value}) => {
        console.log('le wath onDeleteSTructure result:', value);
        if (value.data.onDeleteStructure.type === StructureType.RESTAURANT) {
          fetchRestaurants();
        }
      },
      error: err => {
        console.warn(err);
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const filtering = search ? filterRestaurantByTerm(search) : restaurants;
    setFilteredRestaurants(filtering);
  }, [search, restaurants]);

  const watchRestaurantCreation = () => {
    const subscription = API.graphql(
      graphqlOperation(onCreateStructure, {}),
    ).subscribe({
      next: ({value}) => {
        console.log('le wath onCreateStructure result in Restaurant:', value);
        if (value.data.onCreateStructure.type === StructureType.RESTAURANT) {
          fetchRestaurants();
        }
      },
      error: err => {
        console.warn(err);
      },
    });
    return () => subscription.unsubscribe();
  };

  const fetchRestaurants = () => {
    API.graphql(graphqlOperation(listStructures)).then(result => {
      const listRestaurants = result.data.listStructures.items.filter(
        _ => _.type === StructureType.RESTAURANT && !_._deleted,
      );
      setRestaurants(listRestaurants);
    });
  };

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
  homeContainer: {
    height: '100%',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default RestaurantHome;
