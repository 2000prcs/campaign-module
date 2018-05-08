const express = require('express');

const router = express.Router();
const db = require('../db/postgreSql/index.js');

// GET request handlers
router.get('/levels/:projectId', (req, res) => {
  db.getAllLevels(req.params.projectId)
    .then((results) => {
      console.log('Results from DB', results);
      res.writeHead(200);
      res.end(JSON.stringify(results));
    })
    .catch((err) => {
      console.log('Error while fetching levels', err);
      res.writeHead(404);
      res.end('');
    });
  // res.send(req.params.projectId);
});

router.get('/about/:projectId', (req, res) => {
  db.getProjectInfo(req.params.projectId)
    .then((results) => {
      console.log('Results from DB', results.aboutinfo);
      res.writeHead(200);
      res.end(results.aboutinfo);
    })
    .catch((err) => {
      console.log('Error while fetching project info', err);
      res.writeHead(404);
      res.end('');
    });
});

// app.get('/levels/:projectId', (req, res) => {
//   getLevels(req.params.projectId)
//     .then((results) => {
//       res.writeHead(200);
//       res.end(results);
//     })
//     .catch((err) => {
//       console.log('ERROR in get /levels', err);
//       res.writeHead(404);
//       res.end('');
//     });
// });

// app.get('/about/:projectId', (req, res) => {
//   getAboutInfo(req.params.projectId)
//     .then((results) => {
//       res.writeHead(200);
//       res.end(results);
//     })
//     .catch((err) => {
//       console.log('ERROR in get /about', err);
//       res.writeHead(404);
//       res.end('');
//     });
// });


// POST request handlers


module.exports = router;
