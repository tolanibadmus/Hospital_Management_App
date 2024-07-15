function viewStaff (req, res) {
  res.render('staff.ejs', {
    layout: './layouts/dashboard', 
    title: 'Staff'
  })
}

function addNewStaff (req, res){
  res.render('addStaff.ejs', {
    layout: './layouts/dashboard', 
    title: 'Add New Staff'
  })
}

module.exports = {
  viewStaff,
  addNewStaff
}