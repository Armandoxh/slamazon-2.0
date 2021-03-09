var express = require("express");
var router = express.Router();

//Users Controller
const productController = require("../controllers/product/product");

// Users
/* GET users listing. */
router.get("/all", productController.fetchAllProducts);
router.post("/new", productController.insertProduct);
module.exports = router;
