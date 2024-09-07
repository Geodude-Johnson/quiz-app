// add an error catch
const supabase = require("../../db/supabaseClient");
const bcrypt = require('bcrypt');
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
      console.log('checkUsername data: ', data);
      res.locals.userExists = false;
      if(data[0]) {
        res.locals.userExists = true;
      }
      if (error) throw error;
      // console.log(res.locals.userExists);
    } catch (error) {
      next({
        log: `Express error handler error in userController.checkUsername middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.checkUsername" },
      });
    }
    return next();
  },
  registerUser: async (req, res, next) => {
    // console.log("triggered registerUser"); 
    if(!res.locals.userExists) {
      const { username, password } = req.body;
      console.log(req.body);
      
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      try {
        const { data, error } = await supabase
          .from('user')
          .insert({ username, password: hashedPassword })
          .select();
        console.log('data: ', data);
        if(error) throw error;
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
      if (error) throw error;
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
      if (error) throw error;
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
        throw error;
      } else {
        if(data[0]) {
          res.locals.authenticated = false;
          const isCorrectPassword = await bcrypt.compare(password, data[0].password);
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
  googleLogin: async (req, res, next) => {
    const { sub } = req.body;
    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("googleId", sub);
      if (error) {
        throw error;
      } else {
        res.locals.authenticated = false;
        if(data[0]) {
          res.locals.authenticated = true;
        }
      }
    } catch (err) {
      next({
        log: `Express error handler error in userController.googleLogin middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.googleLogin" },
      });
    }
    return next();
  },
  googleRegister: async (req, res, next) => {
    if(!res.locals.userExists) {
      const { sub } = req.body;
      // console.log(req.body);

      try {
        const { data, error } = await supabase
          .from('user')
          .insert({ googleId: sub })
          .select();
        console.log('data: ', data);
        if(error) throw error;
      } catch (err) {
        next({
          log: `Express error handler error in userController.googleRegister middleware: ${err}`,
          status: 500,
          message: { err: "An error occurred in userController.googleRegister" },
        });
      }
    }
    return next();
  },
  checkGoogleId: async (req, res, next) => {
    try {
      const { sub } = req.body;
      
      const { data, error } = await supabase
        .from("user")
        .select()
        .eq("googleId", sub);
      console.log('checkGoogleId data: ', data);
      res.locals.userExists = false;
      if(data[0]) {
        res.locals.userExists = true;
      }
      if (error) throw error;
      // console.log(res.locals.userExists);
    } catch (error) {
      next({
        log: `Express error handler error in userController.checkUsername middleware: ${err}`,
        status: 500,
        message: { err: "An error occurred in userController.checkUsername" },
      });
    }
    return next();
  }
};

module.exports = userController;
