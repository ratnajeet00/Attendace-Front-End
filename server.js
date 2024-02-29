const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cpp',
  connectionLimit: 10,
});



app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username && password) {
      const [rows] = await pool.query("SELECT * FROM attendance WHERE username = ? AND password = ?", [username, password]);
      
      if (rows.length > 0) {
        console.log(`User '${username}' logged in`);
        res.status(200).json({ message: "success" });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
