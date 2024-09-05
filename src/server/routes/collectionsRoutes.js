// add responce

const express = require("express");
const router = express.Router();
const collectionController = require('../controllers/collectionControllers');


router.get('/:id', 
  collectionController.getCollectionByUser, 
  (req, res, next) => {
    return res.status(200).json(res.locals.allCollections)
})

router.post('/', 
  collectionController.addCollectionByUser, 
  (req, res, next) => {
    console.log('addCollectionByUser controller')
    return res.status(200).json('Sucess!')
})


// const {
//   getCollectionByUser,
//   // getCollectionById,
//   // addCollection,
//   // deleteCollection,
//   // updateCollection,
//   // deleteCard,
//   // addCard,
// } = require("../controllers/collectionControllers");
// /* ==========> following routes for CRUD for collections <==========*/
// /* ==========> These routes will probably need to be protected <====*/

// // router.post("/", addCollection);
// // needs to have a card id in the body
// // router.patch("/:id", updateCollection);
// router.get("/:user", getCollectionByUser);
// // router.get("/:user/:id", getCollectionById);
// // router.delete("/:id", deleteCollection);
// // router.delete("/:collectionId/:cardId", deleteCard);
// // router.post("/:collectionId/:cardId", addCard);
module.exports = router;
