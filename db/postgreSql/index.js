const { Client } = require('pg');

const client = new Client({
  user: 'mo',
  host: process.env.DB_HOST || 'localhost',
  database: 'quickstarter',
  password: '',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error('Connection error', err);
  } else {
    console.log('Connected!!!');
  }
});

// Query for fetching all levels for the project
const getAllLevels = projectId => new Promise((resolve, reject) => {
  const query = `SELECT * FROM levels WHERE projectId=${projectId}`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      reject(err);
    } else {
      resolve(res.rows);
    }
  });
});

// Query for fetching project information
const getProjectInfo = projectId => new Promise((resolve, reject) => {
  const query = `SELECT aboutInfo FROM projects WHERE id=${projectId}`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      reject(err);
    } else {
      resolve(res.rows[0]);
    }
  });
});


// Saving one pledge -> Increment number of backers for the project -> Increment number of backers for the pledge level
const saveNewPledge = pledge => new Promise((resolve, reject) => {
  console.log('in DB', pledge);
  const query = 'INSERT INTO pledges (userId, backedAmount, projectId, levelId) VALUES ($1, $2, $3, $4);';
  const values = [pledge.userId, pledge.amount, pledge.projectId, pledge.levelId];

  client.query(query, values) 
    .then ((response) => {
      console.log('Saved pledge');
      resolve(response);
    })
    .catch((error) => {
      console.error(error.stack);
      reject(error);
    });
});


const updateNumberOfBackersForProjects = pledge => new Promise((resolve, reject) => {
  const query = `UPDATE projects SET numberOfBackers = numberOfBackers + 1 WHERE id = ${pledge.projectId};`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      reject(err);
    } else {
      console.log('Updated Project');
      resolve(res);
    }
  });
});


const updateNumberOfBackersForLevels = pledge => new Promise((resolve, reject) => {
  const query = `UPDATE levels SET numberOfBackers = numberOfBackers + 1 WHERE id = ${pledge.levelId};`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      reject(err);
    } else {
      console.log('Updated level');
      resolve(res);
    }
  });
});

module.exports = {
  getAllLevels,
  getProjectInfo,
  saveNewPledge,
  updateNumberOfBackersForProjects,
  updateNumberOfBackersForLevels,
};
