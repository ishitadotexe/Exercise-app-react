import React, { useState } from 'react';

const ExerciseList = ({ exercises, addExercise, skipExercise, isRunning, currentExerciseIndex, timer, isBreak }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');

  const handleAddExercise = () => {
    if (exerciseName && duration) {
      addExercise(exerciseName, duration);
      setExerciseName('');
      setDuration('');
    } else {
        alert("please enter exercise name and duration")
    }
  };

  return (
    <div>
      <div className="flex mb-4">
        <input
          type="text"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          placeholder="Exercise Name"
          className="border p-2 rounded-md mr-2 w-1/2"
        />
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Time Duration (in seconds)"
          className="border p-2 rounded-md w-1/2"
        />
        <button
          onClick={handleAddExercise}
          className="bg-green-500 text-white px-4 py-2 rounded-md ml-2"
        >
          Add
        </button>
      </div>

      <ul>
        {exercises.map((exercise, index) => (
          <li
            key={index}
            className={`bg-white p-4 rounded-md shadow-md flex justify-between items-center mb-2${
              currentExerciseIndex === index && isRunning ? 'bg-blue-100' : ''
            }`} // listing my exercises 
          >
            <span>
              {exercise.name} - {exercise.duration} seconds
            </span>
            {!exercise.completed && isRunning && currentExerciseIndex === index && !isBreak && (
              <span className="text-red-500 font-bold">{timer} seconds remaining</span>
            )}
            {isBreak && currentExerciseIndex === index && (
              <span className="text-yellow-500 font-bold">{timer} seconds break</span>
            )}
            {!exercise.completed && isRunning && (
              <button
                onClick={() => skipExercise(index)}
                className="bg-red-500 text-white px-4 py-1 rounded-md"
              >
                Skip
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExerciseList;
