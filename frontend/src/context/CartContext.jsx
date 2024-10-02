import { createContext, useContext, useState } from "react";

/**
 * Custom context to manage the cart items
 * If accessing the cart items from the context, use the `useCartContext` hook
 * If used outside the CartContextProvider, its value will be null and an error will be thrown
 * */
const CartContext = createContext(null);


/**
 * 
 * Use this provider to wrap the components that need to access the cart items
 */
export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}


/**
 * Custom Hook to access the cart items from the context
 * If used outside the CartContextProvider, an error will be thrown
 * @returns {Object} cartItems and setCartItems
 */
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context){
    return new Error("useCartContext must be used within a CartContextProvider");
  }

  return context;
}
