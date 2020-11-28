const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cron = require('node-cron');
const deleteJob = require('./utils/DeleteJob');
const app = express();

//Connect to DB
connectDB();

app.use(cors());
app.use(express.json({extended: false}));

//Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/urls'));

cron.schedule('0 0 * * *', ()=>{
    deleteJob.deleteJob();
});

const port = process.env.PORT || 5000;

app.listen(port);