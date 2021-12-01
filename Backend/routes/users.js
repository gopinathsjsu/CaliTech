const express = require('express');
const bcrypt = require('bcrypt');
const Users = require('../models/UsersModel');
const FlightBooking = require('../models/FlightBookingModel')
const configurations = require('../config.json');
const mongoose = require("mongoose");
const Flights = require("../models/FlightsModel");
//const validate = require("../passport")

const router = express.Router();
const saltRounds = 10;
// const selectQuery = 'SELECT * FROM users';

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    const rows = await Users.find({});
    if (rows) {
      console.log('Fetched the data from DB');
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

/* Create user */
router.post('/create', async (req, res) => {
  try {
    const emailCheck = await Users.findOne({ email: req.body.email });
    if (emailCheck) {
      console.log('Email is already registered');
      return res.status(409).json({ msg: 'The email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = new Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      FFNumber: "FF"+ parseInt(Math.random()*1000000),
      mileagePoints: 0
    });

    const rows = await newUser.save();
    console.log(rows);
    // eslint-disable-next-line no-underscore-dangle
    if (rows._doc) {
      console.log('Successfully created user');
      res.status(200).json({ msg: 'Successfully created user' });
    } else {
      throw new Error("DB didn't return success response");
    }
  } catch (e) {
    console.error('Error creating the user:');
    console.error(e);
    res.status(400).json({
      msg: `Error creating the user: ${e}`,
    });
  }
});

/* Update user */
router.put('/update', async (req, res) => {
  try {
    req.body.address = JSON.stringify(req.body.address);
    const rows = await Users.updateOne({ _id: req.body.id }, {
      name: req.body.name,
      number: req.body.number,
      email: req.body.email,
      address: req.body.address,
    });
    if (rows.modifiedCount === 1) {
      res.status(200).json({ msg: 'Successfully updated the user details' });
    } else {
      throw new Error("DB didn't return success response");
    }
  } catch (e) {
    console.error('Error updating the user details:');
    console.error(e);
    res.status(400).json({
      msg: `Error updating the user details: ${e}`,
    });
  }
});

/* Check Login credentials */
router.post('/login', /*validate,*/ async (req, res) => {
  try {
    const rows = await Users.find({});
    let flag = false;
    let userData;
    if (rows.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.email === req.body.email) {
          // eslint-disable-next-line no-await-in-loop
          const result = await bcrypt.compare(req.body.password, row.password);
          if (result) {
            userData = {
              // eslint-disable-next-line no-underscore-dangle
              id: row._id,
              name: row.name,
              number: row.number,
              email: row.email,
              address: row.address ? JSON.parse(row.address) : row.address,
              mileagePoints: row.mileagePoints
            };
            flag = true;
            break;
          }
        }
      }
      if (flag) {
        console.log('User credentials are valid');
        res.status(200).json(userData);
      } else {
        console.log('User credentials are Invalid');
        res.status(401).json({ msg: 'User name or password is invalid' });
      }
    } else {
      res.status(400).json({ msg: 'No users  present' });
    }
  } catch (e) {
    console.error('Error checking login credentials:');
    console.error(e);
    res.status(400).json({
      msg: `Error checking login credentials: ${e}`,
    });
  }
});

/* Upload image */
// router.post('/uploadImage', upload.single('image'), async (req, res) => {
//   try {
//     if (req.file) {
//       req.file.imageUrl = req.file.location;
//       console.log(req.file);
//       res.status(200).json(req.file);
//     } else {
//       console.log('File upload failed');
//       res.status(400).json({ msg: 'File upload failed' });
//     }
//   } catch (e) {
//     console.error('Error uploading image file:');
//     console.error(e);
//     res.status(400).json({
//       msg: `Error uploading image file: ${e}`,
//     });
//   }
// });

router.post('/orders', async (req, res) => {
  try {
    const rows = await Orders.aggregate([
      {
        $match: {
          $and: [{ customerID: req.body.userID }],
        },
      },
      { $set: { resObjID: { $toObjectId: '$restaurantID' } } },
      {
        $lookup: {
          from: 'restaurants',
          localField: 'resObjID',
          foreignField: '_id',
          as: 'restaurantRow',
        },
      },
      { $unwind: '$restaurantRow' },
      {
        $project: {
          _id: 1,
          description: 1,
          totalCost: 1,
          dateTime: 1,
          deliveryStatus: 1,
          deliveryType: 1,
          status: 1,
          customerID: 1,
          restaurantID: 1,
          address: 1,
          deliveryNote: 1,
          title: '$restaurantRow.title',
        },
      },
    ]);
    if (rows.length > 0) {
      const rowData = rows.map((row) => ({
        // eslint-disable-next-line no-underscore-dangle
        id: row._id,
        description: row.description,
        totalCost: parseFloat(row.totalCost.toJSON().$numberDecimal),
        dateTime: row.dateTime,
        deliveryStatus: row.deliveryStatus,
        status: row.status,
        deliveryType: row.deliveryType,
        customerID: row.customerID,
        restaurantID: row.restaurantID,
        name: row.title,
        address: row.address,
        deliveryNote: row.deliveryNote,
      }));
      console.log(rowData);
      console.log('Fetched the user orders from DB');
      res.status(200).json(rowData);
    }
  } catch (e) {
    console.error('Error fetching orders from DB:');
    console.error(e);
    res.status(400).json({
      msg: `Error fetching data from DB: ${e}`,
    });
  }
});

router.post('/createFlightBooking', async (req, res) => {
  try {
    const newBooking = new FlightBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      seatNumbers: req.body.seatNumbers,
      status: req.body.status,
      totalPrice: req.body.totalPrice
    });
    const rows = await newBooking.save();

    const flightData = await Flights.find({ _id: req.body.flightId });
    console.log(flightData);
    let seatsInFlights = JSON.parse(JSON.stringify(flightData[0])).bookedSeats;
    for(let i in req.body.seatNumbers){
      seatsInFlights.push(req.body.seatNumbers[i])
    }
    const rowsf = await Flights.updateOne({ _id: req.body.flightId }, {
      bookedSeats : seatsInFlights
    });

    const userData = await Users.find({ _id: req.body.userId });
    console.log(userData);
    let mileagePoints = JSON.parse(JSON.stringify(userData[0])).mileagePoints + req.body.totalPrice * 2;
    const rowsu = await Users.updateOne({ _id: req.body.userId }, {
      mileagePoints
    });

    if (rows._doc) {
      res.status(200).json({ msg: 'Successfully created a flight booking' });
    } else {
      throw new Error("DB didn't return success response");
    }
  } catch (e) {
    console.error('Error creating a flight booking:');
    console.error(e);
    res.status(400).json({
      msg: `Error creating a flight booking: ${e}`,
    });
  }
});

router.put('/cancelFlightBooking', async (req, res) => {
  try {
    const rows = await FlightBooking.updateOne({ _id: req.body.id }, {
      status : req.body.status
    });

    const flightData = await Flights.find({ _id: req.body.flightId });
    console.log(flightData);
    let seatsInFlights = JSON.parse(JSON.stringify(flightData[0])).bookedSeats;
    for(let i in req.body.seatNumbers){
      const index = seatsInFlights.indexOf(req.body.seatNumbers[i]);
      if (index > -1) {
        seatsInFlights.splice(index, 1);
      }
    }
    const rowsf = await Flights.updateOne({ _id: req.body.flightId }, {
      bookedSeats : seatsInFlights
    });

    const userData = await Users.find({ _id: req.body.userId });
    console.log(userData);
    let mileagePoints = JSON.parse(JSON.stringify(userData[0])).mileagePoints - (req.body.totalPrice * 2);
    const rowsu = await Users.updateOne({ _id: req.body.userId }, {
      mileagePoints
    });
    if (rows.modifiedCount === 1) {
      res.status(200).json({ msg: 'Successfully cancelled a flight booking' });
    } else {
      throw new Error("DB didn't return success response");
    }
  } catch (e) {
    console.error('Error cancelling a flight booking:');
    console.error(e);
    res.status(400).json({
      msg: `Error cancelling a flight booking: ${e}`,
    });
  }
});

router.post('/flightBookings', async (req, res) => {
  try {
    const FlightData = await FlightBooking.find({ userId: req.body.userId });
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


module.exports = router;
