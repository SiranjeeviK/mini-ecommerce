import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { productId } = useParams();
  const { cartItems, setCartItems } = useCartContext();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetch(import.meta.env.APP_API_URL + `/product/${productId}`)
      .then((res) => res.json())
      .then((data) =>
        setProduct((oldData) => {
          return data.product;
        })
      );
  }, []);

  const addToCart = () => {
    const itemExist = cartItems.find((item) => item.product._id === productId);
    const newItem = { product, qty };
    if (!itemExist) {
      setCartItems((oldItems) => {
        const updatedCartItems = [...oldItems, newItem];
        return updatedCartItems;
      });
      toast.success("Item added to cart");
    } else {
      toast.error("Item already in cart");
    }
  };

  const increaseQty = () => {
    if (qty == product.stock) return;

    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  return (
    product && (
      <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            <img
              src={product.images[0].image}
              alt="sdf"
              height="500"
              width="500"
            />
          </div>

          <div className="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product # {product._id}</p>

            <hr />

            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>

            <hr />

            <p id="product_price">${product.price}</p>
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
            <button
              type="button"
              id="cart_btn"
              className="btn btn-primary d-inline ml-4"
              onClick={addToCart}
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>

            <hr />

            <p>
              Status:{" "}
              <span
                id="stock_status"
                className={product.stock > 0 ? "text-success" : "text-danger"}
              >
                {product.stock > 0 ? "In  Stock" : "Out of Stock"}
              </span>
            </p>

            <hr />

            <h4 className="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr />
            <p id="product_seller mb-3">
              Sold by: <strong>{product.seller}</strong>
            </p>

            <div className="rating w-50"></div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductDetails;
