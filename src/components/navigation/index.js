import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {
  AskedFeatures,
  BasketScreen,
  BugsScreen,
  DishDetailsSCreen,
  EntryScreen,
  HomeScreen,
  IngredientDetailsSCreen,
  OrdersScreen,
  ProfileScreen,
  RestaurantHomeScreen,
  ShopeHomeScreen,
  UserAccountScreen,
  WelcomeScreen,
} from '../../screens';
import {OrderDetailsNavigator} from './OrderDetailsNavigator';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useAuthContext} from '../../contexts/AuthContext';
import {ActivityIndicator, View, AsyncStorageStatic} from 'react-native';
import {Text} from '@rneui/themed';
import {UserType} from '../../models';
import {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignUpScreen } from '../../screens/SignUpScreen';
import { LoginScreen } from '../../screens/LoginSceen';

const TabTop = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();
const HomeStackRoutes = createNativeStackNavigator();

const NotAuthorize = () => {
  useEffect(() => {
    setTimeout(() => {
      console.log("Retardée d'une seconde.");
      Auth.signOut();
    }, 3000);
  }, []);
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
    <TabBottom.Navigator barStyle={{backgroundColor: '#249689'}}>
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
        name="Compte"
        component={UserAccountScreen}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.push('HomeTabs', {screen: 'Compte'});
          },
        })}
        options={{
          tabBarIcon: ({color}) => (
            <Entypo name="user" size={24} color={color} />
          ),
        }}
      />
    </TabBottom.Navigator>
  );
};

export const RootNavigator = () => {
  const {dbUser, loading, authUser} = useAuthContext();

  useEffect(() => {
    console.log('le dbUser dans root nav:', dbUser);
  }, [dbUser]);

  if (loading) {
    return (
      // <ActivityIndicator
      //   size={'large'}
      //   color="#000"
      //   style={{alignSelf: 'center', marginTop: 60}}
      // />
      <EntryScreen />
    );
  }

  // useEffect(() => {
  //   async function getCurrentAndPreviousRoute(){
  //     try {
  //       const previous = await AsyncStorage.getItem('@thePreviousRouteName')
  //       if(previous != "Welcome")
  //         await AsyncStorage.setItem('@viewWelomeScreen', true)
  //     } catch (error) {
  //       console.log('Error while getting route in navigation::', error)
  //     } 
  //   }
    
  //   getCurrentAndPreviousRoute();
  // },[])

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {dbUser ? (
        dbUser.type === UserType.CUSTOMER ? (
          // <Stack.Screen name="HomeTabs" component={HomeTabsRoutes} />
          <Stack.Screen name="HomeStack" component={HomeStackNavigator} />
        ) : (
          <Stack.Screen name="NotFound" component={NotAuthorize} />
        )
      ) :<Stack.Screen name="Profile" component={ProfileScreen} />}
    </Stack.Navigator>
  );
};

const HomeStackNavigator = props => {
  const {authUser} = useAuthContext();
  const [viewWelcomeScreen, setViewWelcomeScreen] = useState('false')

  useEffect(() => {
    async function getPreviousRoute(){
      try {
        const viewWelome = await AsyncStorage.getItem('@viewWelomeScreen')
        setViewWelcomeScreen(viewWelome)
      } catch (error) {
        console.log('Error while getting route in navigation::', error)
      } 
    }
    
    getPreviousRoute();
  },[])

  return (
    <HomeStackRoutes.Navigator>
      {/* <HomeStackRoutes.Screen
        name="Restaurants"
        component={HomeScreen}
        options={{headerShown: false}}
      /> */}
      {!authUser && viewWelcomeScreen ==='true' && <HomeStackRoutes.Screen 
        name='Welcome'
        component={WelcomeScreen}
        options={{headerShown: false}} 
      />}
      
      {/* {!authUser && <HomeStackRoutes.Screen
        name="signup"
        component={SignUpScreen}
        options={{headerShown: false}}
      />}
      {!authUser && <HomeStackRoutes.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />} */}
      <HomeStackRoutes.Screen
        name="HomeTabs"
        component={HomeTabsRoutes}
        options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen
        name="Restaurant"
        component={RestaurantHomeScreen}
        options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen
        name="Dish"
        component={DishDetailsSCreen}
        options={{title: 'Détail du plat'}}
      />
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
        options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen name="Order" component={OrderDetailsNavigator} />
      <HomeStackRoutes.Screen
        name="Profile"
        component={ProfileScreen}
        // options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen
        name="Bugs"
        component={BugsScreen}
        // options={{headerShown: false}}
      />
      <HomeStackRoutes.Screen
        name="Features"
        component={AskedFeatures}
        // options={{headerShown: false}}
      />
      {/* <HomeStackRoutes.Screen
        name="UserAccount"
        component={UserAccountScreen}
      /> */}
    </HomeStackRoutes.Navigator>
  );
};
