const supabase = require("../../db/supabaseClient");

const collectionsController = {
  getCollectionByUser: async (req, res, next) => {
    const userId = req.params.id;
    console.log("user on params ---> ", userId);
    try {
      // Using the Supabase query builder
      const { data, error } = await supabase.from("collections").select("*").eq("userId", userId);
      if (error) {
        console.log(error);
        throw error;
      }
      res.locals.allCollections = data;
      // console.log('THIS IS THE COLLECTIONS TABLE --> ', data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return next();
  },

  addCollectionByUser: async (req, res, next) => {
    try {
      const { userId } = req.body; 
      const { name } = req.body; 

      console.log('Request Body --->', req.body); 
      const { data, error } = await supabase
        .from('collections')
        .insert([{ userId, name }]); 
  
      if (error) {
        throw error; 
      }
      // Send success response
      res.status(201).json({ success: true, data });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ success: false, message: 'Error inserting data', error });
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
};

module.exports = collectionsController;
