import {DataStore} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {Order, OrderDish} from '../models';
import {useAuthContext} from './AuthContext';
import {useBasketContext} from './BasketContext';

const orderContext = createContext();

const OrderContextProvider = ({children}) => {
  const {dbUser} = useAuthContext();
  const {restaurantInfos, totalPrice, basketDishes, basket, setBasket} =
    useBasketContext();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    DataStore.query(Order, o => o.userID('eq', dbUser?.id)).then(test => {
      console.log('result set orders:', test);
      console.log('result set orders user:', dbUser);
      setOrders(test);
    });
    console.log('on set le orders ici!!!');
  }, [dbUser]);

  const createOrder = async () => {
    // create the order
    console.log('dans le createOrder');
    // const newOrder = await DataStore.save(
    //   new Order({
    //     userId: dbUser.id,
    //     Restaurant: restaurantInfos,
    //     status: 'NEW',
    //     total: totalPrice,
    //   }),
    // );

    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
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
    setBasket(null);

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
