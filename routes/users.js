var express = require("express");
var router = express.Router();

//Users Controller
const usersController = require("../controllers/user/user");

// Users
/* GET users listing. */
router.get("/", usersController.index);
router.post("/new", usersController.createUser);
router.get("/:id", usersController.showUserDetails);
router.put("/:id/edit", usersController.updateUser);

module.exports = router;
