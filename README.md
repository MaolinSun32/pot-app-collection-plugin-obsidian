# Pot2Obsidian

Pot-App 生词本插件，将翻译结果以 Flashcard 格式追加到 Obsidian 的 Markdown 文件中，兼容 [Obsidian Spaced Repetition](https://github.com/st3v3nmw/obsidian-spaced-repetition) 插件。

## 功能

- 自动从 Obsidian 插件读取生词本路径，无需手动配置
- 翻译结果以 Flashcard 格式保存
- 支持 Windows / macOS / Linux

## 输出格式

```markdown
apple
?
n. 苹果

```

每条记录之间空两行。

## 安装

### 从 Pot-App 插件市场安装（推荐）

1. 打开 Pot-App 设置 → 服务设置 → 生词本
2. 在插件列表中找到 **Pot2Obsidian**，点击安装

### 手动安装

1. 下载 [Release](https://github.com/MaolinSun32/pot-app-collection-plugin-obsidian/releases) 中的 `.potext` 文件
2. 在 Pot-App 设置 → 服务设置 → 生词本 → 添加外部插件
3. 导入下载的 `.potext` 文件

## 配置

**无需在 Pot-App 中配置路径。**

本插件自动读取 `~/.pot2obsidian/config.json`，该文件由 Obsidian 端的 [Pot2Obsidian 插件](https://github.com/MaolinSun32/obsidian-pot2obsidian-plugin) 写入。

**使用前请先完成 Obsidian 端配置：**

1. 在 Obsidian 中安装 [Pot2Obsidian 插件](https://github.com/MaolinSun32/obsidian-pot2obsidian-plugin)
2. 在插件设置中配置生词本文件名和路径
3. 插件会自动将配置写入 `~/.pot2obsidian/config.json`

## 使用

1. 完成上述 Obsidian 端配置
2. 在 Pot-App 中安装本插件并设为默认生词本
3. 翻译单词后点击收藏按钮
4. 单词和翻译自动追加到 Obsidian 生词本文件

## 工作原理

```
Pot-App 收藏 → 读取 ~/.pot2obsidian/config.json → 追加到 Obsidian 文件
```

配置文件由 Obsidian 插件写入，格式如下：

```json
{
  "file_path": "C:\\Users\\xxx\\MyVault\\flashcards.md",
  "vault_path": "C:\\Users\\xxx\\MyVault",
  "file_name": "flashcards.md",
  "relative_path": ""
}
```

## 相关项目

- [Obsidian Pot2Obsidian 插件](https://github.com/MaolinSun32/obsidian-pot2obsidian-plugin) — Obsidian 端配置插件

## 许可证

GPL-3.0
