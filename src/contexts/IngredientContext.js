import {useState} from 'react';
import {createContext, useContext} from 'react';

const IngredientContext = createContext({});

const IngredientContextProvider = ({children}) => {
  const [quantity, setQuantity] = useState(0.0);

  const onMinus = () => {
    if (quantity > 0) setQuantity(quantity - 0.1);
  };

  const onPlus = () => {
    let i = quantity + 0.1;
    setQuantity(i);
  };

  return (
    <IngredientContext.Provider
      value={{onMinus, onPlus, quantity, setQuantity}}>
      {children}
    </IngredientContext.Provider>
  );
};

export default IngredientContextProvider;

export const useIngredientContext = () => useContext(IngredientContext);
