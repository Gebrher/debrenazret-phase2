import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import cors = require('cors');
import passport = require('passport');
import mongoose = require('mongoose');
import {database} from './config/database.config';
import {router} from './routes/user.routes';


// Database connection using mongoose
 mongoose.connect(database,{ 
   useNewUrlParser: true,
   useUnifiedTopology: true }
  ); 
  // Removing warning
  mongoose.set('useFindAndModify', false);
  
  // connection
 const db = mongoose.connection;

// On Connection
db.on('connected', () => {
  console.log('Connected to Database '+database);
});
// On Error
db.on('error', (err) => {
  console.log('Database Connection Error '+err);
});

const app = express();



// Port Number
const port = process.env.PORT || 9081;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.config')(passport);

app.use('/users', router);

// Index Route
app.get('/', (req, res) => {
  res.send('Not authorized to view this page!');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started and listening on port '+port);
});
