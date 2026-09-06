<div align="center">

# HTML Studio

**Read, view and visually edit HTML files right inside Obsidian.**

[![License: MIT](https://img.shields.io/badge/License-MIT-4C1.svg)](./LICENSE)
[![Made for Obsidian](https://img.shields.io/badge/Made%20for-Obsidian-7C3AED.svg)](https://obsidian.md)
[![GitHub release](https://img.shields.io/github/v/release/pherehouse/obsidian-html-studio?color=blue)](../../releases)

[![English](https://img.shields.io/badge/README-English-2b5797?style=flat-square)](./README.en.md)
[![简体中文](https://img.shields.io/badge/README-简体中文-c74634?style=flat-square)](./README.md)

</div>

AI writes great-looking HTML these days — decks, reports, dashboards. But fixing one title before a meeting still means digging through tags.

HTML Studio lets you just **click the text and retype it**. Save, and you're done. That's the whole idea.

<div align="center">

![HTML Studio demo — visual editing in Obsidian](./assets/demo.gif)

</div>

---

## What makes it different

- **Edit any HTML like a document** — click text to type, click an image to replace it. Works on decks *and* long pages, no matter how the file was written.
- **Saving never breaks your file** — only your edits are merged back; scripts and styles survive untouched.
- **Safe out of the box** — sandboxed rendering, and links won't jump (or ping trackers) unless you mean it (`⌘/Ctrl + click`).

## Features

### 📖 Read & Browse

Open `.html` / `.htm` / `.mhtml` files directly in Obsidian — rendered, not as raw source.

- **Sandboxed rendering** — files are displayed in a secure iframe, with 5 security levels to choose from (Balance / Low Restricted / Unrestricted / High Restricted / Text-only).
- **Works with any structure** — slide decks (reveal.js, JMC-style paged HTML…) and vertically scrolling long pages (reports, briefs, dashboards) are both detected and rendered appropriately.
- **Zoom in / out / reset**, custom background color, and **in-page search**.
- **MHTML support** — open `.mht` / `.mhtml` web archives saved from the browser.
- **Open in default browser** — one menu action to hand the file over to your system browser for a full-fidelity look.
- **Bug fix over upstream:** `position: fixed` elements stay pinned correctly (upstream broke them by always applying `transform: scale(1)`).

### ✏️ Visual Editing

- **Click-to-edit text** — every text block in the file is editable in place: headings, paragraphs, list items, table cells, and text inside `div`/`span` elements. A text-node walker marks all editable regions automatically, regardless of the page's tag conventions.
- **Replace images** — click any image and pick a local file; it is embedded as a Data URL, so the saved file stays fully self-contained and works offline.
- **Slide-aware page navigation while editing** — decks get a floating page bar + `← →` keyboard navigation (7 selector strategies for detection, plus a real-pagination heuristic so scrolling long pages are never mistaken for slides and keep their native scroll).
- **Edit dynamic TOC navigation** (v2.0.1) — JS-generated floating TOCs (built at runtime from each slide's `data-title`) are editable too: click the nav text, and on save it's written back to the corresponding slide. Runtime-generated UI is never written into your file.
- **Safe save (master-merge)** — on save, the file is re-read from disk as a master copy and only the edited sections are replaced back. Scripts, styles and everything untouched by the edit survive exactly as they were — even if the preview mode had stripped them.

### 🛡 Safe Link Handling

- External links don't navigate on a plain click — which also prevents accidental tracking/analytics triggers. Use `⌘/Ctrl + click` to open deliberately, or toggle interception on/off in the page menu.

## Usage

1. Open any `.html` / `.htm` file in your vault — it opens in the HTML Studio view instead of raw text.
2. **Edit**: open the `⋮` menu (top-right) → **Edit this page**. Text becomes editable (blue focus ring); click images to replace them. For decks, page through with `← →` or the floating bar.
3. **Save**: `⋮` menu → **Save changes**. The original file is rewritten with a master-merge, so runtime scripts stay intact.
4. **Links**: intercepted by default; `⌘/Ctrl + click` to open manually, or toggle in the `⋮` menu.
5. **Browser**: `⋮` menu → **Open in default browser**.

> Tip: for pages with rich interactivity (scripts you care about), use the *Unrestricted* mode before editing & saving.

## Install

### Community plugin store (easiest)

Settings → Community plugins → Browse, search **HTML Studio**, install and enable.

<div align="center">

![HTML Studio in the Obsidian community plugin store](./assets/community-plugin.png)

</div>

### Install with AI

Ask your AI assistant (Claude Code, Cursor, Copilot, Trae, etc.) to install it for you — just paste this:

```text
Install the Obsidian plugin "HTML Studio" for me:
1. Download the zip from https://github.com/pherehouse/obsidian-html-studio/releases/latest
2. Unzip it, put the html-studio folder into <my-vault>/.obsidian/plugins/
3. Tell me how to enable it in Obsidian settings.
```

Or with curl (AI-friendly, one file):

```bash
curl -fsSL https://github.com/pherehouse/obsidian-html-studio/releases/latest/download/html-studio.zip -o /tmp/html-studio.zip
unzip -o /tmp/html-studio.zip -d <my-vault>/.obsidian/plugins/
```

The AI downloads one zip, extracts it into the plugins folder — done in seconds, no manual download needed.

### From GitHub (manual)

1. Download `html-studio.zip` from the [latest release](../../releases).
2. Unzip it into `<your-vault>/.obsidian/plugins/` — it creates the `html-studio/` folder for you.
3. Enable **HTML Studio** in Settings → Community plugins.

### BRAT (recommended for updates)

Add this repo to [BRAT](https://github.com/TfTHacker/obsidian42-brat) and it will track releases for you.

## Compatibility notes

- Editing & saving is desktop-only (uses Electron APIs for native dialogs).
- Files are never modified until you explicitly save. The viewer itself is read-only.

## Credits & License

- **This project** is developed and maintained by [pherehouse](https://github.com/pherehouse).
- **Based on** [obsidian-html-plugin](https://github.com/nuthrash/obsidian-html-plugin) by **Nuthrash** — thank you for the solid viewer foundation, the multi-mode rendering pipeline and MHTML support. This fork's additions: visual editing, smart slide detection, master-merge saving, link interception, default-browser handoff, and the `position:fixed` fix.
- Thanks to the Obsidian community for feedback and ideas.

Licensed under the [MIT License](LICENSE), honoring the upstream license.
