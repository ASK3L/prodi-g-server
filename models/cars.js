const db = require('mongoose');

let carsSchema = new db.Schema({
        car_Type: { 
          type : String, 
          required : true 
        },

        car_Model: { 
          type : String, 
          required : true 
        },

        car_Img : {
          data : Buffer,
          contentType : String
        },

        car_Make: { 
          type : String, 
          required : true 
        },

        car_Year: {
           type : Number, 
           required : true 
        },

        price: { 
          type: Number, 
          required : true 
        },

        times_rented: { 
          type : Number, 
          required : true 
        },

        available: { 
          type : Number, 
          required : true 
        },
        specs : {
          type : Array
        }
    },
    { collection: "Cars" }
  );

module.exports = db.model('Cars', carsSchema);