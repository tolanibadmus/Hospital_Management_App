require('dotenv').config();

const connectDB = require('./config/db');
connectDB()

const appointmentModel = require('./models/appointment');
const patientModel = require('./models/patient');
const recordModel = require('./models/record');
const staffModel = require('./models/staff');



const IndexController = require('./controllers/index')

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))


app.get("/", IndexController.loadHomePage)

app.listen(8080)