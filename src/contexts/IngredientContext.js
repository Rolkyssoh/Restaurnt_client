import {useState} from 'react';
import {createContext, useContext} from 'react';

const IngredientContext = createContext({});

const IngredientContextProvider = ({children}) => {
  const [quantity, setQuantity] = useState(0.3);

  const onMinus = () => {
    if (quantity > 0.3) setQuantity(quantity - 0.1);
  };

  const onPlus = () => {
    setQuantity(quantity + 0.1);
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
