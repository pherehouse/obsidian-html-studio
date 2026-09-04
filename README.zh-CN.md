<div align="center">

**简体中文** | [English](./README.md)

</div>

# HTML Studio

**在 Obsidian 中直接阅读、查看和可视化编辑 HTML 文件。**

HTML Studio 是一个 Obsidian 插件，把你的仓库变成 HTML 文件的工作台——从幻灯片到长篇报告。打开任意 `.html` / `.htm` 文件，在沙箱查看器中浏览，**点击即可编辑内容**，然后保存回去——无需外部编辑器。

> 基于 **Nuthrash** 的 [obsidian-html-plugin](https://github.com/nuthrash/obsidian-html-plugin) 修改扩展而来，完整致谢见文末。🙏

---

## 为什么需要 HTML Studio？

Obsidian 用户往往保存了大量 HTML 产物：演示文稿、项目简报、导出的报告、仪表盘。此前只能*查看*——任何修改都意味着切换到外部编辑器、丢失仓库上下文。HTML Studio 在一个健壮的查看器之上叠加了**可视化编辑层**，让小改动（"改个日期"、"换个名字"、"替换一张图"）直接在文件所在之处完成。

## 功能特性

### ✨ 可视化编辑（本 Fork 新增）

- **点击编辑文字** —— 文件中的所有文本块均可就地编辑：标题、段落、列表项、表格单元格，以及 `div` / `span` 内的文字。通过文本节点遍历器自动标记所有可编辑区域，不受页面标签习惯限制。
- **替换图片** —— 点击任意图片并选择本地文件；图片以 Data URL 内嵌，保存后的文件完全自包含、离线可用。
- **智能幻灯片识别** —— 自动识别分页文档（`.deck .slide`、reveal.js、`section.slide` 等，共 7 种选择器策略），并通过真分页启发式判定与纵向滚动长页区分（靠 `display:none` 切换或绝对定位层叠 ⇒ 分页；普通文档流 ⇒ 滚动）。幻灯片配备悬浮页码条 + `← →` 键盘翻页；长页保持原生滚动。
- **安全保存（母版合并）** —— 保存时重新从磁盘读取原文件作为母版，仅替换编辑过的部分。脚本、样式及其他未编辑内容原样保留——即使预览模式曾剥离它们。
- **页内链接拦截** —— 普通点击外部链接不会跳转（同时防止误触跟踪/埋点上报）。使用 `⌘/Ctrl + 点击` 刻意打开，或在页面菜单中关闭拦截。
- **在默认浏览器中打开** —— 一个菜单动作，把文件交给系统浏览器做全保真预览。

### 🛡 健壮的查看能力（继承自上游并修复）

- 多种安全级别的渲染模式（Balance / Low Restricted / Unrestricted / High Restricted / Text-only）。
- 缩放（放大/缩小/重置）、背景色、页内搜索。
- 支持 MHTML（`.mht` / `.mhtml`）。
- 针对Obsidian 调优的锚点、`target=_blank` 与链接处理。
- **Bug 修复：** `position: fixed` 元素不再失效（上游即使在 100% 缩放时也会写入 `transform: scale(1)`，产生新的包含块从而破坏 fixed 定位）。

## 使用方法

1. 在仓库中打开任意 `.html` / `.htm` 文件 —— 将以 HTML Studio 视图打开，而非原始文本。
2. **编辑**：打开右上角 `⋮` 菜单 → **编辑此页面**。文字变为可编辑（蓝色聚焦框）；点击图片可替换。幻灯片用 `← →` 或悬浮页码条翻页。
3. **保存**：`⋮` 菜单 → **保存修改**。原文件以母版合并方式重写，运行时脚本保持原样。
4. **链接**：默认拦截；`⌘/Ctrl + 点击` 手动打开，或在 `⋮` 菜单中切换。
5. **浏览器**：`⋮` 菜单 → **在默认浏览器中打开**。

> 提示：对于含丰富交互（你关心的脚本）的页面，编辑和保存前请切换到 *Unrestricted* 模式。

## 安装

### 从 GitHub 手动安装

1. 从 [最新 release](../../releases) 下载 `main.js`、`manifest.json`。
2. 复制到 `<你的仓库>/.obsidian/plugins/html-studio/`。
3. 在 设置 → 第三方插件 中启用 **HTML Studio**。

### BRAT（推荐用于跟踪更新）

将本仓库添加到 [BRAT](https://github.com/TfTHacker/obsidian42-brat)，它会自动跟踪 release 更新。

## 兼容性说明

- 编辑与保存仅限桌面端（使用 Electron 原生对话框 API）。
- 在你显式保存之前，文件绝不会被修改。查看器本身是只读的。

## 致谢与许可

- **本项目**由 [pherehouse](https://github.com/pherehouse) 开发维护。
- **Fork 自** **Nuthrash** 的 [obsidian-html-plugin](https://github.com/nuthrash/obsidian-html-plugin) —— 感谢其扎实的查看器基础、多模式渲染管线和 MHTML 支持。本 Fork 的新增内容：可视化编辑、智能幻灯片识别、母版合并保存、链接拦截、默认浏览器移交，以及 `position:fixed` 修复。
- 感谢 Obsidian 社区的反馈与灵感。

以 [MIT License](LICENSE) 开源，并遵循上游许可协议。
