const express = require('express');

const router = express.Router();
const db = require('../db/postgreSql/index.js');

// GET request handlers
router.get('/levels/:projectId', (req, res) => {
  db.getAllLevels(req.params.projectId)
    .then((results) => {
      res.writeHead(200);
      res.end(JSON.stringify(results));
    })
    .catch((err) => {
      console.log('Error while fetching levels', err);
      res.writeHead(404);
      res.end('');
    });
});

router.get('/about/:projectId', (req, res) => {
  db.getProjectInfo(req.params.projectId)
    .then((results) => {
      res.writeHead(200);
      res.end(results.aboutinfo);
    })
    .catch((err) => {
      console.log('Error while fetching project info', err);
      res.writeHead(404);
      res.end('');
    });
});


// POST request handlers
router.post('/pledges/:projectId/:levelId', (req, res)=> {
  const pledge = req.body;
  db.saveNewPledge(pledge)
    .then((results) => {
      db.updateNumberOfBackersForProjects(pledge);
      db.updateNumberOfBackersForLevels(pledge);
      res.writeHead(200);
      console.log('results from DB (level)', results);
      res.end('');
    })
    .catch((err) => {
      console.log('Error while saving pledge for level', err);
      res.writeHead(404);
      res.end('');
    });
});

router.post('/pledges/:projectId', (req, res)=> {
  const pledge = req.body;
  db.saveNewPledge(pledge)
    .then((results) => {
      db.updateNumberOfBackersForProjects(pledge);
      res.writeHead(200);
      console.log('results from DB (project)', results);
      res.end('');
    })
    .catch((err) => {
      console.log('Error while saving pledge for project', err);
      res.writeHead(404);
      res.end('');
    });
});


module.exports = router;
