const jwt = require('jsonwebtoken');

function generateToken(userId) {
  return jwt.sign({ user_id: userId }, 'SecretKey', { expiresIn: '1h' });
}

// Example usage:
const userId = '65bd0c001b0bc8139415dd96'; // Replace with the actual user ID
const token = generateToken(userId);
console.log(token);
