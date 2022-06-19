const express = require("express");
const passport = require("passport");
const upload = require("../../middleware/multer");
const router = express.Router();

const {
  getTrips,
  deleteTrip,
  updateTrip,
  fetchTrip,
  tripsCreate,
} = require("./trips.controllers");

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    const err = new Error("Trip Not Found");
    err.status = 404;
    next(err);
  }
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripsCreate
);

router.delete("/:tripId", deleteTrip);

router.put("/:tripId", updateTrip);

router.get("/", getTrips);

module.exports = router;
