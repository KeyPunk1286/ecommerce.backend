const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: ["*"],
    credentials: true,
  })
);

require("dotenv").config();

const sequelize = require("./config/database");

const PORT = process.env.APP_PORT || 7777;

const authModule = require("./modules/auth.module");
const usersModule = require("./modules/user.module");
const customersModule = require("./modules/customer.module");
const shopModule = require("./modules/shop.module");
const productModule = require("./modules/product.module");
const tables = require("./config/tables.js");

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.use(express.json());

    //==== auth
    app.use("/auth", authModule);

    //==== user
    app.use("/users", usersModule);

    //==== customer
    app.use("/customers", customersModule);

    //==== shop
    app.use("/shop", shopModule);

    //==== product
    app.use("/product", productModule);

    //==== tables
    app.use("/tables", (req, res) => {
      res.json(tables);
    });

    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (error) {
    console.log({ error: error.message });
  }
};

start();
