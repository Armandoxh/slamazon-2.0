const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  product_Name: {
    type: String,
    required: [true, "Product Needs A Name"],
  },
  price_USD: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  specs: {
    product_depth: Number,
    product_height: Number,
    returnable: Boolean,
    manufacturer: String,
    item_weight: Number,
    sku: Number,
    date_Available: Date.now,
    manufacturer_warranty: {
      hasWarranty: Boolean,
      warrantyLife: {
        type: Number,
        enum: [0, 1, 3, 5, 10],
      },
    },
    brand: String,
    count_Per_Unit: {
      type: Number,
    },

    required: false,
  },
  category: {
    type: String,
    enum: [
      "Other",
      "Stationery",
      "Retail",
      "Food & Beverage",
      "Clothing",
      "Technology",
      "Hospitality",
      "Construction",
    ],

    default: "Other",
  },
  in_Stock: {
    inStock: Boolean,
    inventoryLeft: Number,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
