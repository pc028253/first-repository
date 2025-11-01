# API 測試指南

本文檔說明如何測試 First Repository API 的前後端功能。

## 📊 當前狀態

✅ **後端 API**: 運行中
✅ **Swagger UI**: 可用
⚠️ **MongoDB**: 未安裝（使用內存模式進行測試）
❌ **前端 UI**: 未實現（純後端 API）

---

## 🚀 快速開始

### 1. 啟動應用程式

```bash
npm start
```

應用程式將在 http://localhost:3000 啟動

### 2. 運行自動化測試腳本

```bash
./test-api.sh
```

這將執行完整的 API 測試流程。

---

## 📚 測試方法

### 方法 A: 使用 Swagger UI（推薦）

這是**最簡單**的方式，提供完整的圖形化界面！

1. 在瀏覽器中打開：
   ```
   http://localhost:3000/api-docs
   ```

2. 您會看到一個漂亮的 API 文檔界面，包含：
   - 📖 所有 API 端點的說明
   - 🧪 "Try it out" 按鈕可直接測試
   - 📝 請求/響應範例
   - ✅ 實時驗證

3. 測試步驟：
   - 點擊任意 API 端點（如 `POST /api/test/users`）
   - 點擊 "Try it out" 按鈕
   - 填寫請求參數
   - 點擊 "Execute" 執行
   - 查看響應結果

---

### 方法 B: 使用 curl 命令

#### 健康檢查

```bash
curl http://localhost:3000/api/test/health
```

**預期響應:**
```json
{
  "status": "ok",
  "message": "API 運行正常（測試模式 - 無需數據庫）",
  "timestamp": "2025-11-01T02:00:44.875Z",
  "usersInMemory": 0
}
```

#### 創建用戶

```bash
curl -X POST http://localhost:3000/api/test/users \
  -H "Content-Type: application/json" \
  -d '{"username":"張三","email":"zhangsan@example.com"}'
```

**預期響應:**
```json
{
  "id": 1,
  "username": "張三",
  "email": "zhangsan@example.com",
  "createdAt": "2025-11-01T02:00:45.573Z"
}
```

#### 獲取所有用戶

```bash
curl http://localhost:3000/api/test/users
```

**預期響應:**
```json
{
  "total": 1,
  "users": [
    {
      "id": 1,
      "username": "張三",
      "email": "zhangsan@example.com",
      "createdAt": "2025-11-01T02:00:45.573Z"
    }
  ]
}
```

#### 獲取單個用戶

```bash
curl http://localhost:3000/api/test/users/1
```

#### 刪除用戶

```bash
curl -X DELETE http://localhost:3000/api/test/users/1
```

**預期響應:**
```json
{
  "message": "用戶已成功刪除",
  "id": 1
}
```

---

### 方法 C: 使用 Postman

1. 下載並安裝 [Postman](https://www.postman.com/)
2. 創建新的 Request
3. 設置方法和 URL：
   - GET `http://localhost:3000/api/test/health`
   - POST `http://localhost:3000/api/test/users`
4. 對於 POST 請求，在 Body 標籤下選擇 "raw" 和 "JSON"，填寫：
   ```json
   {
     "username": "測試用戶",
     "email": "test@example.com"
   }
   ```
5. 點擊 "Send" 發送請求

---

### 方法 D: 使用 VS Code 擴展

安裝 **Thunder Client** 或 **REST Client** 擴展：

#### Thunder Client（推薦）

1. 在 VS Code 中安裝 Thunder Client 擴展
2. 點擊側邊欄的閃電圖標
3. 創建新的 Request
4. 輸入 URL 和方法
5. 點擊 Send

#### REST Client

1. 創建 `.http` 文件
2. 添加以下內容：

```http
### 健康檢查
GET http://localhost:3000/api/test/health

### 創建用戶
POST http://localhost:3000/api/test/users
Content-Type: application/json

{
  "username": "張三",
  "email": "zhangsan@example.com"
}

### 獲取所有用戶
GET http://localhost:3000/api/test/users

### 獲取單個用戶
GET http://localhost:3000/api/test/users/1

### 刪除用戶
DELETE http://localhost:3000/api/test/users/1
```

3. 點擊每個請求上方的 "Send Request" 連結

---

## 🎯 可用的 API 端點

### 測試端點（無需數據庫）

| 方法 | 端點 | 說明 |
|------|------|------|
| GET | `/api/test/health` | 健康檢查 |
| POST | `/api/test/users` | 創建用戶 |
| GET | `/api/test/users` | 獲取所有用戶 |
| GET | `/api/test/users/:id` | 獲取單個用戶 |
| DELETE | `/api/test/users/:id` | 刪除用戶 |

### 生產端點（需要 MongoDB）

| 方法 | 端點 | 說明 | 狀態 |
|------|------|------|------|
| POST | `/api/users` | 創建用戶 | ⚠️ 需要 MongoDB |
| GET | `/api/users/:id` | 獲取用戶 | ⚠️ 需要 MongoDB |
| PUT | `/api/users/:id` | 更新用戶 | ⚠️ 需要 MongoDB |
| DELETE | `/api/users/:id` | 刪除用戶 | ⚠️ 需要 MongoDB |

---

## 🧪 測試場景

### 場景 1: 基本 CRUD 操作

```bash
# 1. 創建用戶
curl -X POST http://localhost:3000/api/test/users \
  -H "Content-Type: application/json" \
  -d '{"username":"user1","email":"user1@example.com"}'

# 2. 獲取用戶
curl http://localhost:3000/api/test/users/1

# 3. 刪除用戶
curl -X DELETE http://localhost:3000/api/test/users/1

# 4. 驗證已刪除
curl http://localhost:3000/api/test/users/1
# 應返回 404 錯誤
```

### 場景 2: 錯誤處理

```bash
# 測試缺少必填欄位
curl -X POST http://localhost:3000/api/test/users \
  -H "Content-Type: application/json" \
  -d '{"username":"test"}'
# 應返回 400 錯誤

# 測試不存在的用戶
curl http://localhost:3000/api/test/users/999
# 應返回 404 錯誤
```

---

## 📊 前端測試（未實現）

目前此專案**沒有前端界面**。如果需要前端，有以下選項：

### 選項 1: 使用 Swagger UI（已實現）

Swagger UI 本身就是一個功能完整的前端測試界面！

### 選項 2: 創建簡單的 HTML 界面

我可以幫您創建一個簡單的 HTML 頁面來測試 API。

### 選項 3: 創建完整的前端應用

使用 React、Vue.js 或其他前端框架創建完整的 SPA 應用。

---

## 🔧 故障排除

### 問題 1: 應用程式無法啟動

**解決方法:**
```bash
# 確保依賴已安裝
npm install

# 重新啟動
npm start
```

### 問題 2: 端口 3000 被占用

**解決方法:**
```bash
# 設置不同端口
PORT=3001 npm start
```

### 問題 3: MongoDB 連接失敗

**解決方法:**
使用測試端點（`/api/test/*`），這些端點不需要 MongoDB。

---

## 📝 測試檢查清單

- [ ] 應用程式成功啟動
- [ ] Swagger UI 可以訪問
- [ ] 健康檢查端點返回成功
- [ ] 可以創建用戶
- [ ] 可以獲取用戶列表
- [ ] 可以獲取單個用戶
- [ ] 可以刪除用戶
- [ ] 錯誤處理正常工作

---

## 🎓 下一步

1. **添加更多功能**: 實現用戶更新、搜索、分頁等
2. **添加認證**: JWT、OAuth 等
3. **創建前端**: React、Vue.js 等
4. **部署到雲端**: Heroku、AWS、Vercel 等
5. **編寫單元測試**: Jest、Mocha 等

---

## 💡 提示

- 使用 Swagger UI 是最簡單的測試方式
- 測試端點（`/api/test/*`）存儲在內存中，重啟後數據會丟失
- 如果需要持久化存儲，請安裝並配置 MongoDB
- 可以同時打開多個瀏覽器標籤進行測試

---

**最後更新**: 2025-11-01
**作者**: Claude Code Assistant
