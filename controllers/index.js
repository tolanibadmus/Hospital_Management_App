const mongoose = require('mongoose')
const PatientModel = mongoose.model('Patient')

function formatDate(date) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('en-US', options);
}

async function loadHomePage(req, res) {
  const displayedPatients = await PatientModel.find().sort({ createdAt: -1 }).limit(5)

  const totalPatients = await PatientModel.countDocuments()

  res.render('index.ejs', { 
    layout: './layouts/dashboard', 
    title: 'Dashboard',
    displayedPatients,
    formatDate,
    totalPatients
  })
}

module.exports = {
  loadHomePage
}