import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  BasketScreen,
  DishDetailsSCreen,
  HomeScreen,
  OrdersScreen,
  ProfileScreen,
  RestaurantHomeScreen,
} from '../../screens';
import {OrderDetailsNavigator} from './OrderDetailsNavigator';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAuthContext} from '../../contexts/AuthContext';
import {ActivityIndicator} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const HomeStackRoutes = createNativeStackNavigator();
const OrdersStackRoutes = createNativeStackNavigator();

export const RootNavigator = () => {
  const {dbUser, loading} = useAuthContext();

  if (loading) {
    return (
      <ActivityIndicator
        size={'large'}
        color="#000"
        style={{alignSelf: 'center', marginTop: 60}}
      />
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {dbUser ? (
        <Stack.Screen name="HomeTabs" component={HomeTabsRoutes} />
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

const HomeTabsRoutes = () => {
  return (
    <Tab.Navigator barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Accueil"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Commande(s)"
        component={OrdersStackNavigator}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStackNavigator = () => {
  return (
    <HomeStackRoutes.Navigator>
      <HomeStackRoutes.Screen
        name="Restaurants"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen
        name="Restaurant"
        component={RestaurantHomeScreen}
        options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen name="Dish" component={DishDetailsSCreen} />
      <HomeStackRoutes.Screen
        name="Basket"
        component={BasketScreen}
        options={{title: 'Panier'}}
      />
    </HomeStackRoutes.Navigator>
  );
};

const OrdersStackNavigator = () => {
  return (
    <OrdersStackRoutes.Navigator>
      <OrdersStackRoutes.Screen name="Orders" component={OrdersScreen} />
      <OrdersStackRoutes.Screen
        name="Order"
        component={OrderDetailsNavigator}
      />
    </OrdersStackRoutes.Navigator>
  );
};
