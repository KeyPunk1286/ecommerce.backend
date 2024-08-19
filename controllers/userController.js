// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// exports.createUsers = async (req, res) => {
//   try {
//     const newUser = await User.create(req.body);
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsersPaginated = async (req, res) => {
  try {
    // Отримуємо параметри пагінації з запиту
    let { page = 1, limit = 10 } = req.query;
    // Перетворюємо значення на числа
    page = parseInt(page);
    limit = parseInt(limit);
    // Обчислюємо зміщення
    const offset = (page - 1) * limit;
    // Отримуємо загальну кількість продуктів
    const totalUsers = await User.count();
    // Отримуємо продукти з урахуванням пагінації
    const users = await User.findAll({
      limit: limit,
      offset: offset,
    });
    // Обчислюємо загальну кількість сторінок
    const totalPages = Math.ceil(totalUsers / limit);
    // Формуємо відповідь з продуктами та мета-даними пагінації
    res.status(200).json({
      data: users,
      meta: {
        totalItems: totalUsers,
        totalPages: totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userById = await User.findByPk(req.params.id);
    if (!userById) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(userById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userByid = await User.findByPk(req.params.id);
    if (!userByid) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await userByid.update(req.body);
    res.status(200).json(userByid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userDeleteById = await User.findByPk(req.params.id);
    if (!userDeleteById) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await userDeleteById.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
