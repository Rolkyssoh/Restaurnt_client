import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RestaurantHome from './RestaurantHome';
import ShopHome from './ShopHome';
import {View, Text, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';

const TabTop = createMaterialTopTabNavigator();

export const HomeScreen = ({navigation, route}) => {
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    console.log('the routes:', route);
    console.log('the navigation:', navigation);
  }, []);

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
      <TabTop.Navigator
        screenOptions={{
          tabTopBarLabelStyle: {fontSize: 10, fontWeight: 'bold'},
          tabTopBarIndicatorStyle: {opacity: 0},
          tabBarIndicatorStyle: {backgroundColor: 'yellowgreen'},
          tabBarActiveTintColor: 'yellowgreen',
          tabBarInactiveTintColor: 'gray',
        }}>
        <TabTop.Screen name="RestaurantHome" options={{title: 'Restaurants'}}>
          {() => <RestaurantHome search={searchTerm} />}
        </TabTop.Screen>

        <TabTop.Screen name="ShopHome" options={{title: 'Boutiques'}}>
          {() => <ShopHome search={searchTerm} />}
        </TabTop.Screen>
      </TabTop.Navigator>
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
