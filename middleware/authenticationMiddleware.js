const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Authorization token not provided' });
  }

  try {
    console.log('Received token:', token);

    const decoded = jwt.verify(token, 'SecretKey');

    console.log('Decoded token payload:', decoded);

    const user = await User.findById(decoded.user_id);

    if (!user) {
      console.log('User not found for decoded user_id:', decoded.user_id);
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error verifying token:', error.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};


module.exports = authMiddleware;




