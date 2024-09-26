exports.getProducts = (req, res, next) => {
  res.json({
    success: true,
    message: "Get Products Working",
  });
};

exports.getProductById = (req, res, next) => {
  res.json({
    success: true,
    message: `Get Product by ID working, The Product ID is: ${req.params.id}`,
  });
};
