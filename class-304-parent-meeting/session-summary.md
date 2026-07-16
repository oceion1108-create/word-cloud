# 工作階段摘要 — 三年四班 班親會簡報

## 完成項目

- [x] 安裝 `html-slide-builder` Skill 至 `~/.claude/skills/`
- [x] 使用 Skill 重建 Reveal.js 互動簡報（15 頁）
- [x] 加入 QR Code（qrcodejs）連結至手機提交頁
- [x] 建立 `submit.html` 手機專用提交頁
- [x] 部署 GitHub Pages
- [x] 文字雲後端歷經三次迭代：
  - v1: Firebase SDK（CORS/權限問題）
  - v2: Firestore REST API（403 權限不足）
  - v3: **jsonblob.com**（免註冊、免金鑰、跨裝置即時同步 ✅）

## 使用技術

| 元件 | 技術 |
|------|------|
| 簡報引擎 | Reveal.js 5.1.0 (night theme) |
| 文字雲 | wordcloud2.js + jsonblob.com REST API |
| QR Code | qrcodejs (動態生成) |
| 部署 | GitHub Pages (oceion1108-create) |
| 背景 | CSS 漸層 (無 AI 底圖) |

## 專案位置

`C:\opencode\互動式簡報\class-304-parent-meeting\`

## 檔案結構

```
class-304-parent-meeting/
├── index.html       # Reveal.js 主簡報（15 頁）
├── submit.html      # 手機 QR 掃碼提交頁
├── session-summary.md
└── images/          # (預留)
```

## 部署

- 🔗 GitHub Pages: https://oceion1108-create.github.io/class-304-parent-meeting/
- 📦 原始碼: https://github.com/oceion1108-create/class-304-parent-meeting
- 🗜️ 壓縮檔: `C:\opencode\互動式簡報\class-304-parent-meeting.zip`

## 缺漏項目

- Draw Skill + OPENAI_API_KEY — 未設定，無法使用 AI 底圖/圖標
