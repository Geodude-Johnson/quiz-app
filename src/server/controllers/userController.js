// add an error catch

const userController = {
  registerUser: (req, res, next) => {
    console.log("triggered registerUser");
    res.sendStatus(200);
  },
  userProfile: (req, res, next) => {
    console.log("triggered userProfile");
    res.sendStatus(200);
  },
  deleteUser: (req, res, next) => {
    console.log("triggered deleteUser");
    res.sendStatus(200);
  },
};

module.exports = userController;
