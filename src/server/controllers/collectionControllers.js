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
    console.log("id => ", id, "name => ", name);
    console.log("triggered addCollection");
    // I want to create a collection and then add that id to a user's colleciton array
    try {
      const { data, error } = await supabase
        .from("collections")
        .insert([{ label: name }])
        .select();

      console.log(data);
      const newCollectionId = data[0].id;

      const { data: userData, error: userError } = await supabase
        .from("user")
        .update({
          collections: supabase.supabase.fn.array_append("collections", [
            ...collections,
            newCollectionId,
          ]),
        })
        .eq("id", id);
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
