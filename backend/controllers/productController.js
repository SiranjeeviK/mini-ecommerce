const ProductModel = require("../models/productModel");

/**
 * @desc Get all Products
 * @route POST /api/v1/products
 */
exports.getProducts = async (req, res, next) => {
  let query = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await ProductModel.find(query);
  res.json({
    success: true,
    products,
  });
};

/**
 * @desc Get Product by ID
 * @route POST /api/v1/products/:id
 */
exports.getProductById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Unable to get Product with the ID. Error: ${error.message}`,
    });
  }
};
