require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const config = require('./utils/config');

mongoose.set('strictQuery', false);
logger.info('connecting to mongo', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to mongo');
  })
  .catch((err) => {
    logger.error('error connecting to mongo', err.message);
  });

const {
  errorHandler,
  unknownEndpoint,
  requestLogger,
} = require('./utils/middleware');

app.use(cors());
app.use(express.static('dist'));
app.use(requestLogger);

const notesRouter = require('./controllers/notes');

app.use('/api/notes', notesRouter);

// this has to be the last loaded middleware.
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
