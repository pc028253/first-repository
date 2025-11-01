const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

class UserPresenter {
  constructor() {
    this.router = router;
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @swagger
     * /api/users:
     *   post:
     *     summary: 創建新用戶
     *     tags: [Users]
     *     description: 註冊一個新的用戶帳號
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - email
     *               - password
     *             properties:
     *               username:
     *                 type: string
     *                 example: john_doe
     *               email:
     *                 type: string
     *                 format: email
     *                 example: john@example.com
     *               password:
     *                 type: string
     *                 example: securePassword123
     *     responses:
     *       201:
     *         description: 用戶創建成功
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponse'
     *       400:
     *         description: 請求錯誤（例如：用戶名或郵箱已存在）
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    // 創建用戶
    this.router.post('/users', async (req, res) => {
      try {
        const user = await UserController.createUser(req.body);
        res.status(201).json(this.formatUserResponse(user));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    /**
     * @swagger
     * /api/users/{id}:
     *   get:
     *     summary: 獲取用戶資料
     *     tags: [Users]
     *     description: 根據用戶 ID 獲取用戶詳細資料
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: 用戶的唯一識別碼
     *         example: 507f1f77bcf86cd799439011
     *     responses:
     *       200:
     *         description: 成功獲取用戶資料
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponse'
     *       404:
     *         description: 用戶不存在
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    // 獲取用戶
    this.router.get('/users/:id', async (req, res) => {
      try {
        const user = await UserController.getUser(req.params.id);
        res.json(this.formatUserResponse(user));
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    });

    /**
     * @swagger
     * /api/users/{id}:
     *   put:
     *     summary: 更新用戶資料
     *     tags: [Users]
     *     description: 更新指定用戶的資料
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: 用戶的唯一識別碼
     *         example: 507f1f77bcf86cd799439011
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               username:
     *                 type: string
     *                 example: john_updated
     *               email:
     *                 type: string
     *                 format: email
     *                 example: john.updated@example.com
     *               password:
     *                 type: string
     *                 example: newPassword123
     *     responses:
     *       200:
     *         description: 用戶資料更新成功
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserResponse'
     *       400:
     *         description: 請求錯誤
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: 用戶不存在
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
    // 更新用戶
    this.router.put('/users/:id', async (req, res) => {
      try {
        const user = await UserController.updateUser(req.params.id, req.body);
        res.json(this.formatUserResponse(user));
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });

    /**
     * @swagger
     * /api/users/{id}:
     *   delete:
     *     summary: 刪除用戶
     *     tags: [Users]
     *     description: 刪除指定的用戶帳號
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: 用戶的唯一識別碼
     *         example: 507f1f77bcf86cd799439011
     *     responses:
     *       200:
     *         description: 用戶刪除成功
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: 用戶已成功刪除
     *       400:
     *         description: 請求錯誤
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       404:
     *         description: 用戶不存在
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     */
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