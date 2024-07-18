const mongoose = require('mongoose')
const staffModel = mongoose.model('Staff')

function loadAddStaffForm(req, res){
  res.render('addStaff.ejs', {
    layout: './layouts/dashboard', 
    title: 'Add New Staff' 
  })
}

async function viewStaff (req, res) {
  const allStaff = await staffModel.find()
  res.render('staff.ejs', {
    layout: './layouts/dashboard', 
    title: 'Staff',
    allStaff
  })
}

async function viewOneStaff (req, res) {
  const id = (req.params.id)
  const oneStaff = await staffModel.findById({_id: id})
  res.render('staffDetail.ejs', {
    layout: './layouts/dashboard', 
    title: 'Staff',
    oneStaff
  })
}

async function addNewStaff (req, res){
  const addStaff = await staffModel.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    emailAddress: req.body.email,
    department: req.body.department,
    qualification: req.body.qualification
  })
  if (addStaff){
    res.redirect('/staff')
  } else {
    console.log('Staff not registered.')
  }
}

async function deleteSingleStaff(req, res){
  try {
    const id = (req.params.id)
    await staffModel.deleteOne({_id: id})
    res.redirect('/staff')
  } catch(err){
    console.log(err)
  }
}


module.exports = {
  viewStaff,
  viewOneStaff,
  addNewStaff,
  loadAddStaffForm,
  deleteSingleStaff
}