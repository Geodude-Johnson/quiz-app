const express = require("express");
const app = express();
const path = require("path");
// const cookieParser = require("cookie-parser");
const db = require('../db/db.js')
const collectionController = require("./controllers/collectionControllers.js")


const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*  
server static files 
*/
app.use(express.static(path.resolve(__dirname, "../../dist")));

/*
end point routes
*/

app.use("/api/", db);
app.use('/api/collectionsTest', collectionController.getCollectionByUser)
app.use("/api/login", require("./routes/userRoutes"));
app.use("/api/collections", require("./routes/collectionsRoutes"));
// app.use("/search", require("./routes/searchRoutes"));
// app.use("/home", require("./routes/loginRoutes"));

app.use(
  "/api/",
  (req, res, next) => {
    console.log("testing / route");
    next();
  },
  (req, res) => {
    res.sendStatus(200);
  }
);

/*
catch all route handler for any request to an unknown route
*/
app.use((req, res) => {
  return res
    .status(200)
    .sendFile(path.join(__dirname, "../dist/index.html"), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("An error occured");
      }
    });
});

/*
global error handler
*/
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  defaultErr.log = err.log;
  defaultErr.message = err.message;
  const errorObj = Object.assign({}, defaultErr);
  console.log("in global error handler");
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
