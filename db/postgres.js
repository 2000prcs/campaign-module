const { Pool, Client } = require('pg');
const client = new Client({
  host: 'localhost',
  port: 5334,
  user: 'mo',
  password: '',
});
const pool = new Pool();

client.connect(err => {
  if (err) {
    console.error('connection error', err);
  } else {
    console.log('connected');
  }
});

client.query('INSERT',[ ])
  .then(result => console.log(result))
  .catch(e => console.error(e.stack))
  .then(() => client.end);

module.exports = {
  query: (text, params) => pool.query(text, params)
}