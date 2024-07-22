require('dotenv').config();
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db');
connectDB()

require('./models/appointment');
require('./models/patient');
require('./models/record');
require('./models/staff');

const authMiddleware = require('./middlewares/authMiddleware')

const router = require('./routes')
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'))
app.use(expressLayouts)
app.use(cookieParser())

app.use('/', router)
app.use('/staff', router)

app.listen(8080)