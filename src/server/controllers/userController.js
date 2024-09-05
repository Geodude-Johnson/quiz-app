// add an error catch
const supabase = require("../../db/supabaseClient");

const userController = {
  registerUser: async (req, res, next) => {
    const { username, password } = req.body;
    // console.log("triggered registerUser");
    try {
      const { error } = await supabase
        .from("user")
        .insert([{ username, password }]);
      if (error) {
        console.log("an error occucred when inserting new user, ", error);
        return res.status(401).send('Username already exists')
      } else {
        console.log(`added username: ${username} to DB successful`);
        return res.status(200).send('Your account has been successfully created')
      }
    } catch (err) {
      next({
        log: `Express error handler error in userController.registerUser middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.registerUser" },
      });
    }
  },
  userProfile: async (req, res, next) => {
    const { id } = req.params;
    // console.log("triggered userProfile");
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("id", id);
      if (error) console.log(error);
      else console.log("return ", data);
    } catch (err) {
      next({
        log: `Express error handler error in userController.userProfile middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.userProfile" },
      });
    }
    return res.sendStatus(200);
  },
  deleteUser: async (req, res, next) => {
    const { id } = req.params;
    // console.log("triggered deleteUser");
    try {
      const { error } = await supabase.from("user").delete().eq("id", id);
      if (error) console.log(error);
    } catch (err) {
      next({
        log: `Express error handler error in userController.userProfile middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.userProfile" },
      });
    }
    return res.sendStatus(200);
  },
  loginUser: async (req, res, next) => {
    const { username, password } = req.body;
    // console.log("triggered loginUser");
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("username", username);
      if (error) console.log(error);
      else {
        if(data[0]) {
          console.log("data: ", data);

        } else {
          return res.status(401).send('Username not found');
        }
      }
    } catch (err) {
      next({
        log: `Express error handler error in userController.userProfile middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.userProfile" },
      });
    }
    return res.sendStatus(200);
  },
};

module.exports = userController;
