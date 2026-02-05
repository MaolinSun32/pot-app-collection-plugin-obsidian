# Pot2Obsidian

Pot-App 生词本插件，将翻译结果以 flashcard 格式追加到 Obsidian 的 Markdown 文件中。

## 输出格式

```markdown
生词
?
翻译
```

每条记录之间空两行，兼容 Obsidian 的 Spaced Repetition 插件。

## 安装

1. 下载 Release 中的 `.potext` 文件
2. 在 Pot-App 设置中导入插件

或手动打包：
1. 将 `main.js`、`info.json`、`icon.svg` 打包为 zip
2. 重命名为 `plugin.com.pot-app.pot2obsidian.potext`
3. 在 Pot-App 中安装

## 配置

在 Pot-App 插件设置中配置：

- **Markdown 文件完整路径**: 目标文件的绝对路径
  - Windows 示例: `D:\Obsidian Vaults\MyVault\flashcards.md`
  - macOS 示例: `/Users/username/Obsidian/MyVault/flashcards.md`
  - Linux 示例: `/home/username/Obsidian/MyVault/flashcards.md`

## 使用

1. 在 Pot-App 中翻译单词
2. 点击收藏按钮
3. 单词和翻译将自动追加到配置的 Markdown 文件

## 许可证

GPL-3.0
