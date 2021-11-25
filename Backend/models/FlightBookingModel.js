const mongoose = require('mongoose');

const { Schema } = mongoose;

const flightBookingSchema = new Schema({
        flightId: { type: mongoose.Schema.Types.ObjectId },
        userId: { type: mongoose.Schema.Types.ObjectId },
        seatNumbers: { type: Array },
        status: { type: String },
        totalPrice: { type: Number },
    },
    {
        versionKey: false,
    });

const flightBookingModel = mongoose.model('flightBooking', flightBookingSchema);
module.exports = flightBookingModel;
