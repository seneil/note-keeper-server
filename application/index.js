const config = require('config');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('./../application/common/logger');

const app = express();
const router = require('./router');

const { port, env } = config.get('application');

app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan(env === 'test' ? 'development' : 'combined'));
app.use('/api', router);

app.listen(port, () => {
  if (config.has('mongodb.uri')) {
    require('./db');
  }

  logger.info('Find the server at: http://localhost:%s/', port);
});

module.exports = app;
