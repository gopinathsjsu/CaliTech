const Users = require('./models/UsersModel');
const Flights = require('./models/FlightsModel');
const configurations = require('./config.json');

module.exports = (req, res, next) => {
  try {
    if(req.url === "/login"){
      if((req.body.email && typeof (req.body.email) === "string") && (req.body.password && typeof (req.body.password) === "string")){
        next();
      }else{
        res.status(400).json({"msg": "Invalid input"})
      }
    }
    if(req.url === "/create"){
      if((req.body.email && typeof (req.body.email) === "string") && (req.body.password && typeof (req.body.password) === "string")){
        next();
      }else{
        res.status(400).json({"msg": "Invalid input"})
      }
    }
    next();
  } catch (e) {
    res.status(400).json({"msg": "Error validating the input"})
  }
};
