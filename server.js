require('dotenv').config();
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('connect-flash')
const connectDB = require('./config/db');
connectDB()

require('./models/appointment');
require('./models/patient');
require('./models/record');
require('./models/staff');


const router = require('./routes')
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(expressLayouts)
app.use(cookieParser())
app.use(session({
  secret:'mysecretkey',
  saveUninitialized: true,
  resave: true,
}));
app.use(flash())

app.use('/', router)

app.listen(8080)