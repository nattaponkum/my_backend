const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Function to check if a number is prime
function isPrime(num) {
  // Handle edge cases
  if (num === null || num === undefined || isNaN(num)) {
    return null;
  }
  
  const n = parseInt(num);
  
  // Numbers less than 2 are not prime
  if (n < 2) {
    return false;
  }
  
  // 2 is prime
  if (n === 2) {
    return true;
  }
  
  // Even numbers greater than 2 are not prime
  if (n % 2 === 0) {
    return false;
  }
  
  // Check odd divisors up to square root of n
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  
  return true;
}

// API endpoint - GET request with query parameter
app.get('/api/prime', (req, res) => {
  const number = req.query.number;
  
  if (number === undefined) {
    return res.status(400).json({
      error: 'Missing required parameter: number'
    });
  }
  
  const result = isPrime(number);
  
  if (result === null) {
    return res.status(400).json({
      error: 'Invalid number provided'
    });
  }
  
  res.json({
    number: parseInt(number),
    isPrime: result
  });
});

// API endpoint - POST request with JSON body
app.post('/api/prime', (req, res) => {
  const { number } = req.body;
  
  if (number === undefined) {
    return res.status(400).json({
      error: 'Missing required parameter: number'
    });
  }
  
  const result = isPrime(number);
  
  if (result === null) {
    return res.status(400).json({
      error: 'Invalid number provided'
    });
  }
  
  res.json({
    number: parseInt(number),
    isPrime: result
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Try GET http://localhost:${PORT}/api/prime?number=17`);
  console.log(`Or POST to http://localhost:${PORT}/api/prime with body: {"number": 17}`);
});
