import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {OrderDish} from '../../models';
import {OrderStatus} from '../../models';
import {onUpdateOrder} from '../../graphql/subscriptions';
import {API, graphqlOperation} from 'aws-amplify';
import {useAuthContext} from '../../contexts/AuthContext';
import {useOrderContext} from '../../contexts/OrderContext';
import AWS from 'aws-sdk';
import {
  REACT_APP_S3_ACCESS_KEY_ID,
  REACT_APP_S3_SECRET_ACCESS_KEY,
  S3_BUCKET,
  REGION,
} from '@env';

AWS.config.update({
  accessKeyId: REACT_APP_S3_ACCESS_KEY_ID,
  secretAccessKey: REACT_APP_S3_SECRET_ACCESS_KEY,
});

dayjs.extend(relativeTime);

export const OrderListItem = ({order}) => {
  const navigation = useNavigation();
  const {dbUser} = useAuthContext();
  const {setOrders} = useOrderContext();

  const [totalQty, setTotalQty] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [structurePictureInOrder, setStructurePictureInOrder] = useState();
  const s3 = new AWS.S3();

  // const OrderStatus = {
  //   NEW: 'NEW',
  //   COOKING: 'COOKING',
  //   READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  //   PICKED_UP: 'PICKED_UP',
  //   COMPLETED: 'COMPLETED',
  //   ACCEPTED: 'ACCEPTED',
  // };

  const fetchOrders = () => {
    API.graphql(graphqlOperation(listOrdersByDbUser, {id: dbUser.id})).then(
      resp => {
        const userIsOrders = resp.data.getUser.Orders.items.filter(
          _ => !_._deleted,
        );
        console.log('get orderssss:', userIsOrders);
        setOrders(userIsOrders);
      },
    );
  };

  useEffect(() => {
    if (order.id) {
      // Watch the onupdate order
      const subscriptionToUpdated = API.graphql(
        graphqlOperation(onUpdateOrder, {
          filter: {id: {eq: order.id}},
        }),
      ).subscribe({
        next: ({value}) => {
          fetchOrders();
          console.log('le wath onUPdate order:', value);
        },
        error: err => {
          console.warn(err);
        },
      });
      return () => subscriptionToUpdated.unsubscribe();
    }
  }, [order.id]);

  useEffect(() => {
    if (order && order.orderDishes !== null) {
      const theTotalQty = order.OrderDishes.items.reduce(
        (sum, orderDish) => sum + orderDish.quantity,
        0,
      );
      const theTotalPrice = order.OrderDishes.items.reduce(
        (sum, orderDish) =>
          orderDish.Dish
            ? sum + orderDish.quantity * orderDish.Dish.price
            : orderDish.Ingredient
            ? sum + orderDish.quantity * orderDish.Ingredient.price
            : null,
        order.Structure.deliveryFee,
      );
      setTotalQty(theTotalQty);
      setTotalPrice(theTotalPrice);
    }
  }, [order]);

  useEffect(() => {
    //Get structure image from order
    if (order.Structure) {
      console.log('the structure in order:', order.Structure);
      const params = {
        Bucket: S3_BUCKET,
        Key: `${order.Structure.image}`,
      };
      s3.getSignedUrl('getObject', params, (err, data) => {
        if (err) {
          console.log('we have some error:', err, err.stack);
        } else {
          setStructurePictureInOrder(data);
        }
      });
    }
  }, []);

  const statusToColor = {
    [OrderStatus.NEW]: 'green',
    [OrderStatus.COOKING]: 'orange',
    [OrderStatus.READY_FOR_PICKUP]: 'red',
    [OrderStatus.ACCEPTED]: 'purple',
    [OrderStatus.COMPLETED]: 'skyblue',
  };

  const englishToFrench = {
    [OrderStatus.NEW]: 'NOUVEAU',
    [OrderStatus.COOKING]: 'EN PREPARTION',
    [OrderStatus.READY_FOR_PICKUP]: 'PRÊT AU RAMASSAGE',
    [OrderStatus.ACCEPTED]: 'LIVRAISON EN COURS',
    [OrderStatus.COMPLETED]: 'LIVRÉE',
  };

  useEffect(() => {
    console.log({structurePictureInOrder});
  }, [structurePictureInOrder]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Order', {id: order.id})}>
      <Image
        source={{
          uri: structurePictureInOrder,
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{order?.Structure?.name}</Text>
        <Text style={{marginVertical: 5, color: '#000'}}>
          {`${
            order?.Structure.type === 'RESTAURANT'
              ? totalQty + ' items'
              : totalQty?.toFixed(1) + ' g'
          }`}
          &#8226; {totalPrice?.toFixed(2)} MAD
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#000'}}>
            {dayjs(order?.createdAt).fromNow(true)} &#8226;{' '}
          </Text>
          {/* {order?.status === 'NEW' && ( */}
          <Text
            style={{
              color: `${statusToColor[order.status]}`,
              fontWeight: 'bold',
            }}>
            {englishToFrench[order.status]}
          </Text>
          {/* )} */}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'yellowgreen',
    height: 80,
    borderRadius: 15,
    backgroundColor: '#fff',

    shadowColor: 'yellowgreen',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  image: {
    aspectRatio: 1,
    height: '101%',
    borderRadius: 15,
    // backgroundColor: 'red',
  },
  detailsContainer: {
    paddingHorizontal: 8,
    // paddingVertical: 2,
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  name: {fontWeight: 'bold', fontSize: 16, color: '#000'},
});

export const listOrdersByDbUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      Orders {
        items {
          id
          status
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderStructureId
          orderCourierId
          OrderDishes {
            items {
              id
              quantity
              createdAt
              updatedAt
              _deleted
              Dish {
                id
                name
                image
                description
                price
                structureID
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
              }
              Ingredient {
                id
                name
                image
                description
                price
                structureID
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
              }
            }
            nextToken
            startedAt
          }
          Structure {
            id
            name
            image
            deliveryFee
            minDeliveryTime
            maxDeliveryTime
            rating
            address
            lat
            lng
            type
            adminSub
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
