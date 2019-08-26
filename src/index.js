require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(helmet());
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))


require('./app/controllers/index')(app);

app.listen(3000, () =>{
    console.log('App rodando na porta 3000');
});
