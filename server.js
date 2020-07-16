'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { flights } = require('./test-data/flightSeating');
const handlers = require('./handlers/handlers');

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// endpoints
app.get('/', (req, res) => res.status(200).redirect('/seat-select'));
app.get('/flights', handlers.handleFlights);
app.get('/flights/:flightNum', handlers.handleFlight);
app.get('/view-reservation/:id', handlers.handleViewReservation);
app.post('/users', handlers.handleUserSubmit);

app.use((req, res) => res.send('Not Found'));
app.listen(8000, () => console.log(`Listening on port 8000`));
