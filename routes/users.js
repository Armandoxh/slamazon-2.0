var express = require("express");
var router = express.Router();

//Users Controller
const usersController = require("../controllers/user/user");
const authRequired = require("../middleware/authRequired");

// Users
/* GET users listing. */
router.get("/", usersController.index);
router.post("/new", usersController.createUser);
router.get("/:id", usersController.showUserDetails);
router.put("/:id/edit", usersController.updateUser);

/**Login */
router.post("/login", usersController.loginValidation);
router.post("/register", usersController.createUser);
router.get("/profile", authRequired, usersController.profile);

module.exports = router;
