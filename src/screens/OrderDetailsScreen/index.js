import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BasketDishItem} from '../../components';
import {useOrderContext} from '../../contexts/OrderContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AWS from 'aws-sdk';
import {
  REACT_APP_S3_ACCESS_KEY_ID,
  REACT_APP_S3_SECRET_ACCESS_KEY,
} from '@env';
import { OrderDetailsHeader } from './OrderDetailsHeader';

AWS.config.update({
  accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
});

dayjs.extend(relativeTime);


///The DETAILS COMPONENT

export const OrderDetailsScreen = ({id}) => {
  const {getOrderById} = useOrderContext();
  const [order, setOrder] = useState();

  useEffect(() => {
    getOrderById(id).then(theOrder => {
      setOrder(theOrder);
      console.log({theOrder});
    });
  }, []);

  if (!order) {
    return <ActivityIndicator size={'large'} color="black" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({item}) => <BasketDishItem basketDish={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
});
