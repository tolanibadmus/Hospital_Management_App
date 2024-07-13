const mongoose = require('mongoose')
const Schema = mongoose.Schema
const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  reasonForAppointment: {
    type: String,
    required: true
  },
  patientId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: true,
    default: new Date()
  }
})


module.exports = mongoose.model('Appointment', appointmentSchema)