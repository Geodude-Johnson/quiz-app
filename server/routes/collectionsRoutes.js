// add responce

const express = require("express");
const router = express.Router();
const {
  getCollectionByUser,
  getCollectionById,
  addCollection,
  deleteCollection,
  updateCollection,
} = require("../controllers/collectionControllers");
/* ==========> following routes for CRUD for collections <==========*/
/* ==========> These routes will probably need to be protected <====*/

// initalizing a new collection
router.post("/", addCollection);
// addding or deleting a single card from a specific collection => needs to have a card id in the body
router.patch("/", updateCollection);
// getting all the collecitons by the user
router.get("/:user", getCollectionByUser);
router.get("/:user/:id", getCollectionById);
// deleting a whole collection
router.delete("/", deleteCollection);

module.exports = router;
