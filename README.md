# HTML Studio

**Read, view and visually edit HTML files right inside Obsidian.**

HTML Studio is an Obsidian plugin that turns your vault into a workspace for HTML files — from slide decks to long-form reports. Open any `.html` / `.htm` file, browse it in a sandboxed viewer, **click-to-edit its content**, and save changes back — no external editor needed.

> Based on [obsidian-html-plugin](https://github.com/nuthrash/obsidian-html-plugin) by **Nuthrash**, with major additions. Full credits below. 🙏

---

## Why HTML Studio?

Obsidian users keep lots of HTML artifacts: presentation decks, project briefs, exported reports, dashboards. Until now you could only *view* them — any edit meant switching to an external editor and losing your vault context. HTML Studio adds a **visual editing layer** on top of a hardened viewer, so quick fixes ("change the date", "swap a name", "replace an image") happen where the file lives.

## Features

### ✨ Visual Editing (new in this fork)

- **Click-to-edit text** — every text block in the file is editable in place: headings, paragraphs, list items, table cells, and text inside `div`/`span` elements. A text-node walker marks all editable regions automatically, regardless of the page's tag conventions.
- **Replace images** — click any image and pick a local file; it is embedded as a Data URL, so the saved file stays fully self-contained and works offline.
- **Smart slide detection** — the plugin recognizes paged documents (`.deck .slide`, reveal.js, `section.slide`, etc. via 7 selector strategies) *and* distinguishes them from vertically scrolling long pages using a real-pagination heuristic (`display:none` toggling or absolute stacking ⇒ paged; normal document flow ⇒ scrollable). Decks get a floating page bar + `← →` keyboard navigation; long pages keep their native scroll.
- **Safe save (master-merge)** — on save, the file is re-read from disk as a master copy and only the edited sections are replaced back. Scripts, styles and everything untouched by the edit survive exactly as they were — even if the preview mode had stripped them.
- **Per-page link interception** — external links don't navigate on a plain click (which also prevents accidental tracking/analytics triggers). Use `⌘/Ctrl + click` to open deliberately, or toggle interception off in the page menu.
- **Open in default browser** — one menu action to hand the file over to your system browser for a full-fidelity look.

### 🛡 Robust viewing (inherited & fixed from upstream)

- Multiple rendering modes with different security levels (Balance / Low Restricted / Unrestricted / High Restricted / Text-only).
- Zoom in/out/reset, background color, in-page search.
- MHTML (`.mht` / `.mhtml`) support.
- Anchors, `target=_blank` and link handling tuned for Obsidian.
- **Bug fix:** `position: fixed` elements no longer break (upstream applied `transform: scale(1)` even at 100% zoom, which created a containing block and broke fixed positioning).

## Usage

1. Open any `.html` / `.htm` file in your vault — it opens in the HTML Studio view instead of raw text.
2. **Edit**: open the `⋮` menu (top-right) → **Edit this page**. Text becomes editable (blue focus ring); click images to replace them. For decks, page through with `← →` or the floating bar.
3. **Save**: `⋮` menu → **Save changes**. The original file is rewritten with a master-merge, so runtime scripts stay intact.
4. **Links**: intercepted by default; `⌘/Ctrl + click` to open manually, or toggle in the `⋮` menu.
5. **Browser**: `⋮` menu → **Open in default browser**.

> Tip: for pages with rich interactivity (scripts you care about), use the *Unrestricted* mode before editing & saving.

## Install

### From GitHub (manual)

1. Download `main.js`, `manifest.json` from the [latest release](../../releases).
2. Copy them into `<your-vault>/.obsidian/plugins/html-studio/`.
3. Enable **HTML Studio** in Settings → Community plugins.

### BRAT (recommended for updates)

Add this repo to [BRAT](https://github.com/TfTHacker/obsidian42-brat) and it will track releases for you.

## Compatibility notes

- Editing & saving is desktop-only (uses Electron APIs for native dialogs).
- Files are never modified until you explicitly save. The viewer itself is read-only.

## Credits & License

- **This project** is developed and maintained by [pherehouse](https://github.com/pherehouse).
- **Forked from** [obsidian-html-plugin](https://github.com/nuthrash/obsidian-html-plugin) by **Nuthrash** — thank you for the solid viewer foundation, the multi-mode rendering pipeline and MHTML support. This fork's additions: visual editing, smart slide detection, master-merge saving, link interception, default-browser handoff, and the `position:fixed` fix.
- Thanks to the Obsidian community for feedback and ideas.

Licensed under the [MIT License](LICENSE), honoring the upstream license.
