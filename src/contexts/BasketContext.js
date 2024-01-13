import {API, graphqlOperation} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {
  createBasket,
  createBasketDish,
  deleteBasketDish,
  updateBasketDish,
} from '../graphql/mutations';
import {listBasketDishes, listBaskets} from '../graphql/queries';
import {Basket, BasketDish} from '../models';
import {useAuthContext} from './AuthContext';
import {useDishContext} from './DishContext';

const BasketContext = createContext();

const BasketContextProvider = ({children}) => {
  const {dbUser} = useAuthContext();
  const {setQuantity, quantity} = useDishContext();

  const [restaurantInfos, setRestaurantInfos] = useState(null);
  const [shopInfos, setShopInfos] = useState(null);
  const [basket, setBasket] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (restaurantInfos) {
      const thePrice = basketDishes.reduce(
        (sum, basketDish) =>
          basketDish.Dish != null &&
          sum + basketDish.quantity * basketDish.Dish.price,
        restaurantInfos.deliveryFee,
      );
      setTotalPrice(thePrice);
    } else if (shopInfos) {
      const thePrice = basketDishes.reduce(
        (sum, basketIngredient) =>
          basketIngredient.Ingredient != null &&
          sum + basketIngredient.quantity * basketIngredient.Ingredient.price,
        shopInfos.deliveryFee,
      );
      setTotalPrice(thePrice);
    }
    // const thePrice = restaurantInfos
    //   ? basketDishes.reduce(
    //       (sum, basketDish) =>
    //         basketDish.Dish != null &&
    //         sum + basketDish.quantity * basketDish.Dish.price,
    //       restaurantInfos.deliveryFee,
    //     )
    //   : shopInfos
    //   ? basketDishes.reduce(
    //       (sum, basketIngredient) =>
    //         basketIngredient.Ingredient != null &&
    //         sum + basketIngredient.quantity * basketIngredient.Ingredient.price,
    //       shopInfos.deliveryFee,
    //     )
    //   : 0;
    // setTotalPrice(thePrice);
  }, [basketDishes]);

  // FOR RESTAURANT
  useEffect(() => {
    if (restaurantInfos)
      API.graphql(
        graphqlOperation(listBasketsByStructure, {id: restaurantInfos?.id}),
      ).then(result => {
        const basketList = result.data.getStructure.Baskets.items.filter(
          _ => _.userID === dbUser?.id,
        );
        setBasket(basketList[0]);
      });
  }, [dbUser, restaurantInfos]);

  // FOR INGREDIENT
  useEffect(() => {
    if (shopInfos)
      API.graphql(
        graphqlOperation(listBasketsByStructure, {
          id: shopInfos?.id,
        }),
      ).then(result => {
        const basketList = result.data.getStructure.Baskets.items.filter(
          _ => _.userID === dbUser?.id,
        );
        setBasket(basketList[0]);
      });
  }, [dbUser, shopInfos]);

  useEffect(() => {
    // API.graphql(graphqlOperation(listBasketDishes)).then(resp => {
    //   const basketDishesByBasketId = resp.data.listBasketDishes.items.filter(
    //     _ => !_._deleted && _.basketID === basket?.id,
    //   );
    //   setBasketDishes(basketDishesByBasketId);
    // });
    // const existBd = basket?.BasketDishes?.items.filter(_ => !_._deleted);
    if (basket && restaurantInfos) {
      if (basket.structureID === restaurantInfos.id) {
        setBasketDishes(basket?.BasketDishes?.items);
      }
    } else if (basket && shopInfos) {
      if (basket.structureID === shopInfos.id) {
        setBasketDishes(basket?.BasketDishes?.items);
      }
    }
  }, [basket, restaurantInfos, shopInfos]);

  // FOR DISH
  const addDishToBasket = async (dish, quantity) => {
    setLoading(true);
    // get the existing basket or create a new one
    let theBasket = basket ?? (await createRestaurantNewBasket());

    const basketDishToUpdate = basketDishes.find(_ => _.Dish?.id === dish?.id);

    if (basketDishToUpdate) {
      // emptyed the basketDishes array
      // if (basketDishes.length === 1 && quantity === 0) {
      //   setBasketDishes([]);
      // }
      // // Increase Qty
      if (quantity === 0) {
        // Delete basketDish
        await API.graphql(
          graphqlOperation(deleteBasketDish, {
            input: {
              id: basketDishToUpdate.id,
            },
          }),
        );
      } else {
        await API.graphql(
          graphqlOperation(updateBasketDish, {
            input: {
              quantity,
              id: basketDishToUpdate.id,
            },
          }),
        );
      }

      await API.graphql(graphqlOperation(listBasketDishes)).then(resp => {
        const basketDishesByBasketId = resp.data.listBasketDishes.items.filter(
          _ => _.basketID === basket?.id,
        );
        if (basketDishesByBasketId)
          API.graphql(
            graphqlOperation(listBasketsByStructure, {id: restaurantInfos?.id}),
          ).then(result => {
            const basketList = result.data.getStructure.Baskets.items.filter(
              _ => _.userID === dbUser?.id,
            );
            setBasket(basketList[0]);
          });
        setBasketDishes(basketDishesByBasketId);
        setLoading(false);
      });
    } else {
      //  create a BasketDish item and save
      const newDish = await API.graphql(
        graphqlOperation(createBasketDish, {
          input: {
            quantity,
            basketID: theBasket.data
              ? theBasket.data.createBasket.id
              : theBasket.id,
            basketDishDishId: dish?.id,
          },
          Dish: dish,
        }),
      );

      if (basketDishes.length === 0) {
        setBasketDishes([newDish.data.createBasketDish]);
        setLoading(false);
      } else {
        setBasketDishes([newDish.data.createBasketDish, ...basketDishes]);
        setLoading(false);
      }
    }
  };

  const createRestaurantNewBasket = async () => {
    const newBasket = await API.graphql(
      graphqlOperation(createBasket, {
        input: {
          userID: dbUser.id,
          structureID: restaurantInfos.id,
        },
      }),
    );
    setBasket(newBasket);
    return newBasket;
  };

  // FoR INGREDIENT
  const addIngredientToBasket = async (ingredient, quantity) => {
    setLoading(true);
    // get the existing basket or create a new one
    let theBasket = basket ?? (await createNewShopBasket());

    const basketIngredientToUpdate = basketDishes.find(
      _ => _.Ingredient?.id === ingredient?.id,
    );

    if (basketIngredientToUpdate) {
      // emptyed the basketDishes array
      // if (basketDishes.length === 1) {
      //   if (quantity === 0) setBasketDishes([]);
      // }

      if (quantity === 0) {
        // Delete basketDish
        await API.graphql(
          graphqlOperation(deleteBasketDish, {
            input: {
              id: basketDishToUpdate.id,
            },
          }),
        );
      } else {
        API.graphql(
          graphqlOperation(updateBasketDish, {
            input: {
              quantity,
              id: basketIngredientToUpdate.id,
            },
          }),
        );
      }

      await API.graphql(graphqlOperation(listBasketDishes)).then(resp => {
        const basketIngredientsByBasketId =
          resp.data.listBasketDishes.items.filter(
            _ =>_.basketID === basket?.id,
          );

        if (basketIngredientsByBasketId)
          API.graphql(
            graphqlOperation(listBasketsByStructure, {id: shopInfos?.id}),
          ).then(result => {
            const basketList = result.data.getStructure.Baskets.items.filter(
              _ =>_.userID === dbUser?.id,
            );
            setBasket(basketList[0]);
          });

        setBasketDishes(basketIngredientsByBasketId);
        setLoading(false);
      });
    } else {
      const newIngredient = await API.graphql(
        graphqlOperation(createBasketDish, {
          input: {
            quantity,
            basketID: theBasket.data
              ? theBasket.data.createBasket.id
              : theBasket.id,
            basketDishIngredientId: ingredient?.id,
          },
          Ingredient: ingredient,
        }),
      );

      if (basketDishes.length === 0) {
        setBasketDishes([newIngredient.data.createBasketDish]);
        setLoading(false);
      } else {
        setBasketDishes([newIngredient.data.createBasketDish, ...basketDishes]);
        setLoading(false);
      }
    }
  };

  const createNewShopBasket = async () => {
    const newShopBasket = await API.graphql(
      graphqlOperation(createBasket, {
        input: {
          userID: dbUser.id,
          structureID: shopInfos.id,
        },
      }),
    );
    setBasket(newShopBasket);
    return newShopBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        addIngredientToBasket,
        setRestaurantInfos,
        setShopInfos,
        shopInfos,
        restaurantInfos,
        basket,
        setBasket,
        basketDishes,
        totalPrice,
        setBasketDishes,
        loading,
      }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);

export const listBasketsByStructure = /* GraphQL */ `
  query GetStructure($id: ID!) {
    getStructure(id: $id) {
      Baskets {
        items {
          id
          structureID
          userID
          BasketDishes {
            items {
              id
              quantity
              basketID
              createdAt
              updatedAt
              basketDishDishId
              basketDishIngredientId
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
        nextToken
      }
    }
  }
`;
