// add an error catch

const collectionsController = {
  addCollection: (req, res, next) => {
    console.log("triggered addCollection");
    res.sendStatus(200);
  },
  updateCollection: (req, res, next) => {
    console.log("triggered updateCollection");
    res.sendStatus(200);
  },
  deleteCollection: (req, res, next) => {
    console.log("triggered deleteCollection");
    res.sendStatus(200);
  },
  getCollectionByUser: (req, res, next) => {
    console.log("triggered getCollectionByUser");
    res.sendStatus(200);
  },
  getCollectionById: (req, res, next) => {
    console.log("triggered getCollectionById");
    res.sendStatus(200);
  },
};

module.exports = collectionsController;
