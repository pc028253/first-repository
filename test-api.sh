#!/bin/bash

# API 測試腳本
# 用於測試 First Repository API 的所有功能

BASE_URL="http://localhost:3000"
API_URL="$BASE_URL/api/test"

echo "======================================"
echo "First Repository API 測試腳本"
echo "======================================"
echo ""

# 1. 健康檢查
echo "🏥 [1/6] 健康檢查..."
curl -s "$API_URL/health" | json_pp 2>/dev/null || curl -s "$API_URL/health"
echo -e "\n"

# 2. 創建用戶 1
echo "👤 [2/6] 創建用戶: 張三..."
USER1=$(curl -s -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"張三","email":"zhangsan@example.com"}')
echo "$USER1" | json_pp 2>/dev/null || echo "$USER1"
echo -e "\n"

# 3. 創建用戶 2
echo "👤 [3/6] 創建用戶: 李四..."
USER2=$(curl -s -X POST "$API_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"username":"李四","email":"lisi@example.com"}')
echo "$USER2" | json_pp 2>/dev/null || echo "$USER2"
echo -e "\n"

# 4. 獲取所有用戶
echo "📋 [4/6] 獲取所有用戶..."
curl -s "$API_URL/users" | json_pp 2>/dev/null || curl -s "$API_URL/users"
echo -e "\n"

# 5. 獲取單個用戶
echo "🔍 [5/6] 獲取用戶 ID=1..."
curl -s "$API_URL/users/1" | json_pp 2>/dev/null || curl -s "$API_URL/users/1"
echo -e "\n"

# 6. 刪除用戶
echo "🗑️  [6/6] 刪除用戶 ID=1..."
curl -s -X DELETE "$API_URL/users/1" | json_pp 2>/dev/null || curl -s -X DELETE "$API_URL/users/1"
echo -e "\n"

# 驗證刪除
echo "✅ 驗證刪除後的用戶列表..."
curl -s "$API_URL/users" | json_pp 2>/dev/null || curl -s "$API_URL/users"
echo -e "\n"

echo "======================================"
echo "✅ 測試完成！"
echo "======================================"
echo ""
echo "📚 查看 Swagger API 文檔："
echo "   $BASE_URL/api-docs"
echo ""
echo "🔧 手動測試端點："
echo "   健康檢查: curl $API_URL/health"
echo "   創建用戶: curl -X POST $API_URL/users -H 'Content-Type: application/json' -d '{\"username\":\"test\",\"email\":\"test@example.com\"}'"
echo "   獲取用戶: curl $API_URL/users"
echo ""
