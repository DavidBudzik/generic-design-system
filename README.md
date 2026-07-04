# Generic Design System (GDS)

An open source design system that's fully customizable and agent ready.

Built on **Lit Web Components** and **TypeScript** — framework-agnostic, works with React, Vue, Angular, Svelte, or vanilla HTML.

## Quick Start

### Install

```bash
npm install @gds/core @gds/theme-neutral
npm install -D @gds/cli
```

### Add the theme CSS

```css
@import '@gds/core/reset.css';
@import '@gds/core/gds.css';
@import '@gds/theme-neutral/theme.css';
```

### Use components

```html
<script type="module">
  import '@gds/core/button';
  import '@gds/core/layout';
</script>

<gds-vstack gap="2">
  <gds-button label="Hello GDS"></gds-button>
</gds-vstack>
```

### Agent setup

```bash
npx gds init --features agents
```

This generates `CLAUDE.md`, `AGENTS.md`, or `.cursorrules` with full component docs, conventions, and CLI reference.

## Packages

| Package | Description |
|---------|-------------|
| `@gds/core` | Components, theme system, utilities |
| `@gds/cli` | CLI: component docs, templates, scaffolding, agent docs |
| `@gds/theme-neutral` | Neutral Light theme (muted, minimal) |
| `@gds/theme-dark` | Neutral Dark theme |
| `@gds/theme-warm` | Neutral Warm theme (earthy tones) |

## Principles

1. **Components over primitives** — use components for everything they cover
2. **Semantic tokens over hardcoded values** — colors and spacing named by purpose
3. **Theme-agnostic code** — app code never references specific colors
4. **Open internals** — every primitive is exported and composable
5. **One system for humans and AI** — same API, same docs, same conventions

## License

MIT