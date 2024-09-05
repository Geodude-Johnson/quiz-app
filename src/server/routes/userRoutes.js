const express = require("express");
const router = express.Router();
const {
  registerUser,
  userProfile,
  deleteUser,
} = require("../controllers/userController.js");

/* ==========> following routes for GET user profiles using AUTH and POST for adding a user <==========*/
/* ==========> is this redundednt with the home route? <==========*/

// need to have aunthentication middleware
// register a new user => username and password in the body?
router.post("/", registerUser, (req, res) => {
  
});
// in the case of a user signing in => what happend if user has token?
router.get("/login/:username/:password", userProfile, (req, res) => {
  
});
// do we need another route for a signed in user? No, we have to protect those routes on the front end right?
router.delete("/:id", deleteUser, (req, res) => {
  
});
module.exports = router;
