const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

/**
 * @desc Create a new order
 * @route POST /api/orders
 */
exports.createOrder = async (req, res, next) => {
  const cartItems = req.body;
  const amount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );
  const status = "pending";

  const order = await orderModel.create({
    cartItems,
    amount,
    status,
    createdAt: Date.now(),
  });

  // Updating the stock
  for (const item of cartItems) {
    const product = await productModel.findById(item.product._id);
    product.stock = product.stock - item.qty;
    await product.save();
  }

  // console.log(order);

  res.json({
    success: true,
    message: "Order works!",
    order,
  });
};
