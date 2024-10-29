import React from 'react';
import styles from './RecurrencePicker.module.css'; // Import the CSS module

const RecurrencePicker = ({ recurrence, setRecurrence }) => {
  return (
    <div className={styles.recurrencePickerContainer}>
      <label className={styles.recurrenceLabel}>Frequency</label>
      <select
        value={recurrence.frequency}
        onChange={(e) => setRecurrence({ ...recurrence, frequency: e.target.value })}
        className={styles.recurrenceSelect}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <label className={styles.recurrenceLabel}>Interval</label>
      <input
        type="number"
        min="1"
        value={recurrence.interval}
        onChange={(e) => setRecurrence({ ...recurrence, interval: Number(e.target.value) })}
        className={styles.recurrenceInput}
      />
    </div>
  );
};

export default RecurrencePicker;
