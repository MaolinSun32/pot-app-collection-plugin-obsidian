# Pot2Obsidian

Pot-App 生词本插件，将翻译结果以 flashcard 格式追加到 Obsidian 的 Markdown 文件中。

## 功能

- 自动从 Obsidian 插件读取配置的生词本路径
- 翻译结果以 flashcard 格式保存，兼容 Obsidian Spaced Repetition 插件
- 支持 Windows / macOS / Linux

## 输出格式

```markdown
单词
?
翻译释义
```

每条记录之间空两行。

## 安装

1. 下载 [Release](https://github.com/MaolinSun32/pot-app-collection-plugin-obsidian/releases) 中的 `.potext` 文件
2. 在 Pot-App 设置 → 服务设置 → 生词本 → 添加外部插件
3. 导入下载的 `.potext` 文件

## 配置

**无需在 Pot-App 中配置路径！**

本插件会自动从 Obsidian 的 Pot2Obsidian 插件读取配置文件 (`~/.pot2obsidian/config.json`)。

请先安装并配置 [Obsidian Pot2Obsidian 插件](https://github.com/MaolinSun32/obsidian-pot2obsidian-plugin)。

## 使用

1. 在 Obsidian 中安装 Pot2Obsidian 插件，配置生词本路径
2. 在 Pot-App 中安装本插件
3. 翻译单词后点击收藏按钮
4. 单词和翻译将自动追加到 Obsidian 的生词本文件

## 相关项目

- [Obsidian Pot2Obsidian 插件](https://github.com/MaolinSun32/obsidian-pot2obsidian-plugin) - Obsidian 端配置插件

## 许可证

GPL-3.0
