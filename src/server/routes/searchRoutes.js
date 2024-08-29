const express = require("express");
const router = express.Router();

/* ==========> following routes for GET for different search results <==========*/

/* 
this one I will leave like this for now
how will we determine if we are searching or a user or a collection via the same search bar?
*/

router.get("/:id", searchUser);

module.exports = router;
