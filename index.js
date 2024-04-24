const express = require('express')
const bodyParser = require('body-parser');

const customerModule = require('./modules/customer.module')
const userModule = require('./modules/user.module')
const productModule = require('./modules/product.module')

const User = require('./models/user.model');
const Product = require('./models/product.model');

require('dotenv').config()
require('./models/associations');

const APP_PORT = process.env.APP_PORT || 8888

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/customers', customerModule)
app.use('/users', userModule)
app.use('/products', productModule)

// Роут для головної сторінки
app.get('/', (req, res) => {
   User.findByPk(1, {
      include: [{
         model: Product,
         as: 'products'  // Використання аліасу, визначеного в hasMany
      }]
   }).then(user => {
      if (user) {
         console.log('SIUIQWUDNIWUDNIU#WDIUDIAWUNDIWAUND');
         console.log('SIUIQWUDNIWUDNIU#WDIUDIAWUNDIWAUND');
         console.log('SIUIQWUDNIWUDNIU#WDIUDIAWUNDIWAUND');
         console.log('SIUIQWUDNIWUDNIU#WDIUDIAWUNDIWAUND');
         console.log('SIUIQWUDNIWUDNIU#WDIUDIAWUNDIWAUND');
         console.log('SIUIQWUDNIWUDNIU#WDIUDIAWUNDIWAUND');
         console.log(user);
         console.log(user.products);
      } else {
         console.log('Користувач не знайдений');
      }
   }).catch(error => {
      console.error('Помилка при запиті:', error);
   });

   res.send('Привіт, світ!')
});

 // Слухаємо порт
app.listen(APP_PORT, () => {
   console.log(`Сервер запущено на http://localhost:${APP_PORT}`)
});