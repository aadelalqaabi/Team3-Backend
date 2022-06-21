const connectDb = require("./database");
const express = require("express");
const userRoutes = require("./api/users/users.routes");
const tripRoutes = require("./api/trips/trips.routes");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
app.use(cors());
connectDb();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(userRoutes);
app.use("/trips", tripRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
});

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
