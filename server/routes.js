const express = require('express');

const router = express.Router();
const db = require('../db/postgreSql/index.js');

const redis = require('redis');


const redisClient = redis.createClient();

// GET request handlers
router.get('/about/:projectId', (req, res) => {
  const projectId = req.params.projectId;
// use the redis client to get room info from redis cache
  redisClient.get(`info-${projectId}`, (error, result) => {
    if (result) {
      // the result exists in cache - return it to our user immediately
      res.send(JSON.parse(result));
    } else {
      // if there's no cached room data, get it from db
      db.getProjectInfo(req.params.projectId)
        .then((results) => {
          // store the key-value pair (id: data) in cache with an expiry of 1 minute (60s)
          redisClient.setex(`info-${projectId}`, 60, JSON.stringify(results));
          res.writeHead(200);
          res.end(results.aboutinfo);
        })
        .catch((err) => {
          console.log('Error while fetching project info', err);
          res.writeHead(404);
          res.end('');
        });
    }
  });
});

router.get('/levels/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  redisClient.get(`levels-${projectId}`, (error, result) => {
    if (result) {
      // the result exists in cache - return it to our user immediately
      res.send(JSON.parse(result));
    } else {
      db.getAllLevels(req.params.projectId)
        .then((results) => {
          redisClient.setex(`levels-${projectId}`, 60, JSON.stringify(results));
          res.writeHead(200);
          res.end(JSON.stringify(results));
        })
        .catch((err) => {
          console.log('Error while fetching levels', err);
          res.writeHead(404);
          res.end('');
        });
    }
  });
});


// POST request handlers
router.post('/pledges/:projectId/:levelId', (req, res) => {
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

router.post('/pledges/:projectId', (req, res) => {
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
