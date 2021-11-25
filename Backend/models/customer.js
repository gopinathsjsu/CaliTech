const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const customerSchema = mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },

    customerEmail:{
        type: String,
        required: true,
    },
    customerpassword:{
        type: String,
        required: true,
    }
});

customerSchema.pre('save', async function(next) {
    try {
      console.log("inside middleware");
      const salt = await bcrypt.genSalt(10);
      const hashPwd = await bcrypt.hash(this.password, salt);
      this.password = hashPwd;
      next()
    } catch(error) {
      console.log("inside pwd catch")
      next(error)
    }
  });
  module.exports = mongoose.model('Customer', customerSchema)