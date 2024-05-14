import { createContext, useState, useEffect } from 'react';

import PRODUCTS from '../shop-data.json';

// actual value that will be accessed
export const ProductsContext = createContext({
  products: [],
});

// products provider component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
