const express = require('express');
const router = express.Router();

// Маршрути для продуктів
router.get('/products', (req, res) => {
  res.send('Список продуктів');
});

router.post('/products', (req, res) => {
  const { name, price } = req.body;
  // Логіка обробки створення продукту
  res.send('Продукт створений');
});

module.exports = router;
