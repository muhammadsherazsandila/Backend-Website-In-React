const express = require('express');
const workoutRoutes = require('./routes/mainRouter');
const app = express();
const cors = require('cors');

// Allow requests from your frontend origin
app.use(cors({
    origin: 'https://backend-website-in-react-frontend.vercel.app'
}));
app.use(express.urlencoded({extended : true}))
app.use(express.json());
require('dotenv').config();
require('./config/mongooseConnection')

app.use('/api/workouts' , workoutRoutes)
app.listen(process.env.PORT)