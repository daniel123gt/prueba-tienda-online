import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

export const ItemCart = ({ item }) => {
  const { addItemToCart } = useContext(CartContext);
  const { deleteItemToCart } = useContext(CartContext);

  const { amount } = item;

  return (
    <div className={styles.cartItem}>
      <img src={item.thumb} alt={item.title} />
      <div className={styles.dataContainer}>
        <div className={styles.left}>
          <p>{item.title}</p>
          <div className={styles.buttons}>
            <button onClick={() => addItemToCart(item)}>
              AGREGAR
            </button>
            <button onClick={() => deleteItemToCart(item)}>
              SACAR
            </button>
          </div>
        </div>
        <div className={styles.right}>
          <div>{item.amount}</div>
          <p>Total: ${item.amount * item.normalPrice}</p>
        </div>
      </div>
    </div>
  );
};
