const User = require('./user.model');
const Product = require('./product.model');

User.hasMany(Product, {
    foreignKey: 'user_id',
    as: 'products'
});

Product.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});
