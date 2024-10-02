import React from "react";
import { Link } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

function CartListItem({ product, qty }) {
  const { cartItems, setCartItems } = useCartContext();

  const increaseQty = () => {
    if (qty == product.stock) return;
    qty += 1;
    setCartItems((oldCartItems) => {
      const updatedCartItems = oldCartItems.map((item) => {
        if (item.product._id === product._id) {
          return { ...item, qty: qty };
        }
        return item;
      });

      return updatedCartItems;
    });
  };

  const decreaseQty = () => {
    if (qty > 1) {
      qty -= 1;
      setCartItems((oldCartItems) => {
        const updatedCartItems = oldCartItems.map((item) => {
          if (item.product._id === product._id) {
            return { ...item, qty: qty };
          }
          return item;
        });

        return updatedCartItems;
      });
    }
  };

  const removeItem = () => {
    setCartItems((oldCartItems) => {
      const updatedCartItems = oldCartItems.filter(
        (item) => item.product._id !== product._id
      );

      return updatedCartItems;
    });
  };

  return (
    <>
      <hr />
      <div className="cart-item">
        <div className="row">
          <div className="col-4 col-lg-3">
            <img
              src={product.images[0].image}
              alt={product.name}
              height="90"
              width="115"
            />
          </div>

          <div className="col-5 col-lg-3">
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </div>

          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
            <p id="card_item_price">${product.price}</p>
          </div>

          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>
                -
              </span>
              <input
                type="text"
                className="form-control count d-inline"
                value={qty}
                readOnly
              />

              <span className="btn btn-primary plus" onClick={increaseQty}>
                +
              </span>
            </div>
          </div>

          <div className="col-4 col-lg-1 mt-4 mt-lg-0">
            <i
              id="delete_cart_item"
              className="fa fa-trash btn btn-danger"
              onClick={removeItem}
            ></i>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default CartListItem;
