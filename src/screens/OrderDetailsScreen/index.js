import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/themed';
import {BasketDishItem} from '../../components';
import {useOrderContext} from '../../contexts/OrderContext';

const OrderDetailsHeader = ({order}) => {
  return (
    <View>
      <View style={styles.screenContainer}>
        <Image
          source={{uri: order.Restaurant.image}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <Text style={styles.subtitle}>
            {order.status} &#8226; 2 days ago{' '}
          </Text>
          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};

export const OrderDetailsScreen = ({id}) => {
  const {getOrder} = useOrderContext();
  const [order, setOrder] = useState();

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  if (!order) {
    return <ActivityIndicator size={'large'} color="black" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({item}) => <BasketDishItem basketDish={item} />}
    />
  );
};

const styles = StyleSheet.create({
  screenContainer: {},
  contentContainer: {margin: 10},
  image: {width: '100%', aspectRatio: 4 / 2},
  title: {fontSize: 30, fontWeight: '600', marginVertical: 10, color: '#000'},
  subtitle: {color: '#525252', fontSize: 15},
  iconContainer: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  menuTitle: {
    marginVertical: 15,
    fontSize: 18,
    letterSpacing: 0.7,
    color: '#000',
  },
});
