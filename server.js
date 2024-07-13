require('dotenv').config();

const IndexController = require('./controllers/index')

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))


app.get("/", IndexController.loadHomePage)

app.listen(8080)