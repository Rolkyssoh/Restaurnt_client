import {useNavigation} from '@react-navigation/native';
import {API, graphqlOperation} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {createOrder, createOrderDish, deleteBasket} from '../graphql/mutations';
import {getOrder} from '../graphql/queries';
import {useAuthContext} from './AuthContext';
import {useBasketContext} from './BasketContext';

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

  const [orders, setOrders] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    if (dbUser?.id)
      API.graphql(graphqlOperation(listOrdersByDbUser, {id: dbUser.id})).then(
        resp => {
          // const ordersList = resp.data.listOrders.items.filter(_ => !_._deleted);
          // setOrders(ordersList);
          const userIsOrders = resp.data.getUser.Orders.items.filter(
            _ => !_._deleted,
          );
          console.log('get orderssss:', userIsOrders);
          setOrders(userIsOrders);
        },
      );
  }, [dbUser]);

  // NEW ORDER FOR DISHES
  const createNewOrder = async () => {
    setOrderLoading(true);
    // create the order
    const newOrder = await API.graphql(
      graphqlOperation(createOrder, {
        input: {
          userID: dbUser.id,
          orderStructureId: restaurantInfos.id,
          status: 'NEW',
        },
        Structure: restaurantInfos,
      }),
    );

    // add all basketDishes to the order
    await Promise.all(
      basketDishes.map(basketDish => {
        API.graphql(
          graphqlOperation(createOrderDish, {
            input: {
              quantity: basketDish.quantity,
              orderID: newOrder.data.createOrder.id,
              orderDishDishId: basketDish.Dish.id,
            },
            Dish: basketDish.Dish,
          }),
        );
      }),
    );

    // get the new created order with all details
    const theCompltedNewOrder = await API.graphql(
      graphqlOperation(getOrder, {id: newOrder.data.createOrder.id}),
    );

    console.log({theCompltedNewOrder});

    console.log('le basket dans orderContext:', basket);

    if (theCompltedNewOrder) {
      setOrderLoading(false);
      // Delete basket
      API.graphql(
        graphqlOperation(deleteBasket, {
          input: {
            _version: basket.data
              ? basket.data.createBasket._version
              : basket._version,
            id: basket.data ? basket.data.createBasket.id : basket.id,
          },
        }),
      );
    }

    setBasket(null);
    setOrders([theCompltedNewOrder.data.getOrder, ...orders]);

    return newOrder;
  };

  // NEW ORDER FOR INGREDIENT
  const createIngredientOrder = async () => {
    setOrderLoading(true);
    // create the order
    const newIngredientOrder = await API.graphql(
      graphqlOperation(createOrder, {
        input: {
          userID: dbUser.id,
          orderStructureId: shopInfos.id,
          status: 'NEW',
        },
        Structure: shopInfos,
      }),
    );

    // add all basketDishes to the order
    await Promise.all(
      basketDishes.map(basketIngredient => {
        API.graphql(
          graphqlOperation(createOrderDish, {
            input: {
              quantity: basketIngredient.quantity,
              orderID: newIngredientOrder.data.createOrder.id,
              orderDishIngredientId: basketIngredient.Ingredient.id,
            },
            Ingredient: basketIngredient.Ingredient,
          }),
        );
      }),
    );

    // get the new created order with all details
    const theCompltedNewOrder = await API.graphql(
      graphqlOperation(getOrder, {id: newIngredientOrder.data.createOrder.id}),
    );

    console.log({theCompltedNewOrder});

    if (theCompltedNewOrder) {
      setOrderLoading(false);
      // Delete basket
      await API.graphql(
        graphqlOperation(deleteBasket, {
          input: {
            _version: basket.dat
              ? basket.data.createBasket._version
              : basket._version,
            id: basket.data ? basket.data.createBasket.id : basket.id,
          },
        }),
      );
    }
    setBasket(null);
    setOrders([newIngredientOrder.data.createOrder, ...orders]);
    // navigation.navigate('orderList');

    return newIngredientOrder;
  };

  const getOrderById = async id => {
    const order = await API.graphql(graphqlOperation(getOrder, {id}));
    const theGetOrder = order.data.getOrder;

    const orderDishesByOrderId = await API.graphql(
      graphqlOperation(listOrderDishesByOrderId, {id}),
    );
    const notDeletedDishes =
      orderDishesByOrderId.data.getOrder.OrderDishes.items.filter(
        _ => !_._deleted,
      );

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

export const listOrdersByDbUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      Orders {
        items {
          id
          status
          userID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderStructureId
          orderCourierId
          OrderDishes {
            items {
              id
              quantity
              createdAt
              updatedAt
              _deleted
              Dish {
                id
                name
                image
                description
                price
                structureID
                createdAt
                updatedAt
                _version
                _deleted
                _lastChangedAt
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
                _version
                _deleted
                _lastChangedAt
              }
            }
            nextToken
            startedAt
          }
          Structure {
            id
            name
            image
            deliveryFee
            minDeliveryTim
            maxDeliveryTime
            rating
            address
            lat
            lng
            type
            adminSub
            createdAt
            updatedAt
            _version
            _deleted
            _lastChangedAt
          }
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
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
            _version
            _deleted
            _lastChangedAt
          }
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          orderDishDishId
          orderDishIngredientId
        }
        nextToken
        startedAt
      }
      Structure {
        id
        name
        image
        deliveryFee
        minDeliveryTim
        maxDeliveryTime
        rating
        address
        lat
        lng
        type
        adminSub
        Dishes {
          nextToken
          startedAt
        }
        Ingredients {
          nextToken
          startedAt
        }
        Baskets {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      Courier {
        id
        name
        sub
        lat
        lng
        tranportationMode
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      orderStructureId
      orderCourierId
    }
  }
`;
