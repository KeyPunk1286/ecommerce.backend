const User = require("./user.model");
const Customer = require("./customer.model");
const Shop = require("./shop.model");
const Product = require("./product.model");

//=== user --> customer
User.hasMany(Customer, { foreignKey: "user_id", as: "customers" });
Customer.belongsTo(User, { foreignKey: "user_id", as: "users" });

//=== customer --> shop
Customer.hasMany(Shop, { foreignKey: "customer_id", as: "shops" });
Shop.belongsTo(Customer, { foreignKey: "customer_id", as: "customers" });

//=== shop --> product
Shop.hasMany(Product, { foreignKey: "shop_id", as: "products" });
Product.belongsTo(Shop, { foreignKey: "shop_id", as: "shops" });

//=====================================//
// Customer.hasMany(Shop, {
//   foreignKey: "customer_id",
//   as: "shops",
// });

// Customer.hasMany(Shop, {
//     foreignKey: 'customer_id',
//     as: 'shops'
// });

// Customer.hasOne(User, {
//   sourceKey: "user_id",
//   as: "user",
// });

// Shop.hasMany(Product, {
//   foreignKey: "shop_id",
//   as: "products",
// });

// User.hasMany(Product, {
//     foreignKey: 'user_id',
//     as: 'products'
// });
//
// Product.belongsTo(User, {
//     foreignKey: 'user_id',
//     as: 'user'
// });
