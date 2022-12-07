import {API, graphqlOperation} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {
  createBasket,
  createBasketDish,
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
    const thePrice = restaurantInfos
      ? basketDishes.reduce(
          (sum, basketDish) =>
            basketDish.Dish != null &&
            sum + basketDish.quantity * basketDish.Dish.price,
          restaurantInfos.deliveryFee,
        )
      : basketDishes.reduce(
          (sum, basketIngredient) =>
            basketIngredient.Ingredient != null &&
            sum + basketIngredient.quantity * basketIngredient.Ingredient.price,
          shopInfos?.deliveryFee,
        );
    setTotalPrice(thePrice);
  }, [basketDishes]);

  // FOR RESTAURANT
  useEffect(() => {
    if (restaurantInfos)
      API.graphql(
        graphqlOperation(listBasketsByStructure, {id: restaurantInfos?.id}),
      ).then(result => {
        const basketList = result.data.getStructure.Baskets.items.filter(
          _ => !_._deleted && _.userID === dbUser?.id,
        );
        console.log('le response basket:', basketList);
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
          _ => !_._deleted && _.userID === dbUser?.id,
        );
        setBasket(basketList[0]);
        console.log('le basket shoppp:', basketList[0]);
      });
  }, [dbUser, shopInfos]);

  useEffect(() => {
    // API.graphql(graphqlOperation(listBasketDishes)).then(resp => {
    //   const basketDishesByBasketId = resp.data.listBasketDishes.items.filter(
    //     _ => !_._deleted && _.basketID === basket?.id,
    //   );
    //   setBasketDishes(basketDishesByBasketId);
    // });
    console.log('le basket dans basketContext:', basket);
    const existBd = basket?.BasketDishes?.items.filter(_ => !_._deleted);
    if (basket && restaurantInfos) {
      if (basket.structureID === restaurantInfos.id && !basket._deleted) {
        setBasketDishes(existBd);
      }
    } else if (basket && shopInfos) {
      if (basket.structureID === shopInfos.id && !basket._deleted) {
        setBasketDishes(existBd);
      }
    }
  }, [basket, restaurantInfos, shopInfos]);

  // FOR DISH
  const addDishToBasket = async (dish, quantity) => {
    setLoading(true);
    // get the existing basket or create a new one
    let theBasket = basket ?? (await createRestaurantNewBasket());

    const basketDishToUpdate = basketDishes.find(_ => _.Dish?.id === dish?.id);
    const ids = basketDishes.map(_ => _.Dish?.id);
    const dishIsInBasket = ids.includes(dish?.id);

    if (basketDishToUpdate) {
      // emptyed the basketDishes array
      // if (basketDishes.length === 1 && quantity === 0) {
      //   setBasketDishes([]);
      // }
      // // Increase Qty
      await API.graphql(
        graphqlOperation(updateBasketDish, {
          input: {
            _version: basketDishToUpdate._version,
            quantity,
            id: basketDishToUpdate.id,
          },
        }),
      );

      await API.graphql(graphqlOperation(listBasketDishes)).then(resp => {
        const basketDishesByBasketId = resp.data.listBasketDishes.items.filter(
          _ => !_._deleted && _.basketID === basket?.id,
        );
        if (basketDishesByBasketId)
          API.graphql(
            graphqlOperation(listBasketsByStructure, {id: restaurantInfos?.id}),
          ).then(result => {
            const basketList = result.data.getStructure.Baskets.items.filter(
              _ => !_._deleted && _.userID === dbUser?.id,
            );
            console.log('le response basket:', basketList);
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
    console.log('the added:', basket);
    // get the existing basket or create a new one
    let theBasket = basket ?? (await createNewShopBasket());

    const basketIngredientToUpdate = basketDishes.find(
      _ => _.Ingredient?.id === ingredient?.id,
    );
    console.log({basketIngredientToUpdate});
    const ids = basketDishes.map(_ => _.Ingredient.id);
    const ingredientIsInBasket = ids.includes(ingredient.id);
    if (ingredientIsInBasket) {
      console.log('Is dish is in Basket?:', ingredientIsInBasket);
      // emptyed the basketDishes array
      if (basketDishes.length === 1) {
        if (quantity === 0.2) setBasketDishes([]);
      }

      API.graphql(
        graphqlOperation(updateBasketDish, {
          input: {
            _version: basketIngredientToUpdate._version,
            quantity,
            id: basketIngredientToUpdate.id,
          },
        }),
      );

      await API.graphql(graphqlOperation(listBasketDishes)).then(resp => {
        const basketIngredientsByBasketId =
          resp.data.listBasketDishes.items.filter(
            _ => !_._deleted && _.basketID === basket?.id,
          );
        setBasketDishes(basketIngredientsByBasketId);
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

      setBasketDishes([newIngredient.data.createBasketDish, ...basketDishes]);
    }
  };

  const createNewShopBasket = async () => {
    console.log({shopInfos});
    const newShopBasket = await API.graphql(
      graphqlOperation(createBasket, {
        input: {
          userID: dbUser.id,
          structureID: shopInfos.id,
        },
      }),
    );
    console.log('le new basket créeee:', newShopBasket);
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
              _version
              _deleted
              _lastChangedAt
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
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
    }
  }
`;
