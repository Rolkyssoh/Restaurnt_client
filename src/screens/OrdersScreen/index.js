import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {OrderListItem} from '../../components';
import {useOrderContext} from '../../contexts/OrderContext';

export const OrdersScreen = () => {
  const {orders} = useOrderContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        renderItem={({item}) => <OrderListItem order={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: '100%',
    backgroundColor: '#fff',
  },
});
