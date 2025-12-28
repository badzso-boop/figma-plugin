# Paste Data Plugin for Figma

**Version:** 2.0  
**Author:** [Your Name]  
**Figma Plugin ID:** 1463650553348200427  

---

## Overview

The Paste Data Plugin allows designers to quickly populate selected text layers in Figma with data copied from spreadsheets or other sources. The plugin supports advanced features like skipping headers, randomizing, looping, and counting data rows dynamically.

It is especially useful for:

- Populating tables or UI mockups
- Filling lists or repetitive text elements
- Working with dynamic example data in designs

---

## Features

- **Paste Data from Clipboard** – Paste a column of text from Excel, Google Sheets, or CSV.
- **Skip First Line** – Ignore headers in your dataset.
- **Randomize** – Shuffle the order of data rows before insertion.
- **Loop After End of List** – Automatically repeat data if there are more text layers than rows.
- **Insert Empty Lines** – Optionally preserve empty lines in the dataset.
- **Counters**:
  - Shows the number of data rows to be inserted.
  - Shows the number of selected text layers.
  - Updates dynamically as you edit the text or change selections.
- **Keyboard Shortcuts**:
  - **Cmd/Ctrl + Enter** to trigger insertion without clicking the button.
  - Textarea auto-focused when the plugin opens for faster paste actions.
- **Global Sorting** – Text layers are sorted by their **absolute (global) X/Y position** before inserting data.
- **Fallback Font Loading** – Automatically loads Roboto if a selected text layer has a missing font.

---

## Installation

1. Clone or download this repository.
2. Open Figma and go to `Plugins > Development > New Plugin...`
3. Choose `Link existing plugin` and point it to this folder.
4. The plugin will now appear under `Plugins > Development` in Figma.

---

## Usage

1. **Select Text Layers**  
   Hold `Cmd` (Mac) or `Ctrl` (Windows) and select the text layers you want to populate.

2. **Open Plugin**  
   Press your shortcut or select it from `Plugins > Development > Paste Data Plugin`.

3. **Paste Data**  
   Copy a column of data from Excel/Sheets and paste it into the plugin textarea.  

4. **Adjust Options**  
   - **Skip First Line** if your dataset has a header.
   - **Randomize** to shuffle the data.
   - **Loop After End of List** to repeat rows if there are more text layers than rows.
   - **Insert Empty Lines** if you want blank rows preserved.

5. **Insert Data**  
   Click **Insert** or press `Cmd/Ctrl + Enter` to populate your text layers.

---

## Settings Persistence

The plugin remembers your last used options (skip first line, loop, randomize, insert empty lines) across sessions using Figma's client storage.

---

## Notes / Known Limitations

- **Mixed Fonts** – The plugin may fail if a single text layer contains multiple font styles. Consider unifying font styles.
- **Clipboard Warnings** – Some browsers may log permission warnings for clipboard access, which do not affect plugin functionality.
- **No External Network Calls** – This plugin does not make network requests; it runs entirely within Figma.