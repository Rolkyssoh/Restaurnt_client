import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SearchBar} from '@rneui/themed';

const ShopHome = () => {
  const [shops, setShops] = useState([]);
  const [filterdShop, setFilteredShop] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtering = searchTerm ? filterShopByTerm(searchTerm) : shops;
    setFilteredShop(filtering);
  }, [searchTerm, shops]);

  const filterShopByTerm = term => {
    return shops.filter(_ => `${_.name} `.indexOf(term) !== -1);
  };

  return (
    <View style={{backgroundColor: 'green', flex: 1}}>
      <SearchBar
        placeholder="Recherche"
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={{height: 35, backgroundColor: 'lightgrey'}}
        value={searchTerm}
        onChangeText={e => setSearchTerm(e)}
        onClear={() => setSearchTerm('')}
      />
      <Text>Shop Home</Text>
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
});

export default ShopHome;
