import {View, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OrderListItem} from '../../components';
import {useOrderContext} from '../../contexts/OrderContext';
import {SearchBar, Text} from '@rneui/themed';

export const OrdersScreen = () => {
  const {orders} = useOrderContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterdOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    console.log('le orderssss: ', orders);
    const filtering = searchTerm
      ? filterOrdersByTerm(searchTerm.toUpperCase())
      : orders;
    setFilteredOrders(filtering);
  }, [searchTerm, orders]);

  const filterOrdersByTerm = term => {
    return orders.filter(_ => `${_.status} `.indexOf(term) !== -1);
  };

  return (
    <View style={{flex: 1, marginBottom: 40}}>
      <SearchBar
        placeholder="Filtrez en fontion du status"
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={{height: 35, backgroundColor: 'lightgrey'}}
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />
      <View style={styles.container}>
        <FlatList
          data={filterdOrders}
          renderItem={({item}) => <OrderListItem order={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {filterdOrders.length <= 0 && (
        <Text
          h3
          style={{color: 'lightgrey', alignSelf: 'center', marginTop: '50%'}}>
          Aucune commande trouvée
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopColor: 'lightgrey',
    borderTopWidth: 0.5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
  },
});
