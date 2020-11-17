const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

//Connect to DB
connectDB();

app.use(cors());
app.use(express.json({extended: false}));

//Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/urls'));

const port = process.env.PORT || 5000;

app.listen(port);