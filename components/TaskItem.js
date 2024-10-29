import React from 'react';
import styles from './TaskItem.module.css'; // Import the CSS module

const TaskItem = ({ task }) => {
  const recurrenceText = `${task.frequency} every ${task.interval} time(s)`;

  return (
    <div className={styles.taskItemContainer}>
      <h4 className={styles.taskTitle}>{task.title}</h4>
      <p className={styles.taskRecurrence}>Recurrence: {recurrenceText}</p>
    </div>
  );
};

export default TaskItem;
