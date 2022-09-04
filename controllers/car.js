const Cars = require('../models/cars');
const multer = require('multer');
 
//<---------- get all cars from database ---------->
const getAllCars =  async (req, res)=> {
    
        try{
            
            if(req.query.carType){
                filter = {'car_Type' : req.query.carType.split(',')};
                let car = await Cars.find(filter);
                res.status(201).json(car);
                console.log(car)
            }
               
            else{
                let cars = await Cars.find();
                res.status(200).json(cars)
            }
       
        }catch(error){
        res.status(400).json({message: "Cannot find car collection"})
    }
}

//<---------- post request to add cars to database ---------->
const postCar = async (req, res)=>{   
    
        const data = {
            car_Type: req.body.car_Type,
            car_Model:req.body.car_Model,
            car_Img:req.body.car_Img,
            car_Make: req.body.car_Make, 
            car_Year: req.body.car_Year,
            price: req.body.price,
            times_rented: req.body.times_rented, 
            available: req.body.available,
            specs:req.body.specs
          }
        

        try{
            if(req.body.car_Img){
                multer({storage:storage}).single(req.body.car_Img); 
                //<------------ specifying the name of the file and destination ------------>
                    var storage = multer.diskStorage({  
                    //destination
                    destination:'../uploads', 
                    //file name
                    filename: (req, file, callback) => { 
                    callback(null , file.originalname);
                    }
                });
            }
            
            let car = await Cars.create(data);
            res.status(201).json(car)
            
        }catch(error){
            res.status(404).json({message:error});
            console.log(error) 
        }
}

//<---------- edit cars in database ---------->
const editCar = async (req, res)=>{
        let id = req.params.id;
        let data = req.body;

    try{
        let car = await Cars.findByIdAndUpdate(id, data);
        res.status(201).json(car)
        
    }catch(error){
        res.status(404).json({message:error});
        console.log(error)
    }
} 

//<---------- delete cars in database ---------->
const deleteCar = async (req, res)=>{
    let id = req.params.id

    try{
        let car = await Cars.findByIdAndDelete(id);
        res.status(201).json(`car with id number ${id} deleted`)
        
    }catch(error){
        res.status(404).json({message:error});
        console.log(error)
    }
} 

//<---------- find specific car in database ---------->
const findCarById = async (req, res)=>{
    let id = req.params.id

    try{
        let car = await Cars.findById(id);
        res.status(201).json(car)

    }catch(error){
        res.status(404).json({message:error});
        console.log(error)
    }
}


module.exports = {
    getAllCars,
    postCar,
    editCar,
    deleteCar,
    findCarById,
    // uploadImage
}