const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();

const { register, login, getUsers, fetchUser } = require("./users.controllers");

router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("User Not Found");
    err.status = 404;
    next(err);
  }
});

router.post("/register", upload.single("image"), register);
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  login
);
router.get("/users", getUsers);
module.exports = router;
