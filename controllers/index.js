function loadHomePage(req, res) {
  res.render('index.ejs', { 
    layout: './layouts/dashboard', 
    title: 'Dashboard' 
  })
}

module.exports = {
  loadHomePage
}