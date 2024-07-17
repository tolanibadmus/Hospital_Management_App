const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const RecordModel = mongoose.model('Record')


async function getPatientRecord(req, res){
  const appointmentRecord = await RecordModel.findOne({
    appointmentId: req.params.id
  })
  res.render('record.ejs', {
    layout: './layouts/dashboard', 
    title: 'Patients',
    appointmentId: req.params.id,
    appointmentRecord
  })
}

async function appointmentDocumentation(req,res){
  let appointmentRecord
  const existingAppointmentRecord = await RecordModel.findOne({
    appointmentId: req.params.id
  })
  if (existingAppointmentRecord) {
    appointmentRecord = await RecordModel.findOneAndUpdate(
      {
        appointmentId: req.params.id
      },
      {
        $set: {
          healthHistory: req.body.healthHistoryDocumentation ? req.body.healthHistoryDocumentation.trim() : '',
          nurseDocumentation: req.body.nurseDocumentation ? req.body.nurseDocumentation.trim() : '',
          doctorDocumentation: req.body.doctorDocumentation ? req.body.doctorDocumentation.trim() : '' ,
          pharmacyDocumentation: req.body.pharmDocumentation ? req.body.pharmDocumentation.trim() : '' ,
          labDocumentation: req.body.labDocumentation ? req.body.labDocumentation.trim() : ''
        }
      }
    )
  } else {
    appointmentRecord = await RecordModel.create({
      appointmentId: new ObjectId(req.params.id),
      healthHistory: req.body.healthHistoryDocumentation ? req.body.healthHistoryDocumentation.trim() : '',
      nurseDocumentation: req.body.nurseDocumentation ? req.body.nurseDocumentation.trim() : '',
      doctorDocumentation: req.body.doctorDocumentation ? req.body.doctorDocumentation.trim() : '' ,
      pharmacyDocumentation: req.body.pharmDocumentation ? req.body.pharmDocumentation.trim() : '' ,
      labDocumentation: req.body.labDocumentation ? req.body.labDocumentation.trim() : ''
    })
  }

  if(appointmentRecord){
    res.redirect(`/appointments/${req.params.id}/record`)
  } else {
    console.log('Patient not registered.')
  }
}


module.exports = {
  getPatientRecord,
  appointmentDocumentation
}