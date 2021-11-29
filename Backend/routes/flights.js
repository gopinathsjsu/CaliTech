const express = require('express');
const bcrypt = require('bcrypt');
const Flights = require('../models/FlightsModel');
// const pool = require('../dbConnection');
const configurations = require('../config.json');

const router = express.Router();
const saltRounds = 10;
// const selectQuery = 'SELECT * FROM restaurants';

/* GET Flights listing. */
router.get('/', async (req, res) => {
  try {
    const rows = await Flights.find({});
    let rowsToSend;
    if (rows) {
        res.status(200).json(rows);
    }
  } catch (e) {
    console.error('Error fetching data from DB:');
    console.error(e);
    res.status(400).json({
      msg: `Error fetching data from DB: ${e}`,
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const FlightData = await Flights.find({ _id: req.params.id });
    if (FlightData.length > 0) {
      console.log(FlightData);
      console.log('Fetched the flight data from DB');
      res.status(200).json(FlightData[0]);
    }
  } catch (e) {
    console.error('Error fetching data from DB:');
    console.error(e);
    res.status(400).json({
      msg: `Error fetching data from DB: ${e}`,
    });
  }
});

/* Create user */
// eslint-disable-next-line consistent-return
router.post('/create', async (req, res) => {
  try {
    const flightCodeCheck = await Flights.findOne({ flightCode: req.body.flightCode });
    if (flightCodeCheck) {
      console.log('flightCode is already registered');
      return res.status(409).json({ msg: 'The flightCode is already registered' });
    }

    const newFlight = new Flights({
      flightCode: req.body.flightCode,
      airlineName: req.body.airlineName,
      departureLocation: req.body.departureLocation,
      arrivalLocation: req.body.arrivalLocation,
      departureDateTime: req.body.departureDateTime,
      arrivalDateTime: req.body.arrivalDateTime,
      flightType: req.body.flightType,
      totalSeats: req.body.totalSeats,
      bookedSeats: [],
      price: req.body.price,
    });

    const rows = await newFlight.save();
    console.log(rows);
    // eslint-disable-next-line no-underscore-dangle
    if (rows._doc) {
      res.status(200).json({ msg: 'Successfully created a flight' });
    } else {
      throw new Error("DB didn't return success response");
    }
  } catch (e) {
    console.error('Error creating a Flight:');
    console.error(e);
    res.status(400).json({
      msg: `Error creating a Flight: ${e}`,
    });
  }
});

/* Update details */
router.put('/update', async (req, res) => {
  try {
    const rows = await Flights.updateOne({ _id: req.body.id }, {
      airlineName: req.body.airlineName,
      departureLocation: req.body.departureLocation,
      arrivalLocation: req.body.arrivalLocation,
      departureDateTime: req.body.departureDateTime,
      arrivalDateTime: req.body.arrivalDateTime,
      flightType: req.body.flightType,
      totalSeats: req.body.totalSeats,
      price: req.body.price,
    });
    console.log(rows);
    if (rows.modifiedCount === 1) {
      res.status(200).json({ msg: 'Successfully updated a Flight' });
    } else {
      throw new Error("DB didn't return success response");
    }
  } catch (e) {
    console.error('Error updating a Flight:');
    console.error(e);
    res.status(400).json({
      msg: `Error updating a Flight: ${e}`,
    });
  }
});

module.exports = router;
