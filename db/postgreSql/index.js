const {
  Pool,
  Client,
} = require('pg');

const client = new Client({
  user: 'mo',
  host: '127.0.0.1',
  database: 'quickstarter',
  password: '',
  port: 5432,
});
const pool = new Pool();

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
      console.log(res);
      resolve(res.rows);
    }
  });
});

// Query for fetching all levels for the project
const getProjectInfo = projectId => new Promise((resolve, reject) => {
  const query = `SELECT aboutInfo FROM projects WHERE id=${projectId}`;
  client.query(query, (err, res) => {
    if (err) {
      console.log(err.stack);
      reject(err);
    } else {
      console.log(res.rows[0]);
      resolve(res.rows[0]);
    }
  });
});


module.exports = {
  getAllLevels,
  getProjectInfo,
};
