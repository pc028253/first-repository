# MCP (Model-Controller-Presenter) 規範文件

## 目錄結構
```
.cursor/
  └── rule/
      └── MCP.md
```

## 專案規範

### 1. 命名規範
- 檔案命名：使用 PascalCase
- 變數命名：使用 camelCase
- 常量命名：使用 UPPER_SNAKE_CASE
- 類別命名：使用 PascalCase

### 2. 文件結構
- 每個功能模組應包含：
  - Model：數據處理層
  - Controller：業務邏輯層
  - Presenter：展示層

### 3. 代碼風格
- 使用 2 空格縮排
- 行尾不留空格
- 檔案結尾需有一個空行
- 使用單引號作為字串定界符

### 4. 註釋規範
- 使用 JSDoc 風格的註釋
- 每個函數都應該有註釋說明
- 複雜的邏輯需要添加行內註釋

### 5. Git 提交規範
提交信息格式：
```
<type>(<scope>): <subject>

<body>

<footer>
```

類型（type）：
- feat: 新功能
- fix: 修復
- docs: 文檔
- style: 格式
- refactor: 重構
- test: 測試
- chore: 建構過程或輔助工具的變動

### 6. 測試規範
- 單元測試覆蓋率要求：>80%
- 每個功能模組都需要測試用例
- 測試文件命名：*.test.ts 或 *.spec.ts

### 7. 錯誤處理
- 使用 try-catch 進行錯誤捕獲
- 統一錯誤處理機制
- 錯誤日誌記錄

### 8. 性能優化
- 避免重複渲染
- 及時清理資源
- 使用適當的緩存策略

### 9. 安全規範
- 輸入驗證
- XSS 防護
- CSRF 防護
- SQL 注入防護

### 10. 文檔要求
- API 文檔
- 架構文檔
- 部署文檔
- 使用手冊

## 版本控制
- 版本號格式：major.minor.patch
- 遵循語義化版本規範（Semantic Versioning）

## 持續更新
本文檔將根據項目發展持續更新和完善。

最後更新時間：2024-03-15