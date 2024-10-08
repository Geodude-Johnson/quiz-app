const supabase = require("../../db/supabaseClient");

const collectionsController = {
  getCollectionByUser: async (req, res, next) => {
    const userId = req.params.id;
    console.log("user on params ---> ", userId);
    try {
      // Using the Supabase query builder
      const { data, error } = await supabase
        .from("collections")
        .select("*")
        .eq("userId", userId);
      if (error) {
        console.log(error);
        throw error;
      }
      res.locals.allCollections = data;
      console.log('THIS IS THE COLLECTIONS TABLE --> ', data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return next();
  },

  addCollectionByUser: async (req, res, next) => {
    try {
      const { userId } = req.body;
      const { name } = req.body;

      console.log("Request Body --->", req.body);
      const { data, error } = await from("collections").insert([
        { userId, name },
      ]);

      if (error) {
        throw error;
      }
      // Send success response
      res.status(201).json({ success: true, data });
    } catch (error) {
      console.error("Error inserting data:", error);
      res
        .status(500)
        .json({ success: false, message: "Error inserting data", error });
    }
    return next();
  },

  // updateCollection: (req, res, next) => {
  //   console.log("triggered updateCollection");
  //   res.sendStatus(200);
  // },
  // deleteCollection: (req, res, next) => {
  //   console.log("triggered deleteCollection");
  //   res.sendStatus(200);
  // },
  // getCollectionById: (req, res, next) => {
  //   console.log("triggered getCollectionById");
  //   res.sendStatus(200);
  // },
  // addCard: (req, res, next) => {
  //   console.log("triggered addCard");
  //   res.sendStatus(200);
  // },
  // deleteCard: (req, res, next) => {
  //   console.log("triggered deleteCard");
  //   res.sendStatus(200);
  // },
  addCollection: async (req, res, next) => {
    const { id } = req.body;
    const { name } = req.body;
    console.log("id and collection name ", id, name);
    try {
      const { data, error } = await supabase
        .from("collections")
        .insert([{ name, userId: id }])
        .select();
      error
        ? console.log("error when trying to add collection, ", error)
        : console.log(`successfully added ${name} to db`);
      return res.status(200).send(data[0]);
    } catch (err) {
      next({
        log: `Express error handler error in collectionController.addCollection middleware: ${err}`,
        status: 500,
        message: {
          err: "An error occurred in collectionController.addCollection",
        },
      });
    }
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
    const { collectionId } = req.params;
    console.log("triggered getCardsById ", collectionId);
    try {
      const { data: cardsArray, error } = await supabase
        .from("cards")
        .select("*")
        .eq("collection_id", collectionId);
      console.log("data", cardsArray);
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
    const { cards } = req.body;
    cards.map((card) => {
      card.collection_id = collectionId;
    });
    console.log(cards);
    try {
      const { data, error } = await supabase
        .from("cards")
        .insert(cards)
        .select();
      error
        ? console.log("error when trying to add card, ", error)
        : console.log(`successfully added ${cards} to db`);
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
  getRandomCardsById: async (req, res, next) => {
    const { collectionId } = req.params;
    console.log("triggered getRandomCardsById", collectionId);
    try {
      const { data: cardsArray, error } = await supabase.from("cards")
        .select("*")
        .eq("collection_id", collectionId);
      console.log("data", cardsArray)
      if(error) throw error
      else {
        for (let i = cardsArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [cardsArray[i], cardsArray[j]] = [cardsArray[j], cardsArray[i]];
        };
        res.status(200).json(cardsArray);
      }
    } catch (err) {
      next({
        log: `Express error handler error in collectionController.getCardById middleware: ${err}`,
        status: 500,
        message: {
          err: "An error occurred in collectionController.getCardById",
        },
      });
    }
  }
};

module.exports = collectionsController;
