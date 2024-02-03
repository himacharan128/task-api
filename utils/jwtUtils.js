const jwt = require('jsonwebtoken');
require('dotenv').config();

const user_id = '65bd210fb1979b7d3a3aece0';
const token = jwt.sign({ user_id }, 'secret', { expiresIn: '1h' });

console.log('Generated JWT token:', token);
