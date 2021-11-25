const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

class userLoginController{
    static async customersignup(req, res) {
        try {
        const {customerName , customerEmail , customerpassword} = req.body
        Customer.findOne({ customerEmail: customerEmail }, function (err,obj){
            if(obj){
                res.status(400).send('Customer already exists with email:' + customerEmail);
            }
            else{
                const cust= new Customer({
                    customerName,
                    customerEmail,
                    customerpassword
                })
                cust.save()
                .then(result => {
                    res.status(200).send('Customer register successfully:' + customerName)
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send("Error while saving customer details");
                })
            }
        });
        
    }
    catch (error) {
        console.log(error)
        return res.status(400).send("Error while registering customer");
    }
}
    
}
module.exports = userLoginController