import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  BasketScreen,
  DishDetailsSCreen,
  HomeScreen,
  IngredientDetailsSCreen,
  OrdersScreen,
  ProfileScreen,
  RestaurantHomeScreen,
  ShopeHomeScreen,
} from '../../screens';
import {OrderDetailsNavigator} from './OrderDetailsNavigator';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useAuthContext} from '../../contexts/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import {Text} from '@rneui/themed';
import {UserType} from '../../models';
import {useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TabTop = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();
const HomeStackRoutes = createNativeStackNavigator();

const NotAuthorize = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: '#000'}} h4>
        Vous n'êtes pas Authorisé à accéder ici!
      </Text>
    </View>
  );
};

const TabBottom = createMaterialBottomTabNavigator();
export const HomeTabsRoutes = () => {
  return (
    <TabBottom.Navigator barStyle={{backgroundColor: '#fff'}}>
      <TabBottom.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color}) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <TabBottom.Screen
        // name="orderList"
        name="Orders"
        component={OrdersScreen}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // Prevent default action
            // const routes = navigation.getState()?.routes;
            // const prevRoute = routes[routes.length - 2];
            // console.log({prevRoute});
            e.preventDefault();
            console.log('the routeee:', route);

            // Do something with the `navigation` object
            // if (prevRoute.name !== 'Orders')
            navigation.push('HomeTabs', {screen: 'Orders'});
          },
        })}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
          title: 'Commande(s)',
        }}
      />
      <TabTop.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.push('HomeTabs', {screen: 'Profile'});
          },
        })}
        options={{
          tabBarIcon: ({color}) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </TabBottom.Navigator>
  );
};

export const RootNavigator = () => {
  const {dbUser, loading} = useAuthContext();

  useEffect(() => {
    console.log('le dbUser dans root nav:', dbUser);
  }, [dbUser]);

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
        dbUser.type === UserType.CUSTOMER ? (
          // <Stack.Screen name="HomeTabs" component={HomeTabsRoutes} />
          <Stack.Screen name="HomeStack" component={HomeStackNavigator} />
        ) : (
          <Stack.Screen name="NotFound" component={NotAuthorize} />
        )
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};

const HomeStackNavigator = props => {
  useEffect(() => {
    console.log('lehom stack navvvv:', props);
  }, []);
  return (
    <HomeStackRoutes.Navigator>
      {/* <HomeStackRoutes.Screen
        name="Restaurants"
        component={HomeScreen}
        options={{headerShown: false}}
      /> */}
      <HomeStackRoutes.Screen
        name="HomeTabs"
        component={HomeTabsRoutes}
        // options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen
        name="Restaurant"
        component={RestaurantHomeScreen}
        // options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen name="Dish" component={DishDetailsSCreen} />
      <HomeStackRoutes.Screen
        name="IngredientDetails"
        component={IngredientDetailsSCreen}
      />
      <HomeStackRoutes.Screen
        name="Basket"
        component={BasketScreen}
        options={{title: 'Panier'}}
      />

      <HomeStackRoutes.Screen
        name="Shop"
        component={ShopeHomeScreen}
        // options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen name="Order" component={OrderDetailsNavigator} />
    </HomeStackRoutes.Navigator>
  );
};
