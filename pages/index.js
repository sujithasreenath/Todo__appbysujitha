import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import styles from './index..module.css'; // Import the CSS module

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>To-Do List with Recurrence</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Home;

