const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.model');
const Shop = require('../models/shop.model');

router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);

    // TODO :: This code just for test and as example - need drop later
    const shops = await customer.getShops();

    if (customer) {
      // TODO :: After drop the code above - need change "shops" to "customer"
      res.json(shops);
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
    const newUser = await Customer.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
