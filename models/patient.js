const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const patientSchema = new Schema ({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  occupation: {
    type: String,
  },
  nextOfKin: {
    type: String,
    required: true
  },
  allergies:  {
    type: [String],
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

module.exports =  mongoose.model('Patient', patientSchema)
