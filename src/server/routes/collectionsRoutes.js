// add responce

const express = require("express");
const router = express.Router();
const {
  getCollectionByUser,
  getCollectionById,
  addCollection,
  deleteCollection,
  updateCollection,
  deleteCard,
  addCard,
} = require("../controllers/collectionControllers");
/* ==========> following routes for CRUD for collections <==========*/
/* ==========> These routes will probably need to be protected <====*/

router.post("/", addCollection, (req, res) => {
  
});
// needs to have a card id in the body
router.patch("/:id", updateCollection, (req, res) => {
  
});
router.get("/:user", getCollectionByUser, (req, res) => {
  
});
router.get("/:user/:id", getCollectionById, (req, res) => {
  
});
router.delete("/:id", deleteCollection, (req, res) => {
  
});
router.delete("/:collectionId/:cardId", deleteCard, (req, res) => {
  
});
router.post("/:collectionId/:cardId", addCard, (req, res) => {
  
});
module.exports = router;
