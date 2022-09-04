const db = require('mongoose');

let registerUserSchema = new db.Schema({
    firstName:{ 
        type : String, 
        required: true 
    },

    lastName:{ 
        type : String, 
        required: true 
    },

	email:{ 
        type : String, 
        required: true 
    },

	password:{ 
        type : String, 
        required: true 
    },
},
{ collection: "registerUser" }
)

module.exports = db.model('registerUser',registerUserSchema )