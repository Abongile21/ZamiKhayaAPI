const Rental = require('../models/rentalModel');

exports.createRental = async (req, res) => {
  try {
    const rental = new Rental(req.body);
    await rental.save();
    res.status(201).send(rental);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({});
    res.status(200).send(rentals);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) {
      return res.status(404).send();
    }
    res.status(200).send(rental);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!rental) {
      return res.status(404).send();
    }
    res.status(200).send(rental);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteRental = async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if (!rental) {
      return res.status(404).send();
    }
    res.status(200).send(rental);
  } catch (error) {
    res.status(500).send(error);
  }
};
