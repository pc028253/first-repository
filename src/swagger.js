const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'First Repository API',
      version: '1.0.0',
      description: 'MCP 架構示例項目 - 用戶管理 API',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
      contact: {
        name: 'API Support',
        url: 'https://github.com/pc028253/first-repository',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: '本地開發伺服器',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          required: ['username', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: '用戶唯一識別碼',
              example: '507f1f77bcf86cd799439011',
            },
            username: {
              type: 'string',
              description: '用戶名稱',
              example: 'john_doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: '電子郵件地址',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              description: '用戶密碼（創建/更新時使用）',
              example: 'securePassword123',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '創建時間',
              example: '2024-03-15T10:30:00.000Z',
            },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: '用戶唯一識別碼',
            },
            username: {
              type: 'string',
              description: '用戶名稱',
            },
            email: {
              type: 'string',
              description: '電子郵件地址',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: '創建時間',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: '錯誤訊息',
            },
          },
        },
      },
    },
  },
  apis: ['./src/presenters/*.js'], // 指定 API 文檔註釋的位置
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
