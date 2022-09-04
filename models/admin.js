const db = require('mongoose');

let adminSchema = new db.Schema({
	car_Model: { type: String, required: true }
},
{ collection: "Admin" }
)

module.exports = db.model('Admin', adminSchema)