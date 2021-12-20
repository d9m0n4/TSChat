const express = require('express');
const mongoose = require('mongoose');
const router = require('./Routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const createSocket = require('./core/socket');

require('dotenv').config();

const app = express();
const http = createServer(app);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);
app.use(cookieParser());
app.use('/api', router);

createSocket(http);

const start = () => {
  try {
    http.listen(process.env.PORT, () => {
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
