import {DataStore} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {Basket, BasketDish} from '../models';
import {useAuthContext} from './AuthContext';
import {useDishContext} from './DishContext';

const BasketContext = createContext();

const BasketContextProvider = ({children}) => {
  const {dbUser} = useAuthContext();
  const {setQuantity, quantity} = useDishContext();

  const [restaurantInfos, setRestaurantInfos] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);

  const totalPrice = basketDishes.reduce(
    (sum, basketDish) =>
      basketDish.Dish != null &&
      sum + basketDish.quantity * basketDish.Dish.price,
    restaurantInfos?.deliveryFee,
  );

  // useEffect(() => {
  //   if (basketDishes.length <= 1) {
  //     console.log('the once basket:', basketDishes[0]);
  //     if (basketDishes[0] && basketDishes[0].quantity === 0) {
  //       setBasketDishes([]);
  //     }
  //   }
  // }, [quantity]);

  useEffect(() => {
    DataStore.query(Basket, b =>
      b.restaurantID('eq', restaurantInfos?.id).userID('eq', dbUser?.id),
    ).then(baskets => setBasket(baskets[0]));

    console.log({restaurantInfos});
  }, [dbUser, restaurantInfos]);

  useEffect(() => {
    DataStore.query(BasketDish, bd => bd.basketID('eq', basket?.id)).then(
      currentBasketDishes => {
        console.log({currentBasketDishes});
        if (currentBasketDishes.length === 1) {
          if (currentBasketDishes[0].quantity === 0) setBasketDishes([]);
        } else {
          setBasketDishes(currentBasketDishes);
        }
      },
    );
  }, [basket]);

  const addDishToBasket = async (dish, quantity) => {
    // get the existing basket or create a new one
    let theBasket = basket ?? (await createNewBasket());

    console.log('Quantity in AddDishToBasket:', quantity);

    const basketDishToUpdate = basketDishes.find(_ => _.Dish.id === dish.id);
    const ids = basketDishes.map(_ => _.Dish.id);
    const dishIsInBasket = ids.includes(dish.id);
    if (dishIsInBasket) {
      console.log('Is dish is in Basket?:', dishIsInBasket);
      // Increase Qty
      DataStore.save(
        BasketDish.copyOf(basketDishToUpdate, updated => {
          updated.quantity = quantity;
        }),
      );
      await DataStore.query(BasketDish, bd =>
        bd.basketID('eq', basket?.id),
      ).then(setBasketDishes);
    } else {
      // create a BasketDish item and save to Datastore
      const newDish = await DataStore.save(
        new BasketDish({quantity, Dish: dish, basketID: theBasket.id}),
      );
      setBasketDishes([...basketDishes, newDish]);
    }
  };

  const createNewBasket = async () => {
    const newBasket = await DataStore.save(
      new Basket({userID: dbUser.id, restaurantID: restaurantInfos.id}),
    );
    setBasket(newBasket);
    return newBasket;
  };

  return (
    <BasketContext.Provider
      value={{
        addDishToBasket,
        setRestaurantInfos,
        restaurantInfos,
        basket,
        basketDishes,
        totalPrice,
        setBasketDishes,
      }}>
      {children}
    </BasketContext.Provider>
  );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);
