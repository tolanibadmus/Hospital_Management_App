const express = require('express')
const indexController = require('../controllers/index')
const patientController = require('../controllers/patient')
const staffController = require('../controllers/staff')
const appointmentController = require('../controllers/appointment')
const recordController = require('../controllers/record')

const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get("/", [authMiddleware], indexController.loadHomePage)
router.get("/patients", [authMiddleware], patientController.viewPatients)
router.get("/patients/add", [authMiddleware], patientController.loadRegisterPatient)
router.post("/patients/add", [authMiddleware], patientController.registerNewPatient )
router.get("/patients/:id", [authMiddleware], patientController.viewOnePatient)
router.get("/staff", [authMiddleware], staffController.viewStaff)
router.get("/staff/emptyState", [authMiddleware], staffController.loadEmptyState)
router.get("/staff/add", [authMiddleware], staffController.loadRegisterStaffForm)
router.post("/staff/add", [authMiddleware], staffController.registerStaff)
router.post("/staff/:id/delete",[authMiddleware], staffController.deleteSingleStaff)
router.get("/staff/:id/update", [authMiddleware], staffController.loadUpdateStaffForm)
router.post("/staff/:id/update", [authMiddleware], staffController.updateStaff)
router.get("/patients/:id/appointment", [authMiddleware], appointmentController.loadAppointmentForm)
router.post("/patients/:id/appointment", [authMiddleware], appointmentController.bookAppointment)
router.get("/appointments", [authMiddleware], appointmentController.getPatientsAppointments)
router.get("/appointments/:id/record", [authMiddleware], recordController.getPatientRecord)
router.post("/appointments/:id/record", [authMiddleware], recordController.appointmentDocumentation)
router.get("/login", staffController.staffLoginForm)
router.post("/login", staffController.staffLogin)
router.get("/resetPassword", [authMiddleware], staffController.loadResetPasswordForm)
router.post("/resetPassword", [authMiddleware], staffController.resetPassword)



module.exports = router