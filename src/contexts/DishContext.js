import {useState} from 'react';
import {createContext, useContext} from 'react';

const DishContext = createContext({});

const DishContextProvider = ({children}) => {
  const [quantity, setQuantity] = useState(0);

  const onMinus = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const onPlus = () => {
    setQuantity(quantity + 1);
  };

  return (
    <DishContext.Provider value={{onMinus, onPlus, quantity, setQuantity}}>
      {children}
    </DishContext.Provider>
  );
};

export default DishContextProvider;

export const useDishContext = () => useContext(DishContext);
