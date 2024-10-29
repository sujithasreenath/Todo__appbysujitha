import { create } from 'zustand';
import axios from 'axios';

const useTasksStore = create((set) => ({
  tasks: [],
  isLoading: false,
  fetchTasks: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get('http://localhost:4000/api/tasks');
      set({ tasks: res.data, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      set({ isLoading: false });
    }
  },
  addTask: async (task) => {
    try {
      const res = await axios.post('http://localhost:4000/api/tasks', task);
      set((state) => ({
        tasks: [...state.tasks, res.data], // Use the response from the server
      }));
    } catch (error) {
      console.error("Failed to add task:", error);
      alert("Error adding task. Please try again.");
    }
  },
  updateTask: async (id, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    }));
    try {
      const res = await axios.put(`http://localhost:4000/api/tasks/${id}`, updatedTask);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? res.data : task
        ),
      }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },
  deleteTask: async (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
    try {
      await axios.delete(`http://localhost:4000/api/tasks/${id}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },
}));

export default useTasksStore;
