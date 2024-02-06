import {useNavigation} from '@react-navigation/native';
import {createContext, useContext, useEffect, useState} from 'react';
import {createOrder, createOrderDish, deleteBasket} from '../graphql/mutations';
import {getOrder} from '../graphql/queries';
import {useAuthContext} from './AuthContext';
import {useBasketContext} from './BasketContext';
import { OrderStatus } from '../models';
import {generateClient} from 'aws-amplify/api';

const orderContext = createContext();

const OrderContextProvider = ({children}) => {
  const navigation = useNavigation();
  const {dbUser} = useAuthContext();
  const {
    restaurantInfos,
    shopInfos,
    totalPrice,
    basketDishes,
    basket,
    setBasket,
  } = useBasketContext();
  const client = generateClient()

  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (dbUser?.id) getOrdersByDbUser()
      
  }, [dbUser]);

  const getOrdersByDbUser = async () => {
    const theOrders = await client.graphql({
      query: listOrdersByDbUser,
      variables:{id: dbUser.id}
    })
    setOrders(theOrders.data.getUser.Orders.items)
  }

  // NEW ORDER FOR DISHES
  const createNewOrder = async () => {
    setOrderLoading(true);
    // create the order
    const newOrder = await client.graphql({
      query: createOrder,
      variables: {
        input: {
          userID: dbUser.id,
          structureID: restaurantInfos.id,
          status: OrderStatus.NEW
        }
      }
    })

    console.log('the new created order:', newOrder);

    // add all basketDishes to the order
    await Promise.all(
      basketDishes.map(basketDish => {
        client.graphql({
          query:createOrderDish,
          variables: {
            input: {
              quantity: basketDish.quantity,
              orderID: newOrder.data.createOrder.id,
              orderDishDishId: basketDish.Dish.id,
            },
            Dish: basketDish.Dish
          }
        })
      }),
    );

    if (newOrder) {
      // get the new created order with all details
      const theCompltedNewOrder = await client.graphql({
        query: getOrderByOrderId,
        variables: {id: newOrder.data.createOrder.id}
      })
      console.log({theCompltedNewOrder});

      console.log('le basket dans orderContext:', basket);

      if (theCompltedNewOrder) {
        setOrderLoading(false);
        // Delete basket
        await client.graphql({
          query: deleteBasket,
          variables: {
            input: {
              id: basket.data ? basket.data.createBasket.id : basket.id
            }
          }
        })
      }

      setBasket(null);
      setOrders([theCompltedNewOrder.data.getOrder, ...orders]);
    }

    return newOrder;
  };

  // NEW ORDER FOR INGREDIENT
  const createIngredientOrder = async () => {
    setOrderLoading(true);
    // create the order
    const newIngredientOrder = await client.graphql({
      query: createOrder,
      variables: {
        input: {
          userID: dbUser.id,
          structureID: shopInfos.id,
          status: 'NEW',
        }
      }
    })

    console.log('the new created ingredient  order:', newIngredientOrder);

    // add all basketDishes to the order
    await Promise.all(
      basketDishes.map(basketIngredient => {
        client.graphql({
          query: createOrderDish,
          variables: {
            input: {
              quantity: basketIngredient.quantity,
              orderID: newIngredientOrder.data.createOrder.id,
              orderDishIngredientId: basketIngredient.Ingredient.id,
            },
            Ingredient: basketIngredient.Ingredient
          }
        })
      }),
    );

    // get the new created order with all details
    if (newIngredientOrder) {
      const theCompltedNewOrder = await client.graphql({
        query: getOrderByOrderId,
        variables: { id: newIngredientOrder.data.createOrder.id}
      })

      console.log({theCompltedNewOrder});

      if (theCompltedNewOrder) {
        setOrderLoading(false);
        // Delete basket
        await client.graphql({
          query: deleteBasket,
          variables: {
            input: {id: basket.data ? basket.data.createBasket.id : basket.id}
          }
        })
      }
      setBasket(null);
      setOrders([theCompltedNewOrder.data.getOrder, ...orders]);
      // navigation.navigate('orderList');
    }

    return newIngredientOrder;
  };

  const getOrderById = async id => {
    console.log('we get the iiidd hereee:::', id)
    const order = await client.graphql({
      query: getOrder,
      variables: {id: id}
    })
    const theGetOrder = order.data.getOrder;
    console.log('the returned oooorder::::', theGetOrder)

    const orderDishesByOrderId = await client.graphql({
      query: listOrderDishesByOrderId,
      variables: {id: id}
    })
    const notDeletedDishes = orderDishesByOrderId.data.getOrder.OrderDishes.items;
      // .filter(
      //   _ => !_._deleted,
      // );

    return {...theGetOrder, dishes: notDeletedDishes};
  };

  return (
    <orderContext.Provider
      value={{
        createNewOrder,
        createIngredientOrder,
        orders,
        getOrderById,
        setOrders,
        orderLoading,
      }}>
      {children}
    </orderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(orderContext);

export const getOrderByOrderId = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      status
      userID
      structureID
      courierID
      OrderDishes {
        items {
          id
          quantity
          orderID
          createdAt
          updatedAt
          orderDishDishId
          orderDishIngredientId
          Dish {
            id
            name
            image
            description
            price
            structureID
            createdAt
            updatedAt
          }
          Ingredient {
            id
            name
            image
            description
            price
            structureID
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const listOrdersByDbUser = /* GraphQL */ ` 
  query GetUser($id: ID!) {
    getUser(id: $id) {
      Orders {
        items {
          id
          status
          userID
          structureID
          courierID
          createdAt
          updatedAt
          OrderDishes {
            items {
              id
              quantity
              createdAt
              updatedAt
              Dish {
                id
                name
                image
                description
                price
                structureID
                createdAt
                updatedAt
              }
              Ingredient {
                id
                name
                image
                description
                price
                structureID
                createdAt
                updatedAt
              }
            }
            nextToken
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

export const listOrderDishesByOrderId = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      OrderDishes {
        items {
          id
          quantity
          orderID
          Dish {
            id
            name
            image
            description
            price
            structureID
            createdAt
            updatedAt
          }
          Ingredient {
            id
            name
            image
            description
            price
            structureID
            createdAt
            updatedAt
          }
          createdAt
          updatedAt
          orderDishDishId
          orderDishIngredientId
        }
        nextToken
      }
      structureID
      createdAt
      updatedAt
    }
  }
`;
