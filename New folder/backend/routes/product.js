const express = require("express");
const { requireSignin, adminMiddleware } = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require("../controller/product");

const router = express.Router();

router.post("/product/add", createProduct);
router.get("/products", getProducts);
router.delete("/product/:productId", deleteProductById);
router.get("/product/:productId", getProductDetailsById);

module.exports = router;
