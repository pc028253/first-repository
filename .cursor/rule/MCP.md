# INSTRUCTIONS FOR MCP SERVESRS

## GITHUB
~/Documents/David Ondrej/video files/Cursor MCP/code/.cursor/rules/MCP.md

###
get_file_contents
create_or_update_file

## API

###

---

# MCP (Model-Controller-Presenter) 架構規範

## 目錄結構
```
src/
├── models/          # 數據模型層
├── controllers/     # 業務邏輯層
├── presenters/      # 展示層
├── utils/          # 工具函數
└── index.js        # 應用入口

tests/              # 測試文件
├── models/
├── controllers/
└── presenters/
```

## 各層職責

### 1. Model（模型層）
- 負責數據結構定義
- 處理數據驗證
- 實現數據庫操作
- 不包含業務邏輯

範例：
```javascript
class UserModel {
  constructor() {
    this.schema = {
      username: String,
      email: String,
      password: String
    };
  }

  validate() {
    // 數據驗證邏輯
  }
}
```

### 2. Controller（控制器層）
- 實現業務邏輯
- 協調 Model 和 Presenter
- 處理錯誤和異常
- 不直接處理 HTTP 請求/響應

範例：
```javascript
class UserController {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async createUser(userData) {
    // 業務邏輯處理
  }
}
```

### 3. Presenter（展示層）
- 處理 HTTP 請求/響應
- 數據格式轉換
- 路由管理
- 不包含業務邏輯

範例：
```javascript
class UserPresenter {
  constructor(userController) {
    this.userController = userController;
  }

  async handleCreateUser(req, res) {
    // HTTP 請求處理
  }
}
```

## 編碼規範

### 1. 命名規範
- 文件名：PascalCase
  - 模型：`UserModel.js`
  - 控制器：`UserController.js`
  - 展示層：`UserPresenter.js`
- 變量名：camelCase
- 常量：UPPER_SNAKE_CASE
- 類名：PascalCase

### 2. 文件結構
每個文件應包含：
- 文件頭部註釋
- 導入聲明
- 主要代碼
- 導出聲明

### 3. 異步處理
- 使用 async/await
- 統一的錯誤處理
- Promise 鏈式調用

### 4. 錯誤處理
```javascript
try {
  // 業務邏輯
} catch (error) {
  // 錯誤處理
  throw new CustomError(error.message);
}
```

## 測試規範

### 1. 單元測試
- 每個模塊都要有測試
- 測試文件命名：*.test.js
- 使用 Jest 測試框架

### 2. 測試覆蓋率要求
- 語句覆蓋率：>80%
- 分支覆蓋率：>70%
- 函數覆蓋率：>90%

## 文檔規範

### 1. 代碼註釋
- 使用 JSDoc 風格
- 必須註釋的內容：
  - 函數用途
  - 參數說明
  - 返回值說明
  - 異常說明

### 2. API 文檔
- 使用 Swagger/OpenAPI
- 包含：
  - 接口說明
  - 請求/響應示例
  - 錯誤碼說明

## 版本控制

### 1. Git 提交規範
```
<type>(<scope>): <subject>

<body>

<footer>
```

類型（type）：
- feat: 新功能
- fix: 錯誤修復
- docs: 文檔更新
- style: 代碼格式
- refactor: 重構
- test: 測試
- chore: 構建/工具

### 2. 分支管理
- main：主分支
- develop：開發分支
- feature/*：功能分支
- hotfix/*：緊急修復分支

## 性能規範

### 1. 代碼優化
- 避免重複計算
- 使用適當的緩存
- 異步操作並行處理

### 2. 數據庫優化
- 使用索引
- 控制查詢複雜度
- 實現數據分頁

## 安全規範

### 1. 輸入驗證
- 所有用戶輸入必須驗證
- 使用參數化查詢
- 實施 XSS 防護

### 2. 認證授權
- JWT 令牌驗證
- 角色權限控制
- 密碼加密存儲

## 持續整合/部署

### 1. CI/CD 流程
- 代碼提交
- 自動化測試
- 代碼審查
- 自動部署

### 2. 監控告警
- 性能監控
- 錯誤監控
- 日誌記錄

## 更新歷史

| 日期 | 版本 | 更新內容 |
|------|------|----------|
| 2024-03-15 | 1.0 | 初始版本 |
| 2024-03-15 | 1.1 | 添加 MCP SERVESRS 說明 |

## 維護者

- 技術負責人：[您的名字]
- 郵箱：[您的郵箱]

## 參考資料

1. Clean Architecture
2. SOLID 原則
3. RESTful API 設計指南

---
最後更新：2024-03-15