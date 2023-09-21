import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RestaurantHome from './RestaurantHome';
import ShopHome from './ShopHome';
import {View, Text, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TabTop = createMaterialTopTabNavigator();

export const HomeScreen = ({navigation, route}) => {
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    console.log('the routes:', route);
    console.log('the navigation:', navigation);
  }, []);

  return (
    <View style={{flex:1, backgroundColor:'#249689'}}>
      <SearchBar
        placeholder="Que recherchez vous?"
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={{
          height: 43,
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        inputStyle={{color: '#000'}}
        placeholderTextColor="#000"
        searchIcon={{color: '#000'}}
        value={searchTerm}
        onChangeText={e => setSearchTerm(e)}
        onClear={() => setSearchTerm('')}
      />
      <TabTop.Navigator
        screenOptions={{
          tabBarStyle:{ borderTopLeftRadius:40},
          tabTopBarLabelStyle: {fontSize: 20, fontWeight: 'bold'},
          tabTopBarIndicatorStyle: {opacity: 0},
          tabBarIndicatorStyle: {backgroundColor: '#249689'},
          tabBarActiveTintColor: '#249689',
          tabBarInactiveTintColor: 'gray',
          tabBarItemStyle:{flexDirection:'row' },
        }}>
        <TabTop.Screen 
          name="RestaurantHome"
          options={{
            title: 'Restaurants',
            tabBarShowIcon:true,
            tabBarIcon: ({focused }) => (<MaterialIcons name="restaurant-menu" size={20} color={ focused ? "#249689" : "gray"} />)
          }}
        >
          {() => <RestaurantHome search={searchTerm.toLowerCase()} />}
        </TabTop.Screen>

        <TabTop.Screen 
          name="ShopHome" 
          options={{
            title: 'Boutiques',
            tabBarShowIcon:true,
            tabBarIcon: ({focused }) => (<MaterialIcons name="shopping-cart" size={20} color={ focused ? "#249689" : "gray"} />)
          }}
        >
          {() => <ShopHome search={searchTerm.toLowerCase()} />}
        </TabTop.Screen>
      </TabTop.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    borderColor: 'transparent',
    borderRadius:25,
    backgroundColor: 'white',
    height: 45,
    marginHorizontal: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
