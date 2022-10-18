import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {Image} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

export const OrderListItem = ({order}) => {
  const navigation = useNavigation();

  // const OrderStatus = {
  //   NEW: 'NEW',
  //   COOKING: 'COOKING',
  //   READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  //   PICKED_UP: 'PICKED_UP',
  //   COMPLETED: 'COMPLETED',
  //   ACCEPTED: 'ACCEPTED',
  // };

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Order', {id: order.id})}>
      <Image source={{uri: order.Restaurant.image}} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{order.Restaurant.name}</Text>
        <Text style={{marginVertical: 5, color: '#000'}}>
          3 items &#8226; $38.45
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: '#000'}}>2 days ago &#8226; </Text>
          {order.status === 'NEW' && (
            <Text style={{color: 'green', fontWeight: 'bold'}}>NOUVELLE</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 80,

    shadowColor: '#000',
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
  },
  detailsContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    flex: 1,
    height: '100%',
  },
  name: {fontWeight: 'bold', fontSize: 16, color: '#000'},
});
