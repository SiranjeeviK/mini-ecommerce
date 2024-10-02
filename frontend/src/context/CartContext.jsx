import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export default function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context){
    return new Error("useCartContext must be used within a CartContextProvider");
  }

  return context;
}
