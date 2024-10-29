const express = require('express');
const router = express.Router();

// GET /api/tasks - Retrieve all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await req.pool.query('SELECT * FROM tasks');
    res.json(tasks.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/tasks - Add a new task
router.post('/', async (req, res) => {
  const { title, startDate, endDate, frequency, interval, daysOfWeek } = req.body;
  try {
    const newTask = await req.pool.query(
      'INSERT INTO tasks (title, start_date, end_date, frequency, interval, days_of_week) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, startDate, endDate, frequency, interval, daysOfWeek]
    );
    res.status(201).json(newTask.rows[0]);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/tasks/:id - Update a task by ID
router.put('/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, startDate, endDate, frequency, interval, daysOfWeek } = req.body;
  try {
    const updatedTask = await req.pool.query(
      'UPDATE tasks SET title = $1, start_date = $2, end_date = $3, frequency = $4, interval = $5, days_of_week = $6 WHERE id = $7 RETURNING *',
      [title, startDate, endDate, frequency, interval, daysOfWeek, taskId]
    );
    if (updatedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask.rows[0]);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/tasks/:id - Delete a task by ID
router.delete('/:id', async (req, res) => {
  const taskId = parseInt(req.params.id);

  // Check if the taskId is a valid number
  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'Invalid task ID' });
  }

  try {
    const deletedTask = await req.pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [taskId]
    );

    if (deletedTask.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
