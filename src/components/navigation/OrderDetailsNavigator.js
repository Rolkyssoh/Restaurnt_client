import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {OrderDetailsScreen, PositionOrderDeliveryScreen} from '../../screens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createMaterialTopTabNavigator();

export const OrderDetailsNavigator = ({route}) => {
  const id = route?.params?.id;

  return (
    <Tab.Navigator
      screenOptions={{
        tabTopBarIndicatorStyle: {opacity: 0},
         tabBarIndicatorStyle: {backgroundColor: '#249689'},
        tabBarActiveTintColor: '#249689',
        tabBarInactiveTintColor: 'gray',
        tabBarItemStyle:{flexDirection:'row' },
      }}
    >
      <Tab.Screen 
        name="Details"
        options={{
          title: 'Details',
          tabBarShowIcon:true,
          tabBarIcon: ({focused }) => (<MaterialIcons name="details" size={20} color={ focused ? "#249689" : "gray"} />)
        }}
      >
        {() => <OrderDetailsScreen id={id} />} 
      </Tab.Screen>
      <Tab.Screen 
        name="Livraison"
        options={{
          title: 'Livraison',
          tabBarShowIcon:true,
          tabBarIcon: ({focused }) => (<MaterialIcons name="delivery-dining" size={20} color={ focused ? "#249689" : "gray"} />)
        }}
      >
        {() => <PositionOrderDeliveryScreen id={id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
