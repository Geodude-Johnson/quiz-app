const supabase = require("../../db/supabaseClient");

const collectionsController = {
  getCollectionByUser: async (req, res, next) => {
    userId = req.params;
    try {
      // Using the Supabase query builder
      const { data, error } = await supabase.from("cards").select("*");

      if (error) {
        console.log(error);
        throw error;
      }

      console.log("THIS IS OUR DATA --->", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  addCollection: async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const { data, error } = await supabase
        .from("collections")
        .insert([{ name, userId: id }])
        .select();
      error
        ? console.log("error when trying to add collection, ", error)
        : console.log(`successfully added ${name} to db`);
    } catch (err) {
      next({
        log: `Express error handler error in collectionController.addCollection middleware: ${err}`,
        status: 500,
        message: {
          err: "An error occurred in collectionController.addCollection",
        },
      });
    }
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
  // this is pointless!
  getCardsById: async (req, res, next) => {
    const { collectionsId } = req.params;
    console.log("triggered getCardsById ", collectionsId);
    try {
      const { data: cardsArray, error } = await supabase
        .from("cards")
        .select("*")
        .eq("collection_id", collectionsId);

      error
        ? console.log(`error when trying to fetch cards by user id `, error)
        : res.status(200).json(cardsArray);
    } catch (err) {
      next({
        log: `Express error handler error in collectionController.getCardById middleware: ${err}`,
        status: 500,
        message: {
          err: "An error occurred in collectionController.getCardById",
        },
      });
    }
  },
  addCard: async (req, res, next) => {
    console.log("triggered addCard");
    const { collectionId } = req.params;
    const { question, answer, category } = req.body;
    try {
      const { data, error } = await supabase
        .from("cards")
        .insert([{ question, answer, category, collection_id: collectionId }])
        .select();
      error
        ? console.log("error when trying to add card, ", error)
        : console.log(`successfully added ${question} to db`);
    } catch (err) {
      next({
        log: `Express error handler error in collectionController.addCard middleware: ${err}`,
        status: 500,
        message: {
          err: "An error occurred in collectionController.addCard",
        },
      });
    }
    res.sendStatus(200);
  },
  deleteCard: (req, res, next) => {
    console.log("triggered deleteCard");
    res.sendStatus(200);
  },
};

module.exports = collectionsController;
