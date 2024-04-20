const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const Product = require('../models/product.model');

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{
        model: Product,
        as: 'products'
      }]
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Користувач не знайдений');
    }
  } catch (error) {
    console.error('Помилка при запиті:', error);
    res.status(500).send('Внутрішня помилка сервера');
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
