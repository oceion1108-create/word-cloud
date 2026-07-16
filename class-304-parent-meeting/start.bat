@echo off
cd /d "%~dp0"
echo 啟動班親會簡報伺服器...
start http://localhost:3000
node server.js
pause
