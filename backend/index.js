const express = require('express');
const router = require('./Routes/index');

const app = express();
app.use(express.json());

app.use('/api', router);

app.listen(8000, () => {
  console.log('server has been started');
});
