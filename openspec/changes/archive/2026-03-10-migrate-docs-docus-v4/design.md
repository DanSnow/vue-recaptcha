## Context

The vue-recaptcha docs package uses `docus ^5.7.0` (Docus v4, built on Nuxt UI Pro and Nuxt Content v3). The content files were authored for Docus v1–v3, which had a different set of MDC prose components. The Docus v4 component API is a complete redesign aligned with Nuxt UI Pro primitives.

Current problems:
- `::alert`, `::list`, `::code-group`/`::code-block`, `:terminal`, `::card-grid`, `:button-link` no longer exist in Docus v4
- The `content/index.md` landing page has a malformed `::u-page-hero` block copied from an incomplete migration attempt
- The OXC formatter (`formatOnSave: true`) is configured for `[markdown]` files, which reformats MDC syntax and breaks component blocks

## Goals / Non-Goals

**Goals:**

- Replace all deprecated Docus v1–v3 MDC components with their Docus v4 equivalents
- Fix the malformed `::u-page-hero` hero block on the landing page
- Prevent the OXC formatter from breaking MDC syntax in markdown files
- Keep all existing documentation content and structure intact

**Non-Goals:**

- Redesigning the documentation site layout or navigation
- Adding new documentation pages or updating doc content
- Migrating from Docus to a different framework (e.g., plain Nuxt UI Docs)

## Decisions

### Use `::warning` / `::caution` / `::note` for alerts

Docus v4 maps these MDC shorthand names directly to Nuxt UI Pro callout variants. They are simpler than `::callout{type="..."}` and match the Docus docs examples.

- `::alert{type="warning"}` → `::warning`
- `::alert{type="danger"}` → `::caution`
- Inline `:alert[text]{type="warning"}` → block `::warning text ::`

### Use `:::code-group` with fenced code blocks for install commands

Docus v4's `code-group` accepts regular fenced code blocks with `[label]` syntax instead of `::code-block` wrappers. `:terminal` is removed; use `bash` code blocks directly.

### Use `::tabs` + `:::tabs-item` for Preview+Code demos

The old pattern of `::code-group` with a `preview` attribute is replaced by standard Docus v4 tabs. The tab items use 3-colon nesting inside a 2-colon `::tabs` parent.

### Use `:::card-group` + `::card` with frontmatter props

Old `::card-grid` with `#title`/`#description` named slots is replaced by `:::card-group` (3 colons) containing `::card` (2 colons) with YAML frontmatter props inside the component block.

### Replace `:button-link` with plain Markdown links

`button-link` no longer exists in Docus v4. Plain Markdown links (`[text](url)`) are sufficient for navigation; the UButton component can be used via MDC if styled buttons are ever needed.

### Disable OXC format-on-save for markdown files

OXC is a JavaScript/TypeScript formatter and does not understand MDC syntax. It reformats `::component` blocks, breaks `---` YAML frontmatter inside components, and adds erroneous heading markers. Disabling markdown from OXC's scope (via `.vscode/settings.json`) is the correct fix.

## Risks / Trade-offs

- [Risk] `::u-page-hero` with `links` YAML prop may require Nuxt UI Pro's `UPageHero` component → Docus v4 bundles Nuxt UI Pro, so this should be available. If not available, fall back to named slots without `links`.
- [Risk] `::mermaid` is a custom content component — it is not part of Docus v4 but is auto-registered from `app/components/content/`. Should continue to work unchanged.
- [Trade-off] Removing `::list{type="success/danger"}` loses visual list styling. Plain bullet lists are less decorative but more maintainable and semantically correct.
