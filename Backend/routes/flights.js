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
      rowsToSend = rows.map(async (row) => {
        const allDishes = await Dishes.find({ restaurantID: row.id }, { title: 1 });
        const rowData = {};
        rowData.uuid = row.id;
        rowData.title = row.title;
        rowData.imageUrl = row.imageUrl;
        rowData.largeImageUrl = row.largeImageUrl;
        rowData.location = row.location;
        rowData.categories = JSON.parse(row.categories);
        rowData.tags = allDishes;
        // rowData.etaRange = JSON.parse(row.etaRange);
        // rowData.rawRatingStats = JSON.parse(row.rawRatingStats);
        rowData.publicContact = row.publicContact;
        rowData.deliveryType = JSON.parse(row.deliveryType);
        rowData.dietary = JSON.parse(row.dietary);
        return Promise.resolve(rowData);
      });
      Promise.all(rowsToSend).then((to) => {
        console.log(rows);
        console.log('Fetched the restaurant data from DB');
        res.status(200).json(to);
      });
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
    const restaurantData = await Flights.find({ _id: req.params.id });
    let dishData = await Dishes.find({ restaurantID: req.params.id });
    if (restaurantData.length > 0) {
      const rows = restaurantData.map((row) => {
        // eslint-disable-next-line no-param-reassign
        const rowData = {};
        rowData.uuid = row.id;
        rowData.title = row.title;
        rowData.imageUrl = row.imageUrl;
        rowData.largeImageUrl = row.largeImageUrl;
        rowData.location = row.location;
        rowData.categories = row.categories ? JSON.parse(row.categories) : row.categories;
        rowData.tags = row.tags ? JSON.parse(row.tags) : row.tags;
        // rowData.etaRange = JSON.parse(row.etaRange);
        // rowData.rawRatingStats = JSON.parse(row.rawRatingStats);
        rowData.publicContact = row.publicContact;
        rowData.deliveryType = JSON.parse(row.deliveryType);
        rowData.dietary = row.dietary ? JSON.parse(row.dietary) : row.dietary;
        rowData.sections = [];
        rowData.items = {};
        const sectionMap = {};
        if (dishData.length > 0) {
          dishData = JSON.parse(JSON.stringify(dishData));
          dishData.forEach((dish) => {
            // eslint-disable-next-line no-param-reassign,no-underscore-dangle
            dish.uuid = dish._id;
            // eslint-disable-next-line no-param-reassign,no-underscore-dangle
            dish.id = dish._id;
            // eslint-disable-next-line no-param-reassign
            dish.itemDescription = dish.description;
            // eslint-disable-next-line no-param-reassign
            dish.price = parseFloat(dish.price.$numberDecimal);
            // eslint-disable-next-line no-param-reassign
            dish.category = JSON.parse(dish.category);
            dish.category.forEach((cat) => {
              const catValue = cat.value;
              if (sectionMap[catValue]) {
                sectionMap[catValue].itemUuids.push(dish.uuid);
              } else {
                const newEntry = {
                  uuid: catValue + Date.now(),
                  title: catValue,
                  itemUuids: [],
                };
                sectionMap[catValue] = newEntry;
                sectionMap[catValue].itemUuids.push(dish.uuid);
              }
            });
            rowData.items[dish.uuid] = dish;
          });
          // eslint-disable-next-line guard-for-in,no-restricted-syntax
          for (const key in sectionMap) {
            rowData.sections.push(sectionMap[key]);
          }
        }
        return rowData;
      });
      console.log(rows);
      console.log('Fetched the restaurant data from DB');
      res.status(200).json(rows[0]);
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

/* Check Login credentials */
router.post('/login', async (req, res) => {
  try {
    let rows = await Flights.find({});
    let flag = false;
    let restaurantData;
    if (rows.length > 0) {
      rows = JSON.parse(JSON.stringify(rows));
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        if (row.email === req.body.email) {
          // eslint-disable-next-line no-await-in-loop
          const result = await bcrypt.compare(req.body.password, row.Password);
          if (result) {
            const categories = [];
            if (row.categories) {
              row.categories = JSON.parse(row.categories);
              row.categories.forEach((ele) => {
                categories.push({ value: ele.id, label: ele.name });
              });
            }
            restaurantData = {
              // eslint-disable-next-line no-underscore-dangle
              id: row._id,
              title: row.title,
              email: row.email,
              publicContact: parseFloat(row.publicContact),
              largeImageUrl: row.largeImageUrl,
              imageUrl: row.imageUrl,
              location: row.location,
              timings: row.timings,
              categories,
              deliveryType: JSON.parse(row.deliveryType),
              dietary: row.dietary ? JSON.parse(row.dietary) : row.dietary,
            };
            flag = true;
            break;
          }
        }
      }
      if (flag) {
        const payload = { _id: restaurantData.id, username: restaurantData.title };
        const token = `JWT ${jwt.sign(payload, configurations.secret, {
          expiresIn: 1008000,
        })}`;
        console.log('Restaurant User credentials are valid');
        res.status(200).json({ restaurantData, token });
      } else {
        console.log('Restaurant User credentials are Invalid');
        res.status(401).json({ msg: 'Restaurant User name or password is invalid' });
      }
    } else {
      res.status(400).json({ msg: 'No Restaurant users  present' });
    }
  } catch (e) {
    console.error('Error checking login credentials:');
    console.error(e);
    res.status(400).json({
      msg: `Error checking login credentials: ${e}`,
    });
  }
});



module.exports = router;
