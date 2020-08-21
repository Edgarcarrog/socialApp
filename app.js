require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");


mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((db) =>
    console.log(
      `Connected to Mongo! Database name: "${db.connections[0].name}"`
    )
  )
  .catch((err) => console.error("Error connecting to mongo", err));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const app = express();

//settings
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(bodyParser.urlencoded({ extended: true }));

//routes
const routes = require("./routes");
app.use("/", routes);

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
