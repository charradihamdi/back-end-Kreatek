const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  const { posterId, libelle, prix_ttc, en_stock, is_gift } = req.body;

  const product = new Product({
    posterId,
    libelle,
    prix_ttc,
    en_stock,
    is_gift,
    // createdBy: req.user._id,
  });
  console.log(en_stock);
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ message: "created" });
    }
  });
};

exports.getProducts = (req, res) => {
  Product.find().exec((error, products) => {
    if (error) {
      return res.status(400).json({ error });
    } else {
      res.status(200).json({ products });
    }
  });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

// new update
exports.deleteProductById = (req, res) => {
  console.log("id", req.params.productId);
  if (req.params.productId) {
    Product.deleteOne({ _id: req.params.productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ result });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};
