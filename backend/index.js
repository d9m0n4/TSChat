const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/index');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

const start = () => {
  try {
    app.listen(8000, () => {
      console.log('server has been started');
    });
    mongoose.connect(
      'mongodb+srv://tschat:tschat1@cluster0.cxrur.mongodb.net/TSCHAT?retryWrites=true&w=majority',
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
