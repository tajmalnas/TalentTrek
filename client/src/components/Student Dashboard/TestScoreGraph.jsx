import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Axios } from "axios";

const TestScoreGraph = () => {
  const [testScores, setTestScores] = useState([]);
  const chartRef = useRef(null);

  // Mock test scores data
  useEffect(() => {
    // Assuming you fetch test scores from an API or any other source
    // Here, we are just mocking the data
    const mockTestScores = [80, 75, 85, 90, 78]; // Example test scores
    setTestScores(mockTestScores);
  }, []);

  useEffect(() => {
    // Destroy existing chart before creating a new one
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    // Initialize Chart.js
    const ctx = document.getElementById("testScoreChart");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: testScores.map((_, index) => `Test ${index + 1}`),
        datasets: [
          {
            label: "Test Scores",
            data: testScores,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "rgba(75, 192, 192, 1)",
            pointRadius: 5,
            pointHoverRadius: 7, // Optional: increase hover radius
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup function
    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
    };
  }, [testScores]);

  return (
    <div>
      <h2 className="border-b mb-4 border-[#2d2f40] pb-4 font-bold tracking-wide text-xl">
        Track of Previous Test Scores
      </h2>
      <canvas id="testScoreChart"></canvas>
    </div>
  );
};

export default TestScoreGraph;
