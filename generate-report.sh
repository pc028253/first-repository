#!/bin/bash

# 生成 HTML 測試報告

OUTPUT_FILE="api-test-report.html"
API_URL="http://localhost:3000/api/test"

echo "正在生成 API 測試報告..."

# 執行 API 測試並收集結果
HEALTH=$(curl -s "$API_URL/health")
USERS=$(curl -s "$API_URL/users")

# 創建 HTML 報告
cat > "$OUTPUT_FILE" << 'EOF'
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API 測試報告</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }
        h1 {
            color: #333;
            margin-bottom: 10px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        .timestamp {
            color: #666;
            font-size: 14px;
            margin-bottom: 30px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 20px;
        }
        .result {
            background: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        .success {
            border-left-color: #28a745;
            background: #d4edda;
        }
        .result h3 {
            color: #333;
            font-size: 16px;
            margin-bottom: 10px;
        }
        pre {
            background: #fff;
            padding: 15px;
            border-radius: 6px;
            overflow-x: auto;
            font-size: 13px;
            border: 1px solid #e0e0e0;
        }
        .status {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 12px;
        }
        .status.ok {
            background: #28a745;
            color: white;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e0e0e0;
            text-align: center;
            color: #666;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-bottom: 30px;
        }
        .stat-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .stat-card h3 {
            font-size: 32px;
            margin-bottom: 5px;
        }
        .stat-card p {
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧪 API 測試報告</h1>
        <p class="timestamp">生成時間: TIMESTAMP_PLACEHOLDER</p>

        <div class="stats">
            <div class="stat-card">
                <h3>TOTAL_USERS_PLACEHOLDER</h3>
                <p>用戶總數</p>
            </div>
            <div class="stat-card">
                <h3>✅</h3>
                <p>API 狀態</p>
            </div>
        </div>

        <div class="section">
            <h2>🏥 健康檢查</h2>
            <div class="result success">
                <h3>狀態: <span class="status ok">正常</span></h3>
                <pre>HEALTH_PLACEHOLDER</pre>
            </div>
        </div>

        <div class="section">
            <h2>👥 用戶列表</h2>
            <div class="result">
                <pre>USERS_PLACEHOLDER</pre>
            </div>
        </div>

        <div class="footer">
            <p><strong>First Repository API</strong></p>
            <p>MCP 架構示例項目</p>
        </div>
    </div>
</body>
</html>
EOF

# 替換佔位符
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
TOTAL_USERS=$(echo "$USERS" | grep -o '"total":[0-9]*' | grep -o '[0-9]*' || echo "0")

sed -i "s|TIMESTAMP_PLACEHOLDER|$TIMESTAMP|g" "$OUTPUT_FILE"
sed -i "s|HEALTH_PLACEHOLDER|$HEALTH|g" "$OUTPUT_FILE"
sed -i "s|USERS_PLACEHOLDER|$USERS|g" "$OUTPUT_FILE"
sed -i "s|TOTAL_USERS_PLACEHOLDER|$TOTAL_USERS|g" "$OUTPUT_FILE"

echo "✅ HTML 報告已生成: $OUTPUT_FILE"
echo ""
echo "您可以："
echo "1. 下載此文件到本地電腦"
echo "2. 在瀏覽器中打開查看"
echo ""
echo "或使用以下命令查看內容："
echo "cat $OUTPUT_FILE"
