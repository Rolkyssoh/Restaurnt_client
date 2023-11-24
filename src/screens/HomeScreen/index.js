import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import RestaurantHome from './RestaurantHome';
import ShopHome from './ShopHome';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabTop = createMaterialTopTabNavigator();

export const HomeScreen = ({navigation, route}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewFavorites, setViewFavorites] = useState(false)
  useEffect(() => {
    console.log('the routes:', route);
    console.log('the navigation:', navigation);
  }, []);

  const doHandleFavorite = (action) => {
    console.log('Cliquedd!!', action)
    setViewFavorites(!viewFavorites)
  }

  return (
    <View style={{flex:1, backgroundColor:'#249689'}}>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
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
        <View style={styles.singleView} />
        <View style={styles.iconView}>
          { viewFavorites ? <Ionicons
            name="bookmark"
            size={30}
            color="#FF5963"
            onPress={() => doHandleFavorite('remove')}
          /> :
          <Ionicons
            name="bookmark-outline"
            size={30}
            color="#FF5963"
            onPress={() => doHandleFavorite('add')}
          />}
        </View>
      </View>
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
          {() => <RestaurantHome search={searchTerm.toLowerCase()} showFavorites={viewFavorites} />}
        </TabTop.Screen>

        <TabTop.Screen 
          name="ShopHome" 
          options={{
            title: 'Boutiques',
            tabBarShowIcon:true,
            tabBarIcon: ({focused }) => (<MaterialIcons name="shopping-cart" size={20} color={ focused ? "#249689" : "gray"} />)
          }}
        >
          {() => <ShopHome search={searchTerm.toLowerCase()} showFavorites={viewFavorites} />}
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
    flex:1,
    marginLeft: 10,
    marginRight:5,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleView:{
    backgroundColor:'#249689', 
    // backgroundColor:'red', 
    width:28, 
    alignSelf:'center', 
    height:45,
    // marginLeft:-20,
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25,
    position:'absolute',
    // left:324
    right:60
  },
  iconView:{
    backgroundColor:'#fff',
    marginRight:10,
    height:45,
    width:45,
    alignSelf:'center',
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center'
  }
});
