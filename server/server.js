const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const taskRoutes =require('./api/task');

const app = express();
app.use(cors());
app.use(express.json());

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'sujitha',
  host: 'localhost',
  database: 'todo_db',
  password: 'Lordkrishna',
  port: 5432,
});

// Create tasks table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    start_date DATE,
    end_date DATE,
    frequency VARCHAR(50),
    interval INTEGER,
    days_of_week VARCHAR(255)
  );
`);

// Make the pool accessible in taskRoutes
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

// Use the task routes
app.use('/api/tasks', taskRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
