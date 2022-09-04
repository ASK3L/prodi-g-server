const db = require('mongoose');

let customerSchema = new db.Schema({
	email:{ 
        type : String, 
        required: true 
    },

	password:{ 
        type : String, 
        required: true 
    },

    name:{ 
        type : String , 
        required:true 
    },

    address:{
        type : Array,
        required: true
    },

    bankAccountNumber:{
        type : Number 
    }
},
{ collection: "Customer" }
)

module.exports = db.model('Customer', customerSchema)