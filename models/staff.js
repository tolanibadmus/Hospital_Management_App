const mongoose = require('mongoose')
const Schema = mongoose.Schema

const staffSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  qualification: {
    type: [String]
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


module.exports =  mongoose.model('Staff', staffSchema)