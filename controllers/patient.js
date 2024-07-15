function viewPatients(req, res) {
  res.render('patients.ejs', { 
    layout: './layouts/dashboard', 
    title: 'Patients' 
  })
}


function registerNewPatient(req, res) {
  res.render('registerPatient.ejs', { 
    layout: './layouts/dashboard', 
    title: 'Register Patient' 
  })
}

module.exports = {
  viewPatients,
  registerNewPatient
}