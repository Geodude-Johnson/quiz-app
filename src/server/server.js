const express = require("express");
const app = express();
const path = require("path");
// const cookieParser = require("cookie-parser");
const db = require("../db/db.js");
const collectionRouter = require("../server/routes/collectionsRoutes.js");

require("dotenv").config();

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
// app.get("/api/collectionTest", collectionController.getCollectionByUser);
// app.post("/GraphQLtest", checkingDB)
app.use("/api/user", require("./routes/userRoutes"));
// app.use("/api/collections", require("./routes/collectionsRoutes"));
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
  const errorObj = {
    ...defaultErr,
    status: err.status || defaultErr.status,
    message: err.message ? { err: err.message } : defaultErr.message,
    log: err.log || defaultErr.log,
  };
  console.error(`
    Error: ${errorObj.log}
    Status: ${errorObj.status}
    Path: ${req.path}
    Stack: ${err.stack || "No stack trace available"}
  `);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
