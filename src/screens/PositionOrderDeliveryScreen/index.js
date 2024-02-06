import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getCourier, getOrder, listCouriers} from '../../graphql/queries';
import {onUpdateCourier, onUpdateOrder} from '../../graphql/subscriptions';
import { englishToFrench } from '../../translation';
import {generateClient} from 'aws-amplify/api';

export const PositionOrderDeliveryScreen = ({id}) => {
  const mapRef = useRef(null);
  const client = generateClient();
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);

  useEffect(() => {
    // DataStore.query(Order, id).then(setOrder);
    if (!id) {
      return;
    }
    getOrderById();
    // observeOrderForCourier();
  }, []);

  useEffect(() => {
    if (!order) {
      return;
    }
    // const subscription = DataStore.observe(Order, order.id).subscribe(msg => {
    //   if (msg.opType === 'UPDATE') {
    //     setOrder(msg.element);
    //   }
    // });
    // return () => subscription.unsubscribe();
    observeOrderForCourier()
  }, [order]);

  const gettingCourier = async () => {
    const findCourier = await client.graphql({
      query: getCourier,
      variables: {id: order.courierID }
    })
    console.log({findCourier})
    setCourier(findCourier.data.getCourier);
  }
  
  useEffect(() => {
    if (order?.courierID) {

      gettingCourier()
    }
  }, [order?.courierID]);

  useEffect(() => {
    if (courier?.lat && courier?.lng) {
      mapRef.current.animateToRegion({
        latitude: courier.lat,
        longitude: courier.lng,
        latitudeDelta: 0.07,
        longitudeDelta: 0.07,
      });
    }
  }, [courier?.lat, courier?.lng]);

  useEffect(() => {
    if (!courier) {
      return;
    }

    const subscription = client.graphql({
      query: onUpdateCourier,
      variables: {id: courier.id }
    }).subscribe({
      next: ({value}) => {
        // fetchDishes(id);
        console.log('le wath onUpdateCourier:', value);
      },
      error: err => {
        console.warn(err);
      },
    });
    return () => subscription.unsubscribe();
  }, [courier]);

  const getOrderById = async () => {
    const response = await client.graphql({
      query: getOrder,
      variables: {id: id}
    })
    setOrder(response.data.getOrder);
  };

  const observeOrderForCourier = () => {
    const subscription = client.graphql({
      query: onUpdateOrder,
      variables: {id: id}
    }).subscribe({
      next: ({value}) => {
        getOrderById();
        console.log('le wath onCreateDish:', value);
      },
      error: err => {
        console.warn(err);
      },
    });
    return () => subscription.unsubscribe();
  };

  return (
    <View style={{backgroundColor: 'lightgrey', height: '100%'}}>
      <View style={{backgroundColor:'#FF5963', alignItems:'center'}}>
        <Text style={{color:'#fff', fontWeight:'bold'}}>{ englishToFrench[order?.status] || 'Chargement...'}</Text>
      </View>
      <MapView
        style={styles.map}
        ref={mapRef}
        showsUserLocation
        initialRegion={{
          latitude: 33.9966493,
          longitude: -6.8487574,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}>
        {courier?.lat && (
          <Marker coordinate={{latitude: courier.lat, longitude: courier.lng}}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="motorcycle" size={20} color="#fff" />
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    // zIndex: 1,
  },
  iconContainer: {
    padding: 5,
    backgroundColor: 'green',
    borderRadius: 40,
    borderColor: '#000',
  },
});
