//Need to make the product controller
const db = require("../../models/index.js");

const fetchAllProducts = async (req, res) => {
  try {
    const foundProducts = await db.Product.find({});
    if (!foundProducts.length) {
      const error = new Error("No Products Here!");
      error.status = 204;
      throw error;
    }

    res.status(200).json({
      status: 200,
      products: foundProducts,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error),
      res.status(500).json({
        status: error.status,
        message: error.message,
        requestedAt: new Date().toLocaleString(),
      });
  }
};

const insertProduct = async (req, res) => {
  try {
    const foundProduct = await db.Product.findOne(req.body);

    if (foundProduct) throw "Product is already in our system!";

    const product = await db.Product.create(req.body);

    res.status(201).json({
      status: 201,
      product,
      requestedAt: new Date().toLocaleString(),
    });
  } catch (error) {
    console.log(error);
    if (error === "Product Already Exists") {
      return res.status(400).json({
        status: 400,
        message: "Product Already Exists,",
        requestedAt: new Date().toLocaleString(),
      });
    }
    return res.status(500).json({
      status: 500,
      message: error,
      requestedAt: new Date().toLocaleString(),
    });
  }
};

const productController = {
  fetchAllProducts,
  insertProduct,
};
module.exports = productController;
