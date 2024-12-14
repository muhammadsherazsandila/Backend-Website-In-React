const express = require('express');
const workoutRoutes = require('./routes/mainRouter');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json());
require('dotenv').config();
require('./config/mongooseConnection')

app.use('/api/workouts' , workoutRoutes)
app.listen(process.env.PORT)