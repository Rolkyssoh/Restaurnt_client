import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {API, graphqlOperation} from 'aws-amplify';
import {Courier, Order} from '../../models';
import {getCourier, getOrder, listCouriers} from '../../graphql/queries';

export const PositionOrderDeliveryScreen = ({id}) => {
  const mapRef = useRef(null);
  const [order, setOrder] = useState(null);
  const [courier, setCourier] = useState(null);

  useEffect(() => {
    // DataStore.query(Order, id).then(setOrder);
    API.graphql(graphqlOperation(getOrder, {id})).then(response => {
      console.log('the current user orders:,', response.data.getOrder);
      setOrder(response.data.getOrder);
    });
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
  }, [order]);

  useEffect(() => {
    if (order?.orderCourierId) {
      // DataStore.query(Courier, order.orderCourierId).then(setCourier);

      API.graphql(
        graphqlOperation(getCourier, {id: order.orderCourierId}),
      ).then(result => {
        console.log('the current courier:', result.data.getCourier);
        setCourier(result.data.getCourier);
      });
    }
  }, [order?.orderCourierId]);

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
    // const subscription = DataStore.observe(Courier, courier.id).subscribe(
    //   msg => {
    //     if (msg.opType === 'UPDATE') {
    //       setCourier(msg.element);
    //     }
    //   },
    // );
    // return () => subscription.unsubscribe();
  }, [courier]);

  return (
    <View style={{backgroundColor: 'lightgrey', height: '100%'}}>
      <Text>Status: {order?.status || 'Chargement...'}</Text>
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
