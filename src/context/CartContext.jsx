import { createContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const producsInLocalStorage = localStorage.getItem("cartProducts");
      return producsInLocalStorage ? JSON.parse(producsInLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });
  const [products, setProducts] = useState([]);
  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartItems));
  },[cartItems]);

  const addItemToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.gameID === product.gameID
    )
    if(inCart){
      setCartItems(
        cartItems.map((productInCart) => {
          if(productInCart.gameID === product.gameID){
            return productInCart //{...inCart, amount: inCart.amount + 1}
          }else return productInCart;
        })
      )
    }else {
      setCartItems([...cartItems, {...product, amount: 1}])
    }
  }
    const deleteItemToCart = (product) => {
      const inCart = cartItems.find(
        (productInCart) => productInCart.gameID === product.gameID
      )
      if(inCart.amount === 1){
        setCartItems(
          cartItems.filter(productInCart => productInCart.gameID  !== product.gameID)
        )
      }else{
        setCartItems((productInCart) => {
          if(productInCart.gameID === product.gameID){
            return {...inCart, amount: inCart.amount - 1}
          }else return productInCart
        })
      }
    }
 
  const getProducts = async () => {
    await axios
      .get("https://www.cheapshark.com/api/1.0/deals?upperPrice=1")
      .then(({ data }) => setProducts(data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, products, addItemToCart, deleteItemToCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
