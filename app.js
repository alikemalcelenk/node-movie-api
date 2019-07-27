
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const index = require('./routes/index');
const movie = require('./routes/movie');  
const director = require('./routes/director');

const app = express();


const db = require("./helper/db.js")();

const config = require("./config"); 
app.set("api_secret_key", config.api_secret_key);  

//4-2- middleware
const verifyToken = require("./middleware(arakatman)/verify-token"); 


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use("/api/", verifyToken);  
app.use('/api/movies', movie); 
app.use("/api/directors", director); 

app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
});

module.exports = app;
