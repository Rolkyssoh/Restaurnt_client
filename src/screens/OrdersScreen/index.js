import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {OrderListItem} from '../../components';

export const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <OrderListItem />
      <OrderListItem />
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
