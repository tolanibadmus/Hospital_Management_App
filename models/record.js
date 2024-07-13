const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recordSchema = new Schema({
  appointmentId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  healthHistory: {
    type: String
  },
  nurseDocumentation:{
    type: String
  },
  doctorDocumentation: {
    type: String
  },
  pharmacyDocumentation: {
    type: String
  },
  labDocumentation: {
    type: String,
  }
})


module.exports = mongoose.model('Record', recordSchema)