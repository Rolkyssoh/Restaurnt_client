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
import {generateClient} from 'aws-amplify/api';

const BasketContext = createContext();

const BasketContextProvider = ({children}) => {
  const {dbUser} = useAuthContext();
  const client = generateClient();
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

  const theBsketByStruct = async (shp, restau) => {
    const theBasketList = await client.graphql({
      query: listBasketsByStructure,
      variables: { id:  restaurantInfos ? restau.id : shp.id}
    })
    console.log('{theBasketList}', theBasketList.data.getStructure.Baskets.items)
    const theBasketListFiltered = theBasketList.data.getStructure.Baskets.items.filter(
      (_) => _.userID === dbUser?.id
    )
    setBasket(theBasketListFiltered[0])
  }

  // FOR RESTAURANT
  useEffect(() => {
    console.log('{shopInfos} nulll,', null)
    console.log({restaurantInfos})
    if (restaurantInfos) theBsketByStruct(null, restaurantInfos)
  }, [dbUser, restaurantInfos]);

  // FOR INGREDIENT
  useEffect(() => {
    if (shopInfos) theBsketByStruct(shopInfos, null)
  }, [dbUser, shopInfos]);

  useEffect(() => {
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
        await client.graphql({
          query: deleteBasketDish,
          variables: {
            input: { id: basketDishToUpdate.id }
          }
        })
      } else {
        await client.graphql({
          query: updateBasketDish,
          variables: {
            input: {
              id: basketDishToUpdate.id,
              quantity: quantity
            }
          }
        })
      }

      const theBasketDish = await client.graphql({
        query: listBasketDishes,
        variables: {
          filter: { basketID : {eq: basket?.id}}
        }
      })
      const basketDishesByBasketId = theBasketDish.data.listBasketDishes.items
      if(basketDishesByBasketId){
        const basketList = await client.graphql({
          query: listBasketsByStructure,
          variables : { id: restaurantInfos?.id }
        })
        const basketListFiltered = basketList.data.getStructure.Baskets.items.filter(
          (_) => _.userID === dbUser?.id
        )
        setBasket(basketListFiltered[0])
      }
      setBasketDishes(basketDishesByBasketId);
      setLoading(false);
    } else {
      //  create a BasketDish item and save
      const newDish = await client.graphql({
        query: createBasketDish,
        variables:{
          input: {
            quantity,
            basketID: theBasket.data
              ? theBasket.data.createBasket.id
              : theBasket.id,
            basketDishDishId: dish?.id,
          },
          Dish: dish,
        }
      })

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
    const newBasket = await client.graphql({
      query: createBasket,
      variables: {
        input: {
          userID: dbUser.id,
          structureID: restaurantInfos.id,
        }
      }
    })
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
        await client.graphql({
          query: deleteBasketDish,
          variables: {
            input: { id: basketDishToUpdate.id }
          }
        });
      } else {
        await client.graphql({
          query: updateBasketDish,
          variables: {
            input: {
              quantity,
              id: basketIngredientToUpdate.id,
            }
          }
        })
      }

      const basketIngred = await client.graphql({
        query: listBasketDishes,
        variables: {
          filter: { basketID: {eq: basket?.id} }
        }
      })
      const basketIngredientsByBasketId = basketIngred.data.listBasketDishes.items
      if(basketIngredientsByBasketId){
        const basketList = await client.graphql({
          query: listBasketsByStructure,
          variables : {id : shopInfos?.id}
        })
        const basketListFiltered = basketList.data.getStructure.Baskets.items.filter(
          (_) => _.userID === dbUser?.id
        )
        setBasket(basketListFiltered[0])
      }

      setBasketDishes(basketIngredientsByBasketId);
      setLoading(false);
    } else {
      const newIngredient = await client.graphql({
        query: createBasketDish,
        variables: {
          input: {
            quantity,
            basketID: theBasket.data
              ? theBasket.data.createBasket.id
              : theBasket.id,
            basketDishIngredientId: ingredient?.id,
          },
          Ingredient: ingredient,
        }
      }) 
      // API.graphql(
      //   graphqlOperation(createBasketDish, {
      //     input: {
      //       quantity,
      //       basketID: theBasket.data
      //         ? theBasket.data.createBasket.id
      //         : theBasket.id,
      //       basketDishIngredientId: ingredient?.id,
      //     },
      //     Ingredient: ingredient,
      //   }),
      // );

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
    const newShopBasket = await client.graphql({
      query: createBasket,
      variables: {
        input: {
          userID: dbUser.id,
          structureID: shopInfos.id,
        }
      }
    })
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
