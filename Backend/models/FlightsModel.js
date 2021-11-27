const mongoose = require('mongoose');

const { Schema } = mongoose;

const flightSchema = new Schema({
  flightCode: { type: String },
  airlineName: { type: String },
  departureLocation: { type: String },
  arrivalLocation: { type: String },
  departureDateTime: { type: Date },
  arrivalDateTime: { type: Date },
  flightType: { type: String },
  totalSeats: { type: Number },
  bookedSeats: { type: Array },
  price: { type: Number }
},
{
  versionKey: false,
});

const flightModel = mongoose.model('flight', flightSchema);
module.exports = flightModel;
