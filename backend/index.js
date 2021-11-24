const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/index');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

const start = () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`server has been started on port ${process.env.PORT}`);
    });
    mongoose.connect(
      process.env.DBURL,
      {
        bufferCommands: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log('mongoose started');
      },
    );
  } catch (error) {
    console.log(error);
  }
};

start();
