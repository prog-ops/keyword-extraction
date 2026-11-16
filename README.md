# Keyword Extraction - English Grammar Checker

An English grammar detection and correction web application built with **React 18**, **Vite 5**, **Chakra UI**, and **Bun**.

## Key Features

- **Corrected Rewrite & Bold Highlighting**: Rewrites your input text into grammatically correct English and automatically renders every corrected word in **bold** (with hover tooltips explaining each change).
- **Dynamic Split-Pane Layout**: Starts as a centered single-pane editor and smoothly splits into a dual-pane layout only after clicking **Start**.
- **Hybrid Grammar Engine**:
  - **Local Rule & Dictionary Engine**: Runs instantaneously in the browser to fix spelling, subject-verb agreement, verb tenses, articles (`a`/`an`), uncountable nouns, irregular plurals, prepositions/collocations, contractions, and punctuation.
  - **LanguageTool Contextual NLP**: Integrates with the public LanguageTool v2 endpoint for deeper contextual checks, with graceful fallback to the local engine when offline.
  - **Local-Only Mode Toggle**: Switch in the input panel to force 100% offline/private client-side processing without sending any text to external servers.
- **Copy & Correction Breakdown**: Copy either plain corrected text or Markdown (`**bold**`) format, alongside a detailed list of applied corrections below the output panel.

## Architecture

```text
src/
├── assets/                   # Static assets & icons
├── components/               # Presentational & container UI components
│   ├── CorrectionItem.jsx    # Individual correction detail card
│   ├── Footer.jsx            # Application footer
│   ├── Header.jsx            # Responsive header
│   ├── Input.jsx             # Left pane: text editor, Local-Only toggle & Start button
│   └── OutputPanel.jsx       # Right pane: corrected text (bold) & correction breakdown
├── config/                   # App configuration, sample texts & Chakra UI theme
├── domain/
│   └── grammar/              # Pure domain logic (framework-agnostic)
│       ├── diffEngine.js     # LCS token diff algorithm & bold segment builder
│       ├── grammarTypes.js   # JSDoc data contracts & casing utilities
│       └── rules/            # Spelling, grammar patterns & punctuation rules
├── hooks/
│   └── useGrammarChecker.js  # Custom hook for state & split-pane workflow
└── services/
    └── grammar/              # Orchestrator & providers (Local + LanguageTool API)
```

## Getting Started (with Bun)

```bash
# Install dependencies
bun install

# Start the development server
bun run dev

# Run ESLint checks
bun run lint

# Create a production build
bun run build
```
