## Why

The vue-recaptcha documentation uses old Docus v1–v3 MDC component syntax (e.g., `::alert`, `::list`, `::code-group`/`::code-block`, `:terminal`, `::card-grid`, `:button-link`) that no longer works with Docus v4, which is built on Nuxt UI Pro and uses a new component API. The doc site is currently broken due to this mismatch.

## What Changes

- Replace `::alert{type="warning/danger"}` with `::warning` / `::caution` / `::note`
- Replace `::list{type="..."}` with plain Markdown lists (no Docus wrapper)
- Replace `::code-group` + `::code-block{label="..."}` + `:terminal` with `:::code-group` + fenced code blocks using `[label]` syntax
- Replace Preview+Code `::code-group` patterns with `::tabs` + `:::tabs-item` blocks
- Replace `::card-grid` + slot-based `::card` with `:::card-group` + frontmatter-based `::card`
- Replace `:button-link[text]{href="..."}` with plain Markdown links
- Fix broken `::u-page-hero` on `content/index.md` with correct MDC YAML frontmatter syntax
- Remove `[markdown]` from OXC formatter scope to prevent MDC syntax from being reformatted on save

## Capabilities

### New Capabilities

- `docs-docus-v4-content`: Updated documentation content using Docus v4 MDC component syntax

### Modified Capabilities

(none)

## Impact

- Affected code:
  - `packages/docs/content/index.md`
  - `packages/docs/content/1.guide/0.index.md`
  - `packages/docs/content/1.guide/1.nuxt.md`
  - `packages/docs/content/1.guide/3.enterprise.md`
  - `packages/docs/content/2.components/0.index.md`
  - `packages/docs/content/2.components/1.checkbox.md`
  - `packages/docs/content/2.components/2.challenge-v2.md`
  - `packages/docs/content/2.components/3.challenge-v3.md`
  - `packages/docs/content/5.integration/0.vee-validation.md`
  - `.vscode/settings.json`
- No API changes; documentation-only update
