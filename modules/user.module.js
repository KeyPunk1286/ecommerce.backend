const express = require('express');
const router = express.Router();

// Маршрути для користувачів
router.get('/users', (req, res) => {
  res.send('Список користувачів');
});

router.post('/users', (req, res) => {
  const { username, email } = req.body;
  // Логіка обробки створення користувача
  res.send('Користувач створений');
});

module.exports = router;
