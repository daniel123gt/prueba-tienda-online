import React, { useContext } from "react";
import CartContext from "../../context/CartContext";
import styles from "./styles.module.scss";

const Products = () => {
  const { addItemToCart, products } = useContext(CartContext);
console.log(products)
  return (
    <div className={styles.productsContainer}>
      {products &&
        products.map((product, i) => (
          <div key={i} className={styles.product}>
            <img src={product.thumb} alt={product.title} />
            <div>
              <p>
                {product.title} - ${product.normalPrice}
              </p>
            </div>
            {!product.inCart ? (
              <button onClick={() => addItemToCart(product)}>
                Add to Cart
              </button>
            ) : (
              <button>En el carrito</button>
            )}
          </div>
        ))}
    </div>
  );
};

export default Products;
