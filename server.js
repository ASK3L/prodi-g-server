const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const PORT = process.env.port || 8080;
const cors = require('cors');
const cookieParser = require('cookie-parser');

//<------- ROUTES ------->
const carRoutes = require('./routes/car');
const authRoutes = require('./routes/auth');

//<------- Middlewares -------->
app.use(cors({
	credentials:true , 
	origin:['http://localhost:4200']
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(authRoutes);
app.use(carRoutes);
app.use(cookieParser());

//<------- Start Express App ------->
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, (err) => {
	if (err) throw err

	console.log('MongoDB Connected')

	app.listen(PORT, () => {
		console.log(`Server listening on http://localhost:${PORT}`)
	})
})


