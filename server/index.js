require('newrelic');
const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes.js');
const responseTime = require('response-time');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const masterProcess = () => {
  console.log(`Master ${process.pid} started`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code) => {
    if (code) {
      console.log(`Worker ${worker.process.pid} killed by error, code ${code}`);
    } else {
      console.log(`Worker ${worker.process.pid} exited`);
    }
  });
};

if (cluster.isMaster && numCPUs > 1) {
  masterProcess();
} else {
  const app = express();

  const port = process.env.PORT || 7777;

  // Logging and parsing
  app.use(morgan('dev'));
  app.use(parser.json());
  app.use(parser.urlencoded({ extended: true }));
  app.use(cors());
  app.use(responseTime());

  // routes for each API request
  app.use('/', router);

  // Server static files from public forder (can be changed in the future)
  // app.use(express.static(`${__dirname}/../client/dist`));
  app.use(express.static('public'));

  app.listen(port, () => {
    console.log(`Worker ${process.pid} listening on port ${port}`);
  });
}
