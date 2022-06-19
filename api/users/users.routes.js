const express = require("express");
const passport = require("passport");
const router = express.Router();

const { register, login, getUsers } = require("./users.controllers");

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
router.get("/users", getUsers);

module.exports = router;
