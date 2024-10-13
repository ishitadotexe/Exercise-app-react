import React, { useState } from 'react';

const ExerciseInput = ({ addExercise }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && duration > 0) {
      addExercise({ name, duration });
      setName('');
      setDuration(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Exercise Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <input
        type="number"
        placeholder="Duration (seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Exercise</button>
    </form>
  );
};

export default ExerciseInput;
