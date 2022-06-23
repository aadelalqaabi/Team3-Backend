const Trip = require("../../models/Trip");
const User = require("../../models/User");

exports.getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate("userId");
    res.status(201).json(trips);
  } catch (err) {
    next(err);
  }
};

exports.tripsCreate = async (req, res, next) => {
  req.body.userId = req.user._id;
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  try {
    const newTrip = await Trip.create(req.body);
    await User.findByIdAndUpdate(req.user._id, {
      $push: { trips: newTrip._id },
    });
    res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    const trip = await Trip.findByIdAndUpdate(req.trip._id, req.body, {
      new: true,
    });
    res.status(200).json(trip);
  } catch (err) {
    next(err);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    await Trip.findByIdAndRemove({ _id: req.trip._id });
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
