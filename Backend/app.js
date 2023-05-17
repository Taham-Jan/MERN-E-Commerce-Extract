const createHttpError = require('http-errors');
const morgan = require('morgan');
const express = require('express');
const productRoute = require('./Routes/product');
const userRoute = require('./Routes/user');
const orderRoute = require('./Routes/order');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const app = express();
require("./util/sale-expiry");
const jsonParser = bodyParser.json({
  limit: '50mb',
  extended: true,
});

const urlEncodedParser = bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
});

app.use(jsonParser);
app.use(urlEncodedParser);
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ limit: "50mb", extended:true}));
app.use(fileUpload());
app.get('/sample', (req, res) => {
 res.status(200).json({message:"whatsup"})
});
app.use('/api/v1',productRoute);
app.use('/api/v1',userRoute);
app.use('/api/v1',orderRoute);



//CREATEHTTPERROR
app.use((error, req, res, next) => {
  console.error(error);
  let statusCode = error.status || 500;
  let errorMessage = error.message || 'An unknown error occurred.';

  if (error.name === 'CastError') {
    statusCode = 400;
    errorMessage = `Resource not found. Invalid: ${error.path}`;
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 400;
    errorMessage = 'Invalid JSON web token.';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    errorMessage = 'Expired JSON web token.';
  }

  // Handle all other errors
  if (!res.headersSent) {
    const errorResponse = { error: errorMessage };
    res.status(statusCode).json(errorResponse);
  }
});
// app.use((error,req,res,next) => {
//     console.error(error);
//     let errorMessage = 'An Unknown Error occured';
//     let statuscode = 500;
//     if(createHttpError.isHttpError(error)) {
//        statuscode =error.status;
//        errorMessage=error.message;
//     }
//     if(error.name === "CastError") {
//       statuscode =400;
//       errorMessage = `Resource not found. Invalid:${error.path}`
//     }
//     if(error.name === "JsonWebTokenError") {
//       statuscode =400;
//       errorMessage = `Json Web Token is Invalid, try again!`
//     }
//     if(error.name === "TokenExpiredError") {
//       statuscode =401;
//       errorMessage = `Json Web Token is Expired, try again!`
//     }
//     res.status(statuscode).json({ error: errorMessage })
//  }); 
 

module.exports = app;