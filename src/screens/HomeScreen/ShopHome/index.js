import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {StructureType} from '../../../models';
import ShopItem from '../../../components/shop/ShopItem';
import {listStructures} from '../../../graphql/queries';

const ShopHome = ({search}) => {
  const [shops, setShops] = useState([]);
  const [filterdShop, setFilteredShop] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(listStructures)).then(result => {
      const listShops = result.data.listStructures.items.filter(
        _ => _.type === StructureType.SHOP && !_._deleted,
      );
      setShops(listShops);
    });
  }, []);

  useEffect(() => {
    const filtering = search ? filterShopByTerm(search) : shops;
    setFilteredShop(filtering);
  }, [search, shops]);

  const filterShopByTerm = term => {
    return shops.filter(_ => `${_.name} `.indexOf(term) !== -1);
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1, marginBottom: 45}}>
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
