import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {OrderDetailsScreen, PositionOrderDeliveryScreen} from '../../screens';

const Tab = createMaterialTopTabNavigator();

export const OrderDetailsNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Details" component={OrderDetailsScreen} />
      <Tab.Screen name="Livraison" component={PositionOrderDeliveryScreen} />
    </Tab.Navigator>
  );
};
