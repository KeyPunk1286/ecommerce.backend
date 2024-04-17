const express = require('express')
const bodyParser = require('body-parser');

const userModule = require('./modules/user.module');
const productModule = require('./modules/product.module');


const PORT = 8888

const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userModule)
app.use('/products', productModule)

// Роут для головної сторінки
app.get('/', (req, res) => {
   res.send('Привіт, світ!');
});

 // Слухаємо порт
app.listen(PORT, () => {
   console.log(`Сервер запущено на http://localhost:${PORT}`);
});