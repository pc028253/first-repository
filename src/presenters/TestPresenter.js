const express = require('express');
const router = express.Router();

// 模擬用戶數據存儲（內存中）
const mockUsers = new Map();
let userId = 1;

class TestPresenter {
  constructor() {
    this.router = router;
    this.initializeRoutes();
  }

  initializeRoutes() {
    /**
     * @swagger
     * /api/test/health:
     *   get:
     *     summary: 健康檢查
     *     tags: [Test]
     *     description: 檢查 API 是否正常運行
     *     responses:
     *       200:
     *         description: API 正常運行
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: ok
     *                 message:
     *                   type: string
     *                   example: API 運行正常
     *                 timestamp:
     *                   type: string
     *                   format: date-time
     */
    this.router.get('/health', (req, res) => {
      res.json({
        status: 'ok',
        message: 'API 運行正常（測試模式 - 無需數據庫）',
        timestamp: new Date().toISOString(),
        usersInMemory: mockUsers.size
      });
    });

    /**
     * @swagger
     * /api/test/users:
     *   post:
     *     summary: 創建測試用戶（內存模式）
     *     tags: [Test]
     *     description: 在內存中創建測試用戶，無需數據庫
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - username
     *               - email
     *             properties:
     *               username:
     *                 type: string
     *                 example: test_user
     *               email:
     *                 type: string
     *                 example: test@example.com
     *     responses:
     *       201:
     *         description: 用戶創建成功
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 id:
     *                   type: number
     *                 username:
     *                   type: string
     *                 email:
     *                   type: string
     *                 createdAt:
     *                   type: string
     */
    this.router.post('/users', (req, res) => {
      const { username, email } = req.body;

      if (!username || !email) {
        return res.status(400).json({ error: '用戶名和郵箱為必填項' });
      }

      const user = {
        id: userId++,
        username,
        email,
        createdAt: new Date().toISOString()
      };

      mockUsers.set(user.id, user);
      res.status(201).json(user);
    });

    /**
     * @swagger
     * /api/test/users:
     *   get:
     *     summary: 獲取所有測試用戶
     *     tags: [Test]
     *     description: 獲取內存中的所有用戶
     *     responses:
     *       200:
     *         description: 成功獲取用戶列表
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 total:
     *                   type: number
     *                 users:
     *                   type: array
     *                   items:
     *                     type: object
     */
    this.router.get('/users', (req, res) => {
      const users = Array.from(mockUsers.values());
      res.json({
        total: users.length,
        users: users
      });
    });

    /**
     * @swagger
     * /api/test/users/{id}:
     *   get:
     *     summary: 獲取指定測試用戶
     *     tags: [Test]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         example: 1
     *     responses:
     *       200:
     *         description: 成功獲取用戶
     *       404:
     *         description: 用戶不存在
     */
    this.router.get('/users/:id', (req, res) => {
      const user = mockUsers.get(parseInt(req.params.id));

      if (!user) {
        return res.status(404).json({ error: '用戶不存在' });
      }

      res.json(user);
    });

    /**
     * @swagger
     * /api/test/users/{id}:
     *   delete:
     *     summary: 刪除測試用戶
     *     tags: [Test]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: number
     *         example: 1
     *     responses:
     *       200:
     *         description: 刪除成功
     *       404:
     *         description: 用戶不存在
     */
    this.router.delete('/users/:id', (req, res) => {
      const id = parseInt(req.params.id);

      if (!mockUsers.has(id)) {
        return res.status(404).json({ error: '用戶不存在' });
      }

      mockUsers.delete(id);
      res.json({ message: '用戶已成功刪除', id });
    });
  }

  getRouter() {
    return this.router;
  }
}

module.exports = new TestPresenter();
