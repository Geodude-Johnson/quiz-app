// add responce

const express = require("express");
const router = express.Router();
const {
  getCollectionByUser,
  getCardsById,
  addCollection,
  // deleteCollection,
  // updateCollection,
  // deleteCard,
  addCard,
} = require("../controllers/collectionControllers");
/* ==========> following routes for CRUD for collections <==========*/
/* ==========> These routes will probably need to be protected <====*/

router.post("/:id", addCollection); // => need the user Id of the collection!
// needs to have a card id in the body
// router.patch("/:id", updateCollection);
router.get("/:userId", getCollectionByUser);
router.get("/cards/:collectionId", getCardsById);
// router.delete("/:id", deleteCollection);
// router.delete("/:collectionId/:cardId", deleteCard);
router.post("/card/:collectionId", addCard);
module.exports = router;
