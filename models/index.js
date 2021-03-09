require("../bin/db-config/db.connection");
const User = require("../models/User");
const Product = require("../models/Product");

const db = {
  User,
  Product,
};

module.exports = db;
