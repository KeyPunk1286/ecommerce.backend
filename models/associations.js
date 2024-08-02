const Customer = require("./customer.model");
const User = require("./user.model");
const Product = require("./product.model");
const Shop = require("./shop.model");

Customer.hasMany(Shop, {
  foreignKey: "customer_id",
  as: "shops",
});

// Customer.hasMany(Shop, {
//     foreignKey: 'customer_id',
//     as: 'shops'
// });

Customer.hasOne(User, {
  sourceKey: "user_id",
  as: "user",
});

Shop.hasMany(Product, {
  foreignKey: "shop_id",
  as: "products",
});

// User.hasMany(Product, {
//     foreignKey: 'user_id',
//     as: 'products'
// });
//
// Product.belongsTo(User, {
//     foreignKey: 'user_id',
//     as: 'user'
// });

// тестовий коментар
