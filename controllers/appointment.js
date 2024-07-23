const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const AppointmentModel = mongoose.model('Appointment')


function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
}


async function bookAppointment(req, res){
  try{
    const newAppointment = await AppointmentModel.create({
      date: req.body.appointmentDate,
      reasonForAppointment: req.body.apptReason,
      patientId: new ObjectId(req.params.id)
    })
  
    if(newAppointment){
      res.redirect(`/patients/${req.params.id}`)
    }
  } catch (err){
    req.flash('message', 'Error booking an appointment.')
    res.redirect(`/patients/${req.params.id}/appointment`)
  }
}

function loadAppointmentForm(req, res){
  res.render('bookAppointment.ejs', {
    layout: './layouts/dashboard', 
    title: 'Book Appointment',
    patientId: req.params.id,
    message: req.flash('message')
  })
}

async function getPatientsAppointments(req, res){
  const patientsAppointments = await AppointmentModel.find().sort({ createdAt: -1 })

  res.render('appointments.ejs', {
    layout: './layouts/dashboard', 
    title: 'Appointments',
    patientsAppointments,
    formatDate,
    message: req.flash('message')
  })
}



module.exports = {
  loadAppointmentForm,
  bookAppointment,
  formatDate,
  getPatientsAppointments
}