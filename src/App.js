import React, { useState, useEffect } from 'react';
import ExerciseList from './ExerciseList';
import Summary from './Summary';

function App() {
  const [exercises, setExercises] = useState([]);
  const [isSummary, setIsSummary] = useState(false);
  const [summaryDetails, setSummaryDetails] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0); // For countdown
  const [isBreak, setIsBreak] = useState(false); // 30 sec break between exercises

  const addExercise = (name, duration) => {
    setExercises([...exercises, { name, duration: parseInt(duration), completed: false }]);
  };

  const startExercises = () => {
    setIsRunning(true);
    setCurrentExerciseIndex(0);
    setTimer(exercises[0].duration); // Start the first exercise timer
  };

  // Timer logic: Handles countdown and moves to the next exercise
  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && timer === 0) {
      // If timer reaches 0, mark the current exercise as completed
      completeExercise();
    }
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [isRunning, timer]);

  const completeExercise = () => {
    if (currentExerciseIndex < exercises.length) {
      let updatedExercises = [...exercises];
      updatedExercises[currentExerciseIndex].completed = true;
      setExercises(updatedExercises);

      // Check if break is needed
      if (!isBreak) {
        setIsBreak(true); // Start a break
        setTimer(10); // 30-second break timer
      } else {
        // Move to the next exercise after the break
        setIsBreak(false);
        const nextExerciseIndex = currentExerciseIndex + 1;
        if (nextExerciseIndex < exercises.length) {
          setCurrentExerciseIndex(nextExerciseIndex);
          setTimer(exercises[nextExerciseIndex].duration);
        } else {
          endEarly(); // All exercises are completed
        }
      }
    }
  };

  const skipExercise = (index) => {
    let updatedExercises = [...exercises];
    updatedExercises[index].completed = true;
    setExercises(updatedExercises);

    if (index === currentExerciseIndex) {
      completeExercise(); // Skip the current exercise
    }
  };

  const endEarly = () => {
    setIsRunning(false);
    setSummaryDetails(exercises);
    setIsSummary(true); // Navigate to Summary
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!isSummary ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">Exercise Routine</h1>
          <ExerciseList
            exercises={exercises}
            addExercise={addExercise}
            skipExercise={skipExercise}
            isRunning={isRunning}
            currentExerciseIndex={currentExerciseIndex}
            timer={timer}
            isBreak={isBreak}
          />
          {!isRunning && exercises.length > 0 && (
            <div className="mt-4">
              <button
                onClick={startExercises}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Start
              </button>
              <button
                onClick={endEarly}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                End Early
              </button>
            </div>
          )}
        </div>
      ) : (
        <Summary summaryDetails={summaryDetails} />
      )}
    </div>
  );
}

export default App;
