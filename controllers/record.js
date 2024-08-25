const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
const RecordModel = mongoose.model('Record')
const AppointmentModel = mongoose.model('Appointment')
const PatientModel = mongoose.model('Patient')


async function getPatientRecord(req, res){
  const appointmentRecord = await RecordModel.findOne({
    appointmentId: req.params.id
  })

  const appointment = await AppointmentModel.findOne({
    _id : req.params.id
  })

  const patient = await PatientModel.findOne({
    _id: appointment.patientId
  })

  res.render('record.ejs', {
    layout: './layouts/dashboard', 
    title: 'Patients',
    appointmentId: req.params.id,
    appointmentRecord,
    patient,
    message: req.flash('message')
  })
}

async function appointmentDocumentation(req,res){
  let appointmentRecord;
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
          healthHistory: req.body.healthHistoryDocumentation ? req.body.healthHistoryDocumentation.trim() : existingAppointmentRecord.healthHistory,
          nurseDocumentation: req.body.nurseDocumentation ? req.body.nurseDocumentation.trim() : existingAppointmentRecord.nurseDocumentation,
          doctorDocumentation: req.body.doctorDocumentation ? req.body.doctorDocumentation.trim() : existingAppointmentRecord.doctorDocumentation,
          pharmacyDocumentation: req.body.pharmDocumentation ? req.body.pharmDocumentation.trim() : existingAppointmentRecord.pharmacyDocumentation,
          labDocumentation: req.body.labDocumentation ? req.body.labDocumentation.trim() : existingAppointmentRecord.labDocumentation
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
    return res.redirect(`/appointments/${req.params.id}/record`)
  } else {
    req.flash('message', 'Patient not registered.')
    return res.redirect(`/appointments/${req.params.id}/record`)
  }
}




module.exports = {
  getPatientRecord,
  appointmentDocumentation
}