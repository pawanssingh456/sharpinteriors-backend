require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const aboutUsRoutes = require('./routes/about-us');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');

const database = require('./config/database');

const app = express();
const port = process.env.PORT;

/* Initialization */
database.initialize(error => {
  if (error) {
    console.error('Error connecting to Sharp Interiors Database');
    console.error(error);
    process.exit(1);
  }
  console.log('Connected to Sharp Interiors Database');
});

app.listen(port, () =>
  console.log(`Sharp Interiors is listening on port ${port}`)
);

/* Wiring */
app.use(bodyParser.json());

app.use('/about-us', aboutUsRoutes);

app.use('/users', userRoutes);

app.use('/messages', messageRoutes);
