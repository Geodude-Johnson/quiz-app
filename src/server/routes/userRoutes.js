const express = require("express");
const router = express.Router();
const {
  registerUser,
  userProfile,
  deleteUser,
  loginUser,
} = require("../controllers/userController.js");

/* ==========> following routes for GET user profiles using AUTH and POST for adding a user <==========*/
/* ==========> is this redundednt with the home route? <==========*/

// need to have aunthentication middleware
// register a new user => username and password in the body?
router.post("/register", registerUser);

// login
router.post("/login", loginUser);

// in the case of a user signing in => what happend if user has token?
router.get("/:username", userProfile);

// do we need another route for a signed in user? No, we have to protect those routes on the front end right?
router.delete("/:id", deleteUser);

module.exports = router;
