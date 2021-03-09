const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader === "undefined") throw "forbidden";

    const token = bearerHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = payload._id;

    next();
  } catch (error) {
    if (error === "forbidden") {
      res.status(403).json({
        status: 403,
        message: "forbidden",
      });
    }
  }
};

module.exports = authRequired;
