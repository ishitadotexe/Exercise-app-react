import React from 'react';

const Summary = ({ summaryDetails }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Summary</h2>
      <ul>
        {summaryDetails.map((exercise, index) => (
          <li key={index} className="mb-2">
            <p>{exercise.name}</p>
            <p>Time: {exercise.duration} seconds</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;
