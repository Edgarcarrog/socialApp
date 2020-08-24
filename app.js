require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");
const flash = require("connect-flash");


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
app.use(express.static(path.join(__dirname, "public")));

//middlewares
app.use(flash());
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



//routes
const routes = require("./routes");
const authRouter = require("./routes/auth-routes");
app.use("/", authRouter);
app.use("/", routes);

app.listen(3000, () => {
  console.log("Listen on port 3000");
});
