const express = require("express");
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getProducts);

router.route("/product/:id").get(getProductById);

module.exports = router;
