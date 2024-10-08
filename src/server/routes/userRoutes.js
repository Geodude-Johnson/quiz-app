const express = require("express");
const router = express.Router();
const {
  checkUsername,
  registerUser,
  userProfile,
  deleteUser,
  loginUser,
  googleLogin,
  googleRegister,
  checkGoogleId,
} = require("../controllers/userController.js");

/* ==========> following routes for GET user profiles using AUTH and POST for adding a user <==========*/
/* ==========> is this redundednt with the home route? <==========*/

// need to have aunthentication middleware
// register a new user => username and password in the body?
router.post("/register", checkUsername, registerUser, (req, res) => {
  if (res.locals.userExists) {
    return res.status(401).send("Username already exists");
  } else {
    return res.status(200).send(res.locals.user);
  }
});

// login
router.post("/login", loginUser, (req, res) => {
  if (res.locals.authenticated) {
    return res.status(200).send(res.locals.user);
  } else {
    return res.status(401).send("Invalid credentials");
  }
});

// google login
router.post("/google/login", googleLogin, (req, res) => {
  if(res.locals.authenticated) {
    return res.status(200).send(res.locals.user);
  } else {
    return res.status(401).send('Google account is not connnected');
  }
});

// google register
router.post("/google/register", checkGoogleId, googleRegister, (req, res) => {
  if(res.locals.userExists) {
    return res.status(401).send('Google account already exists');
  } else {
    return res.status(200).send(res.locals.user);
  }
});

// in the case of a user signing in => what happend if user has token?
router.get("/:username", userProfile, (req, res) => {});

// do we need another route for a signed in user? No, we have to protect those routes on the front end right?
router.delete("/:id", deleteUser, (req, res) => {});

module.exports = router;
