const jwt = require('jsonwebtoken');
require('dotenv').config();

const user_id = '65bd0c001b0bc8139415dd96';
const token = jwt.sign({ user_id }, 'secret', { expiresIn: '1h' });

console.log('Generated JWT token:', token);
