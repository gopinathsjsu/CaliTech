const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: true,
    },

    adminEmail:{
        type: String,
        required: true,
    },
    adminpassword:{
        type: String,
        required: true,
    }
});

adminSchema.pre('save', async function(next) {
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
  module.exports = mongoose.model('Admin', adminSchema)