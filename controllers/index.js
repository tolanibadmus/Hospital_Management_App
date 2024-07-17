const mongoose = require('mongoose')
const PatientModel = mongoose.model('Patient')
const staffModel = mongoose.model('Staff')
const AppointmentModel = mongoose.model('Appointment')

function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
}

async function loadHomePage(req, res) {
  const displayedPatients = await PatientModel.find().sort({ createdAt: -1 }).limit(5)

  const totalPatients = await PatientModel.countDocuments()

  const totalStaff = await staffModel.countDocuments()

  const totalAppointments = await AppointmentModel.countDocuments()


  res.render('index.ejs', { 
    layout: './layouts/dashboard', 
    title: 'Dashboard',
    displayedPatients,
    formatDate,
    totalPatients,
    totalStaff,
    totalAppointments
  })
}

module.exports = {
  loadHomePage
}