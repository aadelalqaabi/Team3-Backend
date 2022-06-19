const Trip = require("../../models/Trip");

exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate("userId");
    res.status(201).json(trips);
  } catch (err) {
    next(err);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    await Trip.findByIdAndUpdate(req.trip.id, req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    await Trip.findByIdAndRemove({ _id: req.trip.id });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.fetchTrip = async (tripId, next) => {
  try {
    const trip = await Trip.findById(tripId);
    return trip;
  } catch (err) {
    next(err);
  }
};
