import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {Marker} from 'react-native-maps';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const PositionOrderDeliveryScreen = () => {
  return (
    <View>
      <Text>Position Order Delivery Screen</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.9962493,
          longitude: -6.8487574,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
        showsUserLocation>
        <Marker coordinate={{latitude: 33.9962493, longitude: -6.8487574}}>
          <View
            style={{
              padding: 5,
              backgroundColor: 'green',
              borderRadius: 40,
              borderColor: '#000',
            }}>
            <FontAwesome5 name="motorcycle" size={20} color="#fff" />
          </View>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
