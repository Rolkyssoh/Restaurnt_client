import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StructureType} from '../../../models';
import ShopItem from '../../../components/shop/ShopItem';
import {listStructures} from '../../../graphql/queries';
import {
  onCreateStructure,
  onDeleteStructure,
  onUpdateStructure,
} from '../../../graphql/subscriptions';
import {generateClient} from 'aws-amplify/api';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Text } from '@rneui/themed';

const ShopHome = ({search, showFavorites}) => {
  const [shops, setShops] = useState([]);
  const [filterdShop, setFilteredShop] = useState([]);
  const { dbUser } = useAuthContext()
  const client = generateClient()

  useEffect(() => {
    fetchShop();
    watchShopCreation();
    watchShopUpdating();

    // Watch the shop list for deleting
    const subscription = client.graphql({
      query: onDeleteStructure
    }).subscribe({
      next: ({value}) => {
        console.log('le wath onDeleteSTructure result in ShopHome:', value);
        if (value.data.onDeleteStructure.type === StructureType.SHOP) {
          fetchShop();
        }
      },
      error: err => {
        console.warn(err);
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const filtering = search ? filterShopByTerm(search) :
      showFavorites ? doShowFavorites() : shops;
    setFilteredShop(filtering);
  }, [search, shops, showFavorites, dbUser]);

  const watchShopCreation = () => {
    const subscription = client.graphql({
      query: onCreateStructure
    }).subscribe({
      next: ({value}) => {
        console.log('le wath onCreateStructure result in ShopHome:', value);
        if (value.data.onCreateStructure.type === StructureType.SHOP) {
          fetchShop();
        }
      },
      error: err => {
        console.warn(err);
      },
    });
    return () => subscription.unsubscribe();
  };

  const watchShopUpdating = () => {
    const subscription = client.graphql({
      query: onUpdateStructure
    }).subscribe({
      next: ({value}) => {
        console.log('le wath onUpdateSHOP result in ShopHome:', value);
        if (value.data.onUpdateStructure.type === StructureType.SHOP) {
          fetchShop();
        }
      },
      error: err => {
        console.warn(err);
      },
    });
    return () => subscription.unsubscribe();
  };

  const fetchShop = async () => {
    const theListOfShops = await client.graphql({
      query:listStructures,
      variables:{
        filter:{
          type: {eq: StructureType.SHOP},
          isActive : {eq: true}
        }
      }
    })
    setShops(theListOfShops.data.listStructures.items)
  };

  const filterShopByTerm = term => {
    return shops.filter(_ => `${_.name.toLowerCase()} `.indexOf(term) !== -1);
  };

  /**Found the restaurant by ID array */
  let favoritesArray=[]
  const doShowFavorites = () => {
    if(dbUser.favouriteRestaurants){
      const getRestauById = dbUser.favouriteRestaurants?.map((id) => (
        shops.filter(_ => `${_.id.toLowerCase()}`.indexOf(id) !== -1)
      ))
      getRestauById.map((arr) => {
        if(arr.length >0){
          arr.map((_) => {
            favoritesArray=[_, ...favoritesArray]
          })
        }
      })
    }
    return favoritesArray
  }

  if (!shops) {
    return (
      <ActivityIndicator
        size={'large'}
        color="#000"
        style={{alignSelf: 'center', marginTop: '70%'}}
      />
    );
  }

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        marginBottom: 1,
      }}>
      <View style={styles.shopHomeContainer}>
        {filterdShop.length <= 0 && !showFavorites && (
          <Text
            h3
            style={{
              alignSelf: 'center',
              marginTop: '50%',
              color: 'lightgrey',
            }}>
            Aucune boutique trouvée
          </Text>
        )}
        {filterdShop.length <= 0 && showFavorites && (
          <Text
            h3
            style={{
              alignSelf: 'center',
              marginTop: '50%',
              color: 'lightgrey',
            }}>
            Pas de boutique dans vos favoris
          </Text>
        )}
        <FlatList
          data={filterdShop}
          renderItem={({item}) => <ShopItem shop={item} />}
          showsVerticalScrollIndicator={false} 
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shopHomeContainer: {
    height: '100%',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default ShopHome;
