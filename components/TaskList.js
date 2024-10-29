import React, { useEffect } from 'react';
import useTasksStore from '../hooks/useTaskStore';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks, fetchTasks } = useTasksStore();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        await fetchTasks(); // Call the fetchTasks method from the store
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Handle the error (e.g., show a message to the user)
      }
    };

    loadTasks(); // Fetch tasks when the component mounts
  }, [fetchTasks]); // Add fetchTasks as a dependency

  return (
    <div className="space-y-4 p-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
