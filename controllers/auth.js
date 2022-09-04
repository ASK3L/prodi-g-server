const Register = require('../models/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req,res)=>{
    const user = await Register.findOne({email:req.body.email})

    if(!user){
        return res.status(404).json({message:'user not found'})
    };

    if(!await bcrypt.compare(req.body.password, user.password)){
        return res.status(404).json({message:'invalid credentials'})
    };

    const token = jwt.sign({_id:user._id , email:user.email}, process.env.ACCESS_TOKEN);
    res.cookie('jwt', token,{
        httpOnly: true,
        maxAge : 24 * 60 * 60 * 1000 //one day 
    });

    res.send({
        message : 'success' 
    });
};

//<---------- register user ---------->
const signUp = async (req,res)=>{
    userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email: req.body.email,
        password:req.body.password,
    };

    try{
        // Validate if user exist in our database
        // const oldUser = await User.findOne({ email:req.body.email });
        // if (oldUser) {
        //     return res.status(409).send("User Already Exist. Please Login");
        // };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        if(hashedPassword){
            console.log('hashed password', hashedPassword);
            userData.password = hashedPassword;
        };

        const userStoredData = await Register.create(userData);
        if(userStoredData){
            console.log('user stored data' , userStoredData);
            res.json({status:'ok' , data:userStoredData});
        };
    }catch(error){
            res.status(404).json({message:error})
        };
};


//<---------- get user ---------->
const getUser = async (req, res)=>{
    try{
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, 'secret');

    if(!claims){
        return res.status(401).json({message:'unauthenticated 1'})
    }

    const user = await Register.findOne({_id : claims._id});

    const {password, ...data} = user.toJSON();

    res.send(data)}
    catch(err){
        return res.status(401).json({message:'unauthenticated'})
    }
}

//<---------- log out user ---------->
const logout = (req, res)=>{
    res.cookie('jwt','',{maxAge:0});

    res.send({
        message: 'success'
    })
}

module.exports = {
    login,
    signUp,
    getUser,
    logout
}