const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  getTrips,
  deleteTrip,
  updateTrip,
  fetchTrip,
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

router.delete("/:tripId", deleteTrip);

router.put("/:tripId", updateTrip);

router.get("/", getTrips);

module.exports = router;
