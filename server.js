const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Create a MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // Connect to the MySQL database
db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }
    console.log('Connected to the MySQL database');
  });

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching patients:', err);
        return res.status(500).send('Server Error');
      }
      res.json(results);
    });
  });

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching providers:', err);
        return res.status(500).send('Server Error');
      }
      res.json(results);
    });
  });

// Question 3: Filter patients by first name
app.get('/patients/search', (req, res) => {
    const firstName = req.query.first_name;
    const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
    db.query(query, [firstName], (err, results) => {
      if (err) {
        console.error('Error fetching patients by first name:', err);
        return res.status(500).send('Server Error');
      }
      res.json(results);
    });
  });

// Question 4: Retrieve providers by specialty
app.get('/providers/search', (req, res) => {
    const specialty = req.query.provider_specialty;
    const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
    db.query(query, [specialty], (err, results) => {
      if (err) {
        console.error('Error fetching providers by specialty:', err);
        return res.status(500).send('Server Error');
      }
      res.json(results);
    });
  });

// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})

