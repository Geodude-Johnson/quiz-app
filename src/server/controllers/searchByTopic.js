const supabase = require("../../db/supabaseClient");

const searchByTopic = async (req, res, next) => {
  console.log("in seach by topic controller");
  // we will have a catagory on req
  let { topic } = req.params;
  topic = topic.toLowerCase();
  console.log("topic => ", topic);
  // catagory is a column on cards
  try {
    const { data, error } = await supabase
      .from("cards")
      .select("category")
      .ilike("category", `%${topic}%`);
    console.log("this is the return => ", data);
    error
      ? console.log(`error when trying to search a topic `, error)
      : res.status(200).json(data);
  } catch (err) {
    next({
      log: `Express error handler error in searchByTopic.searchByTopic middleware: ${err}`,
      status: 500,
      message: {
        err: "An error occurred in searchByTopic.searchByTopic",
      },
    });
  }
  // we need to query our db for all cards with a topic of whats on request
};

module.exports = searchByTopic;
