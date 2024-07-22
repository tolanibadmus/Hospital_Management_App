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
const staffController = require('./controllers/staff')
const appointmentController = require('./controllers/appointment')
const recordController = require('./controllers/record')

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(expressLayouts)


app.get("/", indexController.loadHomePage)
app.get("/patients", patientController.viewPatients)
app.get("/patients/add", patientController.loadRegisterPatient)
app.post("/patients/add", patientController.registerNewPatient )
app.get("/patients/:id", patientController.viewOnePatient)
app.get("/staff", staffController.viewStaff)
app.get("/staff/emptyState", staffController.loadEmptyState)
app.get("/staff/add", staffController.loadAddStaffForm)
app.post("/staff/add", staffController.addNewStaff)
app.post("/staff/:id/delete", staffController.deleteSingleStaff)
app.get("/staff/:id/update", staffController.loadUpdateStaffForm)
app.post("/staff/:id/update", staffController.updateStaff)
app.get("/patients/:id/appointment", appointmentController.loadAppointmentForm)
app.post("/patients/:id/appointment", appointmentController.bookAppointment)
app.get("/appointments", appointmentController.getPatientsAppointments)
app.get("/appointments/:id/record", recordController.getPatientRecord)
app.post("/appointments/:id/record", recordController.appointmentDocumentation)
app.get("/registerStaff", staffController.registerStaffForm)
app.post("/registerStaff", staffController.registerStaff)
app.get("/staffLogin", staffController.staffLoginForm)
app.post("/staffLogin", staffController.staffLogin)
app.listen(8080)