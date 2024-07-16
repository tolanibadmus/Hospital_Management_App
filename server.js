require('dotenv').config();
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./config/db');
connectDB()

require('./models/appointment');
require('./models/patient');
require('./models/record');
require('./models/staff');


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
app.get("/patients", patientController.viewPatients)
app.get("/patients/add", patientController.loadRegisterPatient)
app.post("/patients/add", patientController.registerNewPatient )
app.get("/patients/:id", patientController.viewOnePatient)
app.get("/staff", staffContoller.viewStaff)
app.get("/staff/add", staffContoller.addNewStaff)

app.listen(8080)