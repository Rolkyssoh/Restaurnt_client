import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {OrderDetailsScreen, PositionOrderDeliveryScreen} from '../../screens';

const Tab = createMaterialTopTabNavigator();

export const OrderDetailsNavigator = ({route}) => {
  const id = route?.params.id;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details">
        {() => <OrderDetailsScreen id={id} />}
      </Tab.Screen>
      <Tab.Screen name="Livraison">
        {() => <PositionOrderDeliveryScreen id={id} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
