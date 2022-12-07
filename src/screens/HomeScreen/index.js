import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RestaurantHome from './RestaurantHome';
import ShopHome from './ShopHome';
import {View, Text, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';

const Tab = createMaterialTopTabNavigator();

export const HomeScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <SearchBar
        placeholder="Que recherchez vous?"
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={{height: 35, backgroundColor: 'lightgrey'}}
        value={searchTerm}
        onChangeText={e => setSearchTerm(e)}
        onClear={() => setSearchTerm('')}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {fontSize: 10, fontWeight: 'bold'},
          tabBarIndicatorStyle: {opacity: 0},
        }}>
        <Tab.Screen name="RestaurantHome" options={{title: 'Restaurants'}}>
          {() => <RestaurantHome search={searchTerm} />}
        </Tab.Screen>

        <Tab.Screen name="ShopHome" options={{title: 'Boutiques'}}>
          {() => <ShopHome search={searchTerm} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    borderColor: 'lightgrey',
    borderTopColor: 'lightgrey',
    borderBottomColor: 'lightgrey',
    borderWidth: 1,
    backgroundColor: '#fff',
    height: 45,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
