const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const UserPresenter = require('./presenters/UserPresenter');

const app = express();
const PORT = process.env.PORT || 3000;

// 中間件
app.use(express.json());

// 連接數據庫
mongoose.connect('mongodb://localhost:27017/first-repository', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('成功連接到 MongoDB');
}).catch((error) => {
  console.error('MongoDB 連接失敗:', error);
});

// Swagger API 文檔
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'First Repository API 文檔'
}));

// 路由
app.use('/api', UserPresenter.getRouter());

// 錯誤處理中間件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服務器內部錯誤' });
});

// 啟動服務器
app.listen(PORT, () => {
  console.log(`服務器運行在 http://localhost:${PORT}`);
  console.log(`API 文檔可在此查看: http://localhost:${PORT}/api-docs`);
});