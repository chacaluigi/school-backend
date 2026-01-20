const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',
  database: 'school',
  user: 'root',
  password: '',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Database connected...');
});
