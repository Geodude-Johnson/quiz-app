// add an error catch
const { NavigateNext } = require("@mui/icons-material");
const supabase = require("../../db/supabaseClient");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {
  checkUsername: async (req, res, next) => {
    try {
      const { username } = req.body;
      // console.log(username);

      const { data, error } = await supabase
        .from("user")
        .select()
        .eq("username", username);
      console.log("checkUsername data: ", data);
      res.locals.userExists = false;
      if (data[0]) {
        res.locals.userExists = true;
      }
      // console.log(res.locals.userExists);
      return next();
    } catch (error) {
      next({
        log: `Express error handler error in userController.checkUsername middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.checkUsername" },
      });
    }
  },
  registerUser: async (req, res, next) => {
    // console.log("triggered registerUser");
    if (!res.locals.userExists) {
      const { username, password } = req.body;
      console.log(req.body);

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      try {
        const { data, error } = await supabase
          .from("user")
          .insert({ username, password: hashedPassword })
          .select();
        console.log("data: ", data);
        if (error) {
          next(error);
        }
      } catch (err) {
        next({
          log: `Express error handler error in userController.registerUser middleware: ${err}`,
          status: 500,
          message: { err: "An error occurred in userController.registerUser" },
        });
      }
    }
    return next();
  },
  userProfile: async (req, res, next) => {
    const { username } = req.params;
    // console.log("triggered userProfile");
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("username", username);
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
      else console.log(`deleted user with and id of: ${id} successful`);
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
      if (error) {
        next(error);
      } else {
        if (data[0]) {
          res.locals.authenticated = false;
          const isCorrectPassword = await bcrypt.compare(
            password,
            data[0].password
          );
          if (isCorrectPassword) {
            res.locals.authenticated = true;
          }
        }
      }
    } catch (err) {
      next({
        log: `Express error handler error in userController.userProfile middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.userProfile" },
      });
    }
    return next();
  },
};

module.exports = userController;
