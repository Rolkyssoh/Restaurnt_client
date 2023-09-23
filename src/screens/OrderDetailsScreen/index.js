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
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AWS from 'aws-sdk';
import {
  REACT_APP_S3_ACCESS_KEY_ID,
  REACT_APP_S3_SECRET_ACCESS_KEY,
  S3_BUCKET,
  REGION,
} from '@env';
import { englishToFrench } from '../../translation';

AWS.config.update({
  accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
});

dayjs.extend(relativeTime);

const OrderDetailsHeader = ({order}) => {
  const [structurePicture, setStructurePicture] = useState();
  const s3 = new AWS.S3();

  useEffect(() => {
    if (order.Structure) {
      const params = {
        Bucket: S3_BUCKET,
        Key: `${order.Structure.image}`,
      };
      s3.getSignedUrl('getObject', params, (err, data) => {
        if (err) {
          console.log('we have some error:', err, err.stack);
        } else {
          setStructurePicture(data.toString());
        }
      });
    }
  }, [order]);

  return (
    <View>
      <View style={styles.screenContainer}>
        <Image
          source={{uri: structurePicture}}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{order.Structure.name}</Text>

          <View style={{flexDirection:'row', alignItems:'center'}}>
            <Text style={styles.subtitleStatus}>
              {englishToFrench[order.status]} &#8226;{' '}
            </Text>
            <Text style={styles.subtitleDate}>
              {dayjs(order.createdAt).fromNow(true)}
            </Text>
          </View>

          <Text style={styles.menuTitle}>Votre Commande</Text>
        </View>
      </View>
    </View>
  );
};

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
  screenContainer: {},
  contentContainer: {margin: 10},
  image: {width: '100%', aspectRatio: 4 / 2},
  title: {fontSize: 30, fontWeight: '600', marginVertical: 10, color: '#000'},
  subtitleStatus: {
    color:'#249689', 
    fontSize:15, 
    fontWeight:'300'
  },
  subtitleDate: {
    color: '#525252', 
    fontSize: 12,
    fontWeight:'300'
  },
  iconContainer: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  menuTitle: {
    marginVertical: 15,
    fontSize: 18,
    fontWeight:'300',
    letterSpacing: 0.7,
    color: '#000',
  },
});
