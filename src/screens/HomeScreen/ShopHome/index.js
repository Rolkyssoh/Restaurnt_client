import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {StructureType} from '../../../models';
import ShopItem from '../../../components/shop/ShopItem';
import {listStructures} from '../../../graphql/queries';
import {
  onCreateStructure,
  onDeleteStructure,
  onUpdateStructure,
} from '../../../graphql/subscriptions';

const ShopHome = ({search}) => {
  const [shops, setShops] = useState([]);
  const [filterdShop, setFilteredShop] = useState([]);

  useEffect(() => {
    fetchShop();
    watchShopCreation();
    watchShopUpdating();

    // Watch the shop list for deleting
    const subscription = API.graphql(
      graphqlOperation(onDeleteStructure, {}),
    ).subscribe({
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
    const filtering = search ? filterShopByTerm(search) : shops;
    setFilteredShop(filtering);
  }, [search, shops]);

  const watchShopCreation = () => {
    const subscription = API.graphql(
      graphqlOperation(onCreateStructure, {}),
    ).subscribe({
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
    const subscription = API.graphql(
      graphqlOperation(onUpdateStructure, {}),
    ).subscribe({
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

  const fetchShop = () => {
    API.graphql(graphqlOperation(listStructures)).then(result => {
      const listShops = result.data.listStructures.items.filter(
        _ => _.type === StructureType.SHOP && !_._deleted && _.isActive,
      );
      setShops(listShops);
    });
  };

  const filterShopByTerm = term => {
    return shops.filter(_ => `${_.name.toLowerCase()} `.indexOf(term) !== -1);
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        marginBottom: 1,
        backgroundColor: 'whitesmoke',
      }}>
      <View style={styles.shopHomeContainer}>
        <FlatList
          data={filterdShop}
          renderItem={({item}) => <ShopItem shop={item} />}
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
  shopHomeContainer: {
    height: '100%',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default ShopHome;
