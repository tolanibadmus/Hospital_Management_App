require('dotenv').config();
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./config/db');
connectDB()

const appointmentModel = require('./models/appointment');
const patientModel = require('./models/patient');
const recordModel = require('./models/record');
const staffModel = require('./models/staff');



const indexController = require('./controllers/index')
const patientController = require('./controllers/patient')
const staffContoller = require('./controllers/staff')

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(expressLayouts)


app.get("/", indexController.loadHomePage)
app.get("/viewPatients", patientController.viewPatients)
app.get("/registerPatient", patientController.registerNewPatient)
app.get("/viewStaff", staffContoller.viewStaff)
app.get("/addNewStaff", staffContoller.addNewStaff)

app.listen(8080)