import React from "react";
import { useCartContext } from "../context/CartContext";
import CartListItem from "../components/CartListItem";

function Cart() {
  const { cartItems, setCartItems } = useCartContext();

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    );
  };


  return cartItems.length > 0 ? (
    <div className="container container-fluid">
      <h2 className="mt-5">
        Your Cart: <b>{cartItems.length} items</b>
      </h2>

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8">
          {cartItems.map((item) => (
            <CartListItem
              key={item.product._id}
              product={item.product}
              qty={item.qty}
            />
          ))}

          <hr />
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">
                {cartItems.reduce((acc, item)=>acc+item.qty, 0)} (Units)
              </span>
            </p>
            <p>
              Est. total:{" "}
              <span className="order-summary-values">
                ${calculateTotalPrice().toFixed(2)}
              </span>
            </p>

            <hr />
            <button id="checkout_btn" className="btn btn-primary btn-block">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h2 className="mt-5">Your Cart is Empty 😿</h2>
  );
}

export default Cart;
