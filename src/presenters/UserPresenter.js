const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

class UserPresenter {
  constructor() {
    this.router = router;
    this.initializeRoutes();
  }

  initializeRoutes() {
    // 創建用戶
    this.router.post('/users', async (req, res) => {
      try {
        const user = await UserController.createUser(req.body);
        res.status(201).json(this.formatUserResponse(user));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // 獲取用戶
    this.router.get('/users/:id', async (req, res) => {
      try {
        const user = await UserController.getUser(req.params.id);
        res.json(this.formatUserResponse(user));
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    });

    // 更新用戶
    this.router.put('/users/:id', async (req, res) => {
      try {
        const user = await UserController.updateUser(req.params.id, req.body);
        res.json(this.formatUserResponse(user));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    // 刪除用戶
    this.router.delete('/users/:id', async (req, res) => {
      try {
        const result = await UserController.deleteUser(req.params.id);
        res.json(result);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  }

  formatUserResponse(user) {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    };
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new UserPresenter();