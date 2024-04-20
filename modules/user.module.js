const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Маршрути для користувачів
router.get('/', (req, res) => {
  res.send('Список користувачів');
});

// router.post('/users', (req, res) => {
//   const { username, email } = req.body;
//   // Логіка обробки створення користувача
//   res.send('Користувач створений');
// });

router.post('/', async (req, res) => {
  console.log('REQ BODY', req.body);
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
