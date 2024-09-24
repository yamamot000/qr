const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'johndalecpena12',
  database: 'enrollment_db'
});

db.query(CREATE TABLE IF NOT EXISTS student_enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  qr_code_data VARCHAR(255) NOT NULL,
  enrollment_date DATE NOT NULL
));
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/api/enroll', (req, res) => {
  const { qr_code_data } = req.body;
  const enrollment_date = new Date().toISOString().slice(0, 10);  

  db.query('INSERT INTO student_enrollments (qr_code_data, enrollment_date) VALUES (?, ?)', [qr_code_data, enrollment_date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error storing enrollment data');
    }
    res.status(200).send('Enrollment data stored successfully');
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
