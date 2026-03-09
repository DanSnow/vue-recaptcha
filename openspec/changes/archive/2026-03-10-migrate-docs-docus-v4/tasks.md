## 1. Editor Configuration

- [x] 1.1 Disable OXC format-on-save for markdown files — ensure markdown files are excluded from OXC format-on-save: remove `[markdown]` from the OXC formatter language selector and add `"[markdown]": { "editor.formatOnSave": false }` in `.vscode/settings.json`

## 2. Landing Page

- [x] 2.1 Fix the landing page hero uses correct MDC YAML frontmatter: correct the malformed `::u-page-hero` block in `content/index.md` with proper `---\nlinks:\n  - ...\n---` props and `#title` / `#description` named slots (design: use `::warning` / `::caution` / `::note` for alerts — not applicable here, kept for reference)
- [x] 2.2 Replace `::card-grid` so that card grids use card-group with frontmatter props: use `:::card-group` + `::card` with frontmatter props syntax in `content/index.md` (design: use `:::card-group` + `::card` with frontmatter props)

## 3. Guide Pages — Alert Components

- [x] 3.1 Migrate `content/1.guide/0.index.md` so that alert components use Docus v4 callout syntax (design: use `::warning` / `::caution` / `::note` for alerts): replace `::alert{type="warning"}` with `::warning`, inline `:alert[...]` with block form; replace `::list{type="..."}` so navigation links use plain Markdown syntax for lists; replace `:button-link` so navigation links use plain Markdown syntax
- [x] 3.2 Migrate `content/1.guide/1.nuxt.md` so that alert components use Docus v4 callout syntax: replace `::alert{type="warning"}` with `::warning` and `::alert{type="danger"}` with `::caution` (design: use `::warning` / `::caution` / `::note` for alerts)
- [x] 3.3 Migrate `content/1.guide/3.enterprise.md` so that alert components use Docus v4 callout syntax: replace `::alert{type="warning"}` with `::warning` (design: use `::warning` / `::caution` / `::note` for alerts)

## 4. Guide Pages — Installation Code Groups

- [x] 4.1 Update `content/1.guide/0.index.md` so that installation code groups use fenced block syntax: convert `::code-group` + `::code-block` + `:terminal` to `:::code-group` with fenced code blocks for install commands (design: use `:::code-group` with fenced code blocks for install commands)

## 5. Component Pages — Preview and Code Demos

- [x] 5.1 Update `content/2.components/0.index.md` so that preview and code demos use tabs: convert `::code-group` preview pattern to `::tabs` + `:::tabs-item` (design: use `::tabs` + `:::tabs-item` for preview+code demos); replace `:button-link` with plain markdown links so navigation links use plain Markdown syntax
- [x] 5.2 Update `content/2.components/1.checkbox.md` so that preview and code demos use tabs: convert `::code-group` + `::code-block{label="Preview" preview}` to `::tabs` + `:::tabs-item` (design: use `::tabs` + `:::tabs-item` for preview+code demos)
- [x] 5.3 Update `content/2.components/2.challenge-v2.md` so that preview and code demos use tabs: convert `::code-group` preview pattern to `::tabs` + `:::tabs-item` (design: use `::tabs` + `:::tabs-item` for preview+code demos)
- [x] 5.4 Update `content/2.components/3.challenge-v3.md` so that preview and code demos use tabs: convert `::code-group` preview pattern to `::tabs` + `:::tabs-item` (design: use `::tabs` + `:::tabs-item` for preview+code demos)

## 6. Integration Pages — Preview and Code Demos

- [x] 6.1 Update `content/5.integration/0.vee-validation.md` so that preview and code demos use tabs: convert both `::code-group` preview patterns to `::tabs` + `:::tabs-item` (design: use `::tabs` + `:::tabs-item` for preview+code demos)
