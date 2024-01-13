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
  onUpdateStructure,
} from '../../../graphql/subscriptions';
import { useAuthContext } from '../../../contexts/AuthContext';

const RestaurantHome = ({search, showFavorites}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { dbUser } = useAuthContext()

  useEffect(() => {
    console.log('the user is favorite:::', dbUser.favouriteRestaurants)
    fetchRestaurants();
    watchRestaurantCreation();
    watchRestaurantUpdating(); 

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
    const filtering = search ? filterRestaurantByTerm(search) :
      showFavorites ? doShowFavorites() : restaurants;
    setFilteredRestaurants(filtering);
  }, [search, restaurants, showFavorites, dbUser]);

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

  const watchRestaurantUpdating = () => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateStructure, {}),
    ).subscribe({
      next: ({value}) => {
        console.log('le wath onUpdateStructure result in Restaurant:', value);
        if (value.data.onUpdateStructure.type === StructureType.RESTAURANT) {
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
        _ => _.type === StructureType.RESTAURANT && _.isActive,
      );
      setRestaurants(listRestaurants);
    });
  };

  const filterRestaurantByTerm = term => {
    return restaurants.filter(_ => `${_.name.toLowerCase()} `.indexOf(term) !== -1);
  };

  /**Found the shop by ID array in existing array of shops */
  let favoritesArray=[]
  const doShowFavorites = () => {
    console.log('the current user in DB::::', dbUser)
    if(dbUser.favouriteRestaurants){
      const getRestauById = dbUser.favouriteRestaurants?.map((id) => (
        restaurants.filter(_ => `${_.id.toLowerCase()}`.indexOf(id) !== -1)
      ))
      console.log('the get restau by id::::', getRestauById)
      getRestauById?.map((arr) => {
        if(arr.length >0){
          arr.map((_) => {
            favoritesArray=[_, ...favoritesArray]
          })
        }
      })
    }
    return favoritesArray
  }

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
    <View style={{flex: 1, marginBottom: 1, backgroundColor: 'white'}}>
      <View style={styles.homeContainer}>
        {filteredRestaurants.length <= 0 && !showFavorites &&  (
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
        {filteredRestaurants.length <= 0 && showFavorites && (
          <Text
            h3
            style={{
              alignSelf: 'center',
              marginTop: '50%',
              color: 'lightgrey',
            }}>
            Pas de restaurant dans vos favoris
          </Text>
        )}
        <FlatList
          data={filteredRestaurants}
          renderItem={({item}) => <RestaurantItem restaurant={item} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) =>item.id}
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
