import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { IconNumbers } from '@tabler/icons-react';
import { HelpCircleIcon } from 'lucide-react';

const MCQsTestPage = () => {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [selectedType, setSelectedType] = useState('frontend');
    const [questionNumber, setQuestionNumber] = useState(1);
    const [remainingTime, setRemainingTime] = useState(600);
    const [testStarted, setTestStarted] = useState(false);
    const [inactivityTimer, setInactivityTimer] = useState(null);

    useEffect(() => {
        let timer = null;
        if (remainingTime > 0 && testStarted && !submitted) {
          timer = setTimeout(() => {
            setRemainingTime(prevTime => prevTime - 1);
          }, 1000);
        } else if (remainingTime === 0 && testStarted && !submitted) {
          handleSubmit();
        }
        return () => clearTimeout(timer);
      }, [remainingTime, testStarted, submitted]);
    
      useEffect(() => {
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'hidden' && testStarted) {
            document.title = 'Please focus on the test!';
            alert("You are not allowed to change tabs. If tab is changed for more than 5 seconds cheating will be considered")
            setInactivityTimer(setTimeout(() => {
              alert("You've been inactive. AI proctoring round is over due to cheating. Your test will be automatically submitted.");
              handleSubmit();
            }, 5000));
          } else {
            document.title = 'Test in Progress';
            clearTimeout(inactivityTimer);
          }
        };
    
        document.addEventListener('visibilitychange', handleVisibilityChange);
    
        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          clearTimeout(inactivityTimer);
        };
      }, [inactivityTimer, testStarted]);
    
    
      const mcqs = {
        frontend: [
              {
                question: 'What does HTML stand for?',
                options: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language', 'Hyper Tool Markup Language'],
                answer: 'Hyper Text Markup Language',
              },
              {
                question: 'What is the correct HTML element for inserting a line break?',
                options: ['<break>', '<lb>', '<br>', '<hr>'],
                answer: '<br>',
              },
              {
                question: 'Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?',
                options: ['alt', 'title', 'src', 'href'],
                answer: 'alt',
              },
              {
                question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
                options: ['In the <head> section', 'In the <body> section', 'At the end of the document', 'In the <footer> section'],
                answer: 'In the <head> section',
              },
              {
                question: 'Which HTML tag is used to define an internal style sheet?',
                options: ['<style>', '<script>', '<css>', '<link>'],
                answer: '<style>',
              },
              // CSS questions
              {
                question: 'What does CSS stand for?',
                options: ['Creative Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets', 'Colorful Style Sheets'],
                answer: 'Cascading Style Sheets',
              },
              {
                question: 'Which CSS property controls the text size?',
                options: ['font-size', 'text-style', 'font-style', 'text-size'],
                answer: 'font-size',
              },
              {
                question: 'Which property is used to create space around elements, outside of any defined borders?',
                options: ['margin', 'padding', 'border', 'spacing'],
                answer: 'margin',
              },
              {
                question: 'Which property is used to change the left margin of an element?',
                options: ['margin-left', 'padding-left', 'indent', 'margin-right'],
                answer: 'margin-left',
              },
              {
                question: 'What is the correct CSS syntax for making all the <p> elements bold?',
                options: ['p {font-weight: bold;}', 'p {text-size: bold;}', 'p {font-style: bold;}', 'p {style: bold;}'],
                answer: 'p {font-weight: bold;}',
              },
              // ReactJS questions
              {
                question: 'What is React?',
                options: ['A JavaScript library for building user interfaces', 'A programming language', 'A framework for back-end development', 'An operating system'],
                answer: 'A JavaScript library for building user interfaces',
              },
              {
                question: 'Which of the following lifecycle methods is/are called during the mounting phase in React?',
                options: ['componentDidMount()', 'render()', 'componentWillUnmount()', 'componentDidUpdate()'],
                answer: 'componentDidMount()',
              },
              {
                question: 'What is the virtual DOM in React?',
                options: ['A lightweight version of the actual DOM', 'A representation of the UI in memory', 'A type of DOM manipulation technique', 'An alternative to HTML'],
                answer: 'A representation of the UI in memory',
              },
              {
                question: 'Which of the following is a valid way to create a component in React?',
                options: ['class MyComponent extends Component {}', 'function MyComponent() {}', 'const MyComponent = () => {}', 'All of the above'],
                answer: 'All of the above',
              },
              {
                question: 'What is the purpose of setState() in React?',
                options: ['To update the component\'s state', 'To define the initial state of the component', 'To render the component', 'To access props passed to the component'],
                answer: 'To update the component\'s state',
              },
              {
                question: 'What is JSX in React?',
                options: ['JavaScript XML', 'JavaScript Extension', 'JavaScript Syntax', 'JavaScript Execution'],
                answer: 'JavaScript XML',
              },
              {
                question: 'What is the purpose of props in React?',
                options: ['To pass data from parent to child components', 'To style components', 'To define state within a component', 'To handle user interactions'],
                answer: 'To pass data from parent to child components',
              },
              {
                question: 'What is the key property used for in React lists?',
                options: ['To identify elements uniquely within a list', 'To apply styles to list items', 'To define the order of list items', 'To access list items in the DOM'],
                answer: 'To identify elements uniquely within a list',
              },
              {
                question: 'What is the purpose of useEffect() hook in React?',
                options: ['To perform side effects in function components', 'To define component lifecycle methods', 'To create new components', 'To handle form submissions'],
                answer: 'To perform side effects in function components',
              },
              {
                question: 'What is the purpose of useRef() hook in React?',
                options: ['To access DOM elements or React elements', 'To create references to components', 'To manage component state', 'To handle asynchronous operations'],
                answer: 'To access DOM elements or React elements',
              },
              
          // Add more frontend MCQs here
        ].slice(0, 10),
        backend: [
            {
                question: 'What is Node.js?',
                options: ['A JavaScript runtime built on Chrome\'s V8 JavaScript engine', 'A Java runtime environment', 'A PHP framework', 'None of the above'],
                answer: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
              },
              {
                question: 'What is an API?',
                options: ['Application Programming Interface', 'Application Program Interface', 'Application Protocol Interface', 'All of the above'],
                answer: 'Application Programming Interface',
              },
              {
                question: 'What is the purpose of SQL?',
                options: ['To manage and manipulate databases', 'To style web pages', 'To handle client-side scripting', 'To define the structure of HTML documents'],
                answer: 'To manage and manipulate databases',
              },
              {
                question: 'What is a RESTful API?',
                options: ['An architectural style for designing networked applications', 'A programming language', 'A framework for building web applications', 'An operating system'],
                answer: 'An architectural style for designing networked applications',
              },
              {
                question: 'What is the difference between PUT and POST requests in RESTful APIs?',
                options: ['PUT is idempotent, while POST is not', 'POST is idempotent, while PUT is not', 'Both PUT and POST are idempotent', 'Neither PUT nor POST are idempotent'],
                answer: 'PUT is idempotent, while POST is not',
              },
              {
                question: 'What is the purpose of middleware in Node.js?',
                options: ['To handle requests and responses in the application pipeline', 'To store session data', 'To define route endpoints', 'To serve static files'],
                answer: 'To handle requests and responses in the application pipeline',
              },
              {
                question: 'What is a NoSQL database?',
                options: ['A non-relational database', 'A relational database', 'A programming language', 'An operating system'],
                answer: 'A non-relational database',
              },
              {
                question: 'What is the purpose of authentication in web applications?',
                options: ['To verify the identity of users', 'To style web pages', 'To handle client-side scripting', 'To define the structure of HTML documents'],
                answer: 'To verify the identity of users',
              },
              {
                question: 'What is the difference between synchronous and asynchronous programming?',
                options: ['Synchronous code executes line by line and blocks further execution until the current operation is completed, while asynchronous code allows the program to continue executing other tasks without waiting for the current operation to finish', 'Asynchronous code executes line by line and blocks further execution until the current operation is completed, while synchronous code allows the program to continue executing other tasks without waiting for the current operation to finish', 'Both synchronous and asynchronous code execute line by line and block further execution until the current operation is completed', 'Neither synchronous nor asynchronous code execute line by line'],
                answer: 'Synchronous code executes line by line and blocks further execution until the current operation is completed, while asynchronous code allows the program to continue executing other tasks without waiting for the current operation to finish',
              },
              {
                question: 'What is the purpose of indexing in databases?',
                options: ['To improve the performance of queries by allowing for faster data retrieval', 'To encrypt sensitive data', 'To define relationships between tables', 'To restrict access to certain data'],
                answer: 'To improve the performance of queries by allowing for faster data retrieval',
              },
              {
                question: 'What is the purpose of a database index?',
                options: [
                  'To improve the speed of data retrieval operations',
                  'To prevent unauthorized access to the database',
                  'To define relationships between tables',
                  'To store encrypted data'
                ],
                answer: 'To improve the speed of data retrieval operations'
              },
              {
                question: 'What is a primary key in a database?',
                options: [
                  'A unique identifier for each record in a table',
                  'An index that improves query performance',
                  'A foreign key that references another table',
                  'A constraint that enforces data integrity'
                ],
                answer: 'A unique identifier for each record in a table'
              },
              {
                question: 'What is the purpose of normalization in database design?',
                options: [
                  'To reduce data redundancy and improve data integrity',
                  'To improve query performance by creating indexes',
                  'To encrypt sensitive data',
                  'To define relationships between tables'
                ],
                answer: 'To reduce data redundancy and improve data integrity'
              },
              {
                question: 'What is a transaction in the context of databases?',
                options: [
                  'A unit of work performed on a database that must be completed as a whole or not at all',
                  'A mechanism for storing data in tables',
                  'A query language used to retrieve data from a database',
                  'A way to define relationships between tables'
                ],
                answer: 'A unit of work performed on a database that must be completed as a whole or not at all'
              },
              {
                question: 'What is the difference between SQL and NoSQL databases?',
                options: [
                  'SQL databases are relational, while NoSQL databases are non-relational',
                  'SQL databases use a structured query language, while NoSQL databases use a variety of query languages',
                  'SQL databases are only used for storing structured data, while NoSQL databases can store unstructured data as well',
                  'SQL databases are faster and more scalable than NoSQL databases'
                ],
                answer: 'SQL databases are relational, while NoSQL databases are non-relational'
              },
              {
                question: 'What is the purpose of a foreign key in a database?',
                options: [
                  'To establish a relationship between two tables',
                  'To improve the performance of queries',
                  'To encrypt sensitive data',
                  'To define the structure of a table'
                ],
                answer: 'To establish a relationship between two tables'
              },
              {
                question: 'What is a stored procedure?',
                options: [
                  'A set of SQL statements that can be executed as a single unit',
                  'A way to define relationships between tables',
                  'A constraint that enforces data integrity',
                  'A mechanism for storing data in tables'
                ],
                answer: 'A set of SQL statements that can be executed as a single unit'
              },
              {
                question: 'What is the purpose of a web server?',
                options: [
                  'To process and respond to HTTP requests from clients',
                  'To store and retrieve data from a database',
                  'To generate dynamic content for web applications',
                  'To encrypt data transmitted over the network'
                ],
                answer: 'To process and respond to HTTP requests from clients'
              },
              {
                question: 'What is the purpose of caching in web applications?',
                options: [
                  'To improve performance by storing frequently accessed data in memory',
                  'To prevent unauthorized access to sensitive data',
                  'To define the structure of HTML documents',
                  'To restrict access to certain parts of the application'
                ],
                answer: 'To improve performance by storing frequently accessed data in memory'
              },
              {
                question: 'What is a session in web development?',
                options: [
                  'A way to track user interactions with a website over multiple requests',
                  'A unit of work performed on a database',
                  'A mechanism for storing data in tables',
                  'A query language used to retrieve data from a database'
                ],
                answer: 'A way to track user interactions with a website over multiple requests'
              }
          // Add more backend MCQs here
        ].slice(0, 10),
        // fullstack: [
        //   {
        //     question: 'What is MERN Stack?',
        //     options: ['MongoDB, Express.js, React, Node.js', 'MySQL, Express.js, React, Node.js', 'MongoDB, Ember.js, React, Node.js', 'None of the above'],
        //     answer: 'MongoDB, Express.js, React, Node.js',
        //   },
        //   // Add more fullstack MCQs here
        // ],
        dsa: [
            {
                question: 'What is a data structure?',
                options: [
                  'A way of organizing and storing data',
                  'A programming language',
                  'An algorithm for sorting data',
                  'A type of computer hardware'
                ],
                answer: 'A way of organizing and storing data'
              },
              {
                question: 'Which data structure uses a Last-In-First-Out (LIFO) approach?',
                options: [
                  'Stack',
                  'Queue',
                  'Heap',
                  'Tree'
                ],
                answer: 'Stack'
              },
              {
                question: 'What is the time complexity of searching in a binary search tree (BST) in the worst case?',
                options: [
                  'O(log n)',
                  'O(n)',
                  'O(n log n)',
                  'O(1)'
                ],
                answer: 'O(log n)'
              },
              {
                question: 'Which sorting algorithm has the best time complexity in the average case?',
                options: [
                  'Merge sort',
                  'Bubble sort',
                  'Quick sort',
                  'Insertion sort'
                ],
                answer: 'Quick sort'
              },
              {
                question: 'What is the purpose of dynamic programming?',
                options: [
                  'To efficiently solve problems by breaking them down into simpler subproblems',
                  'To allocate memory dynamically during program execution',
                  'To implement parallel processing in algorithms',
                  'To perform operations on dynamic data structures'
                ],
                answer: 'To efficiently solve problems by breaking them down into simpler subproblems'
              },
              {
                question: 'Which data structure is typically used to implement depth-first search (DFS) in graphs?',
                options: [
                  'Stack',
                  'Queue',
                  'Heap',
                  'Array'
                ],
                answer: 'Stack'
              },
              {
                question: 'What is the time complexity of inserting an element into a heap?',
                options: [
                  'O(log n)',
                  'O(n)',
                  'O(1)',
                  'O(n log n)'
                ],
                answer: 'O(log n)'
              },
              {
                question: 'What is the purpose of Big O notation in algorithm analysis?',
                options: [
                  'To describe the upper bound of the time complexity of an algorithm',
                  'To measure the actual running time of an algorithm',
                  'To determine the best case scenario of an algorithm',
                  'To calculate the average case scenario of an algorithm'
                ],
                answer: 'To describe the upper bound of the time complexity of an algorithm'
              },
              {
                question: 'Which data structure uses a First-In-First-Out (FIFO) approach?',
                options: [
                  'Queue',
                  'Stack',
                  'Heap',
                  'Tree'
                ],
                answer: 'Queue'
              },
              {
                question: 'What is the time complexity of searching in a hash table with a good hash function?',
                options: [
                  'O(1)',
                  'O(log n)',
                  'O(n)',
                  'O(n log n)'
                ],
                answer: 'O(1)'
              },
              {
                question: 'What is the time complexity of binary search?',
                options: [
                  'O(log n)',
                  'O(n)',
                  'O(n log n)',
                  'O(1)'
                ],
                answer: 'O(log n)'
              },
              {
                question: 'Which data structure is typically used to implement breadth-first search (BFS) in graphs?',
                options: [
                  'Queue',
                  'Stack',
                  'Heap',
                  'Array'
                ],
                answer: 'Queue'
              },
              {
                question: 'What is the purpose of a linked list in data structures?',
                options: [
                  'To store elements in contiguous memory locations',
                  'To organize elements in a hierarchical structure',
                  'To maintain a sorted collection of elements',
                  'To store elements with dynamic sizes and relationships'
                ],
                answer: 'To store elements with dynamic sizes and relationships'
              },
              {
                question: 'Which algorithm is used for finding the shortest path in a weighted graph?',
                options: [
                  'Dijkstra\'s algorithm',
                  'Depth-first search (DFS)',
                  'Breadth-first search (BFS)',
                  'Bellman-Ford algorithm'
                ],
                answer: 'Dijkstra\'s algorithm'
              },
              {
                question: 'What is the worst-case time complexity of the bubble sort algorithm?',
                options: [
                  'O(n)',
                  'O(log n)',
                  'O(n^2)',
                  'O(n log n)'
                ],
                answer: 'O(n^2)'
              },
              {
                question: 'What is the main advantage of using a priority queue over a regular queue?',
                options: [
                  'Priority queues can efficiently dequeue the highest (or lowest) priority element',
                  'Priority queues use less memory than regular queues',
                  'Priority queues have faster insertion time than regular queues',
                  'Priority queues guarantee FIFO (First-In-First-Out) order'
                ],
                answer: 'Priority queues can efficiently dequeue the highest (or lowest) priority element'
              },
              {
                question: 'What is the time complexity of the merge sort algorithm?',
                options: [
                  'O(n)',
                  'O(log n)',
                  'O(n^2)',
                  'O(n log n)'
                ],
                answer: 'O(n log n)'
              },
              {
                question: 'Which data structure is suitable for implementing recursion?',
                options: [
                  'Stack',
                  'Queue',
                  'Heap',
                  'Array'
                ],
                answer: 'Stack'
              },
              {
                question: 'What is the main purpose of using a hash table in data structures?',
                options: [
                  'To efficiently store and retrieve key-value pairs',
                  'To sort elements in ascending order',
                  'To represent hierarchical relationships between elements',
                  'To perform mathematical calculations on elements'
                ],
                answer: 'To efficiently store and retrieve key-value pairs'
              },
              {
                question: 'What is the time complexity of a linear search algorithm?',
                options: [
                  'O(n)',
                  'O(log n)',
                  'O(n^2)',
                  'O(1)'
                ],
                answer: 'O(n)'
              }
        ].slice(0, 10),
      };
    
      const handleSelectAnswer = (type, questionIndex, option) => {
        if (!submitted) {
          setSelectedAnswers({
            ...selectedAnswers,
            [`${type}-${questionIndex}`]: option,
          });
        }
      };
    
      const displayAnswer = (type, questionIndex, selectedOption) => {
        if (submitted) {
          if (selectedOption === mcqs[type][questionIndex].answer) {
            return <span className="text-green-500">Correct!</span>;
          } else {
            return (
              <>
                <span className="text-red-500">Incorrect!</span>
              </>
            );
          }
        }
      };

      
      const calculateScore = () => {
        let score = 0;
        for (const key in selectedAnswers) {
          const [type, index] = key.split('-');
          if (selectedAnswers[key] === mcqs[type][index].answer) {
            score++;
          }
        }
        return score;
      };
    
      const handleSubmit = () => {
        setSubmitted(true);
        const video = document.querySelector('video');
        if (video) {
          video.pause();
          document.body.removeChild(video);
        }
      };
    
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };
    
      const handleStartTest = () => {
        setTestStarted(true);
      };

      useEffect(() => {
        if (testStarted) {
          const video = document.createElement('video');
          video.style.position = 'fixed';
          video.style.top = '10px';
          video.style.right = '10px';
          video.style.width = '200px';
          video.style.height = 'auto';
          document.body.appendChild(video);
      
          let isAlertDisplayed = false;
          let inactivityTimer = null;
      
          Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('models'),
            faceapi.nets.faceExpressionNet.loadFromUri('models')
          ]).then(startVideo);
      
          function startVideo() {
            navigator.mediaDevices.getUserMedia({ video: {} })
              .then(stream => {
                video.srcObject = stream;
                video.play();
              })
              .catch(err => console.error(err));
          }
      
          function handleVisibilityChange() {
            if (document.visibilityState === 'hidden' && !isAlertDisplayed) {
              clearTimeout(inactivityTimer);
              alert("You are not allowed to change tabs. If tab is changed for more than 5 seconds cheating will be considered");
              inactivityTimer = setTimeout(() => {
                isAlertDisplayed = true;
                alert("You've been inactive. AI proctoring round is over due to cheating. Your test will be automatically submitted.");
                video.pause();
                const canvas = document.querySelector('canvas');
                if (canvas) {
                  document.body.removeChild(canvas);
                }
                document.body.removeChild(video);
              }, 5000); // 5 seconds
            } else {
                document.title = 'Test in Progress';
                clearTimeout(inactivityTimer);
            }
          }
          
      
          document.addEventListener('visibilitychange', handleVisibilityChange);
      
          video.addEventListener('play', () => {
            const canvas = faceapi.createCanvasFromMedia(video);
            document.body.append(canvas);
            const displaySize = { width: video.width, height: video.height };
            faceapi.matchDimensions(canvas, displaySize);
            setInterval(async () => {
              const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
              const numFaces = detections.length;
              
              console.log(numFaces)

              if (numFaces >= 2 && !isAlertDisplayed) {
                isAlertDisplayed = true;
                alert('Two faces detected on the screen.');
                setTimeout(() => {
                  isAlertDisplayed = false;
                }, 5000);
              }
              
              if (numFaces >= 2) {
                video.pause(); // Pause the video if two or more faces detected
              } else {
                video.play(); // Continue playing the video if less than two faces detected
              }

              if (numFaces == 0 && !isAlertDisplayed) {
                isAlertDisplayed = true;
                alert('No face detected on the screen.');
                setTimeout(() => {
                  isAlertDisplayed = false;
                }, 5000);
              }

              if(numFaces==0) {
                video.pause();
              } else {
                video.play();
              }

              const resizedDetections = faceapi.resizeResults(detections, displaySize);
              canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
              faceapi.draw.drawDetections(canvas, resizedDetections);
              faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
              faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
            }, 100);
          });
      
          return () => {
            document.body.removeChild(video);
          };
        }
      }, [testStarted]);
      

  return (
    <div className="transform scale-65 relative top-0 text-white">
      <div className="mb-4">
        <label className="text-gray-500 mr-2">Select MCQ Type:</label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded-md"
        >
          <option value="frontend">Frontend MCQs</option>
          <option value="backend">Backend MCQs</option>
          {/* <option value="fullstack">Fullstack MCQs</option> */}
          <option value="dsa">DSA MCQs</option>
        </select>
      </div>
      {!testStarted && (
        <button
          onClick={handleStartTest}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Start Test
        </button>
      )}
      {testStarted && (
        <p className="mb-2 text-lg">Remaining Time: {formatTime(remainingTime)}</p>
      )}
      {mcqs[selectedType].map((mcq, index) => {
        const currentQuestionNumber = questionNumber + index;
        return (
          <div key={index} className='mt-16'>
            <h3 className="text-xl font-semibold">{`Question ${currentQuestionNumber}: ${mcq.question}`}</h3>
            <p className="text-gray-500 mb-2">Choose 1 answer</p>
            <hr className="my-4" />
            {mcq.options.map((option, optionIndex) => (
              <div key={optionIndex} id={`block-${index}-${optionIndex}`} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`option-${index}`}
                  value={option}
                  id={`option-${index}-${optionIndex}`}
                  className="mr-2 transform scale-150"
                  onChange={() => handleSelectAnswer(selectedType, index, option)}
                />
                <label htmlFor={`option-${index}-${optionIndex}`} className="text-lg">{option}</label>
                <span id={`result-${index}-${optionIndex}`} className="ml-4">{selectedAnswers[`${selectedType}-${index}`] === option ? displayAnswer(selectedType, index, option) : null}</span>
              </div>
            ))}
            <hr className="my-4" />
          </div>
        );
      })}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        disabled={submitted}
      >
        Submit
      </button>
      {submitted && (
        <p className="text-lg mt-4">
          Your Score: {calculateScore()} / {Object.keys(selectedAnswers).length}
        </p>
      )}
    </div>
  );
};

export default MCQsTestPage;
