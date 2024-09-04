const supabase = require("../../db/supabaseClient");

const collectionsController = {
  getCollectionByUser: async (req, res, next) => {
    userId = req.params;
    console.log("user on params", userId);
    console.log("triggered getCollectionByUser");
    try {
      // Using the Supabase query builder
      const { data, error } = await supabase.from("cards").select("*");

      if (error) {
        throw error;
      }

      // console.log("THIS IS OUR DATA --->", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

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
  getCollectionById: (req, res, next) => {
    console.log("triggered getCollectionById");
    res.sendStatus(200);
  },
  addCard: (req, res, next) => {
    console.log("triggered addCard");
    res.sendStatus(200);
  },
  deleteCard: (req, res, next) => {
    console.log("triggered deleteCard");
    res.sendStatus(200);
  },
};

module.exports = collectionsController;
