const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  password: { type: String },
  number: { type: String },
  passportNumber: { type: String },
  email: { type: String },
  address: { type: String },
  FFNumber: { type: String },
  mileagePoints: { type: Number}
},
{
  versionKey: false,
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
