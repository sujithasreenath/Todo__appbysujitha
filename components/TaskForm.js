import React, { useState } from 'react';
import useTasksStore from '../hooks/useTaskStore';
import RecurrencePicker from './RecurrencePicker';
import styles from './TaskForm.module.css';

const TaskForm = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasksStore();
  const [title, setTitle] = useState('');
  const [recurrence, setRecurrence] = useState({
    frequency: 'daily',
    interval: 1,
    startDate: null,
    endDate: null,
  });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleAddOrUpdateTask = async () => {
    if (!title.trim()) {
      alert("Task title cannot be empty");
      return;
    }
    
    try {
      if (editingTaskId) {
        await updateTask(editingTaskId, { title, ...recurrence });
      } else {
        await addTask({ title, ...recurrence });
      }
      resetForm();
    } catch (error) {
      console.error("Error while adding/updating task:", error);
      alert("An error occurred while processing your request.");
    }
  };

  const handleEditTask = (task) => {
    setTitle(task.title);
    setRecurrence({
      frequency: task.frequency,
      interval: task.interval,
      startDate: task.startDate,
      endDate: task.endDate,
    });
    setEditingTaskId(task.id);
  };

  const resetForm = () => {
    setTitle('');
    setRecurrence({
      frequency: 'daily',
      interval: 1,
      startDate: null,
      endDate: null,
    });
    setEditingTaskId(null);
  };

  return (
    <div className={styles.taskFormContainer}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.taskFormInput}
      />
      <RecurrencePicker recurrence={recurrence} setRecurrence={setRecurrence} />
      <button onClick={handleAddOrUpdateTask} className={styles.taskFormButton}>
        {editingTaskId ? 'Update Task' : 'Add Task'}
      </button>

      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span>{task.title}</span>
            <button onClick={() => handleEditTask(task)} className={styles.editButton}>Edit</button>
            <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskForm;
