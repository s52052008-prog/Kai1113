# 家有冠宏，宜樂無窮 — 原始檔備份
- `v3/`：遊戲原始碼（f*.js、build.py、build_pwa.py、pk 素材）
- 建置：放回 /home/claude/v3、/home/claude/h.py、/home/claude/backup-v9.html，執行 `PYTHONPATH=/home/claude python3 -c "import h;h.build()"` 產生 v3/out.html
- App 版：`python3 v3/build_pwa.py` 產生 /home/claude/pwa，推到 main 分支（GitHub Pages）
