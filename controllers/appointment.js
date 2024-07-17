const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const AppointmentModel = mongoose.model('Appointment')
// const PatientModel = mongoose.model('Patient')


function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
}


async function bookAppointment(req, res){
  const newAppointment = await AppointmentModel.create({
    date: req.body.appointmentDate,
    reasonForAppointment: req.body.apptReason,
    patientId: new ObjectId(req.params.id)
  })

  if(newAppointment){
    res.redirect(`/patients/${req.params.id}`)
  } else {
    console.log('Patient not registered.')
  }
}

function loadAppointmentForm(req, res){
  res.render('bookAppointment.ejs', {
    layout: './layouts/dashboard', 
    title: 'Book Appointment',
    patientId: req.params.id
  })
}

async function getPatientsAppointments(req, res){
  const patientsAppointments = await AppointmentModel.find().sort({ createdAt: -1 })

  res.render('appointments.ejs', {
    layout: './layouts/dashboard', 
    title: 'Appointments',
    patientsAppointments,
    formatDate
  })
}



module.exports = {
  loadAppointmentForm,
  bookAppointment,
  formatDate,
  getPatientsAppointments
}