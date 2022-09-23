import {DataStore} from 'aws-amplify';
import {createContext, useContext, useEffect, useState} from 'react';
import {Basket, BasketDish} from '../models';
import {useAuthContext} from './AuthContext';

const BasketContext = createContext();

const BasketContextProvider = ({children}) => {
  const {dbUser} = useAuthContext();

  const [restaurantInfos, setRestaurantInfos] = useState(null);
  const [basket, setBasket] = useState(null);
  const [basketDishes, setBasketDishes] = useState([]);

  const totalPrice = basketDishes.reduce(
    (sum, basketDish) => sum + basketDish.quantity * basketDish.Dish.price,
    restaurantInfos?.deliveryFee,
  );

  useEffect(() => {
    DataStore.query(Basket, b =>
      b.restaurantID('eq', restaurantInfos?.id).userID('eq', dbUser?.id),
    ).then(baskets => setBasket(baskets[0]));

    console.log({restaurantInfos});
  }, [dbUser, restaurantInfos]);

  useEffect(() => {
    DataStore.query(BasketDish, bd => bd.basketID('eq', basket?.id)).then(
      setBasketDishes,
    );
  }, [basket]);

  const addDishToBasket = async (dish, quantity) => {
    // get the existing basket or create a new one
    let theBasket = basket ?? (await createNewBasket());

    // create a BasketDish item and save to Datastore
    const newDish = await DataStore.save(
      new BasketDish({quantity, Dish: dish, basketID: theBasket.id}),
    );
    setBasketDishes([...basketDishes, newDish]);
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
