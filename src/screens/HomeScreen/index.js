import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RestaurantHome from './RestaurantHome';
import ShopHome from './ShopHome';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 10, fontWeight: 'bold'},
        tabBarIndicatorStyle: {opacity: 0},
      }}>
      <Tab.Screen
        name="RestaurantHome"
        component={RestaurantHome}
        options={{title: 'Restaurants'}}
      />
      <Tab.Screen
        name="ShopHome"
        component={ShopHome}
        options={{title: 'Boutiques'}}
      />
    </Tab.Navigator>
  );
};
