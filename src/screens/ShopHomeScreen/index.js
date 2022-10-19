import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const ShopStackNavigator = createNativeStackNavigator();

export const ShopeHomeScreen = () => {
  return (
    <View>
      <Text>ShopeHomeScreen</Text>
    </View>
    // <ShopStackNavigator.Navigator>
    // <ShopStackNavigator.Screen name='ShopsList' />
    // <ShopStackNavigator.Screen name='Shop' />
    // <ShopStackNavigator.Screen name='Article' />
    // <ShopStackNavigator.Screen name='ShopBasket' />
    // </ShopStackNavigator.Navigator>
  );
};
