import {DataStore} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {Order, OrderDish} from '../models';
import {useAuthContext} from './AuthContext';
import {useBasketContext} from './BasketContext';

const orderContext = createContext();

const OrderContextProvider = ({children}) => {
  const {dbUser} = useAuthContext();
  const {restaurantInfos, totalPrice, basketDishes, basket} =
    useBasketContext();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    DataStore.query(Order, o => o.userID('eq', dbUser?.id)).then(setOrders);
  }, [dbUser]);

  const createOrder = async () => {
    // create the order
    const newOrder = await DataStore.save(
      new Order({
        userId: dbUser.id,
        Restaurant: restaurantInfos,
        status: 'NEW',
        total: totalPrice,
      }),
    );

    // add all basketDishes to the order
    await Promise.all(
      basketDishes.map(basketDish =>
        DataStore.save(
          new OrderDish({
            quantity: basketDish.quantity,
            orderID: newOrder.id,
            Dish: basketDish.Dish,
          }),
        ),
      ),
    );

    // Delete basket
    await DataStore.delete(basket);

    setOrders([...orders, newOrder]);

    return newOrder;
  };

  const getOrder = async id => {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, od =>
      od.orderID('eq', id),
    );

    return {...order, dishes: orderDishes};
  };

  return (
    <orderContext.Provider value={{createOrder, orders, getOrder, setOrders}}>
      {children}
    </orderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(orderContext);
