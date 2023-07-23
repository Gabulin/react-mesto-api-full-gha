const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorMiddleware = require('./middlewares/errors');
const routes = require('./routes/routes');
const cors = require('cors');

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorMiddleware);

async function connect() {
  await mongoose.connect('mongodb://0.0.0.0:27017/mestodb');
  app.listen(PORT);
}

connect();
