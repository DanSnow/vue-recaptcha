# docs-docus-v4-content Specification

## Purpose

TBD - created by archiving change 'migrate-docs-docus-v4'. Update Purpose after archive.

## Requirements

### Requirement: Alert components use Docus v4 callout syntax

Documentation content SHALL use `::warning`, `::caution`, and `::note` block components in place of the old `::alert{type="..."}` syntax. Inline alert syntax (`:alert[text]{type="..."}`) SHALL be converted to block form.

#### Scenario: Warning alert migration

- **WHEN** a content file contains `::alert{type="warning"}` or `::alert{type="info"}`
- **THEN** it SHALL be replaced with `::warning` or `::note` respectively

#### Scenario: Danger alert migration

- **WHEN** a content file contains `::alert{type="danger"}`
- **THEN** it SHALL be replaced with `::caution`

#### Scenario: Inline alert migration

- **WHEN** a content file contains inline `:alert[text]{type="warning"}`
- **THEN** it SHALL be replaced with a `::warning\ntext\n::` block


<!-- @trace
source: migrate-docs-docus-v4
updated: 2026-03-10
code:
  - packages/docs/components/content/IndexDemo.vue
  - packages/docs/content/2.components/0.index.md
  - packages/docs/app.config.ts
  - packages/docs/components/content/ChallengeV3Demo.vue
  - packages/docs/app.vue
  - packages/docs/content/2.components/2.challenge-v2.md
  - packages/docs/app/components/content/PrimaryButton.vue
  - packages/docs/app/components/content/CheckboxDemo.vue
  - .vscode/settings.json
  - packages/docs/components/content/ChallengeV2Demo.vue
  - packages/docs/components/content/Mermaid.vue
  - packages/docs/content/index.md
  - packages/docs/layouts/default.vue
  - packages/docs/components/content/VeeValidateInvisible.vue
  - .oxfmtrc.json
  - packages/docs/app/app.config.ts
  - packages/docs/content/0.index.md
  - packages/docs/content/1.guide/1.nuxt.md
  - packages/docs/nuxt.config.ts
  - packages/docs/app/components/content/ChallengeV2Demo.vue
  - packages/docs/app/components/content/ChallengeV3Demo.vue
  - packages/docs/content/2.components/1.checkbox.md
  - packages/docs/content/1.guide/3.enterprise.md
  - packages/docs/content/2.components/3.challenge-v3.md
  - packages/docs/app/components/content/Mermaid.vue
  - packages/vue-recaptcha/src/plugin.ts
  - packages/playground-nuxt/package.json
  - pnpm-workspace.yaml
  - packages/docs/package.json
  - packages/docs/app/components/content/VeeValidateCheckbox.vue
  - packages/docs/content/1.guide/0.index.md
  - packages/playground-vite/package.json
  - packages/docs/.data/content/contents.sqlite
  - packages/vue-recaptcha/src/nuxt.ts
  - packages/docs/components/content/CheckboxDemo.vue
  - packages/docs/components/content/VeeValidateCheckbox.vue
  - packages/vue-recaptcha/package.json
  - packages/docs/content/5.integration/0.vee-validation.md
  - packages/vue-recaptcha/src/types.ts
  - packages/vue-recaptcha/src/nuxt-plugin.ts
  - packages/docs/app/components/content/IndexDemo.vue
  - packages/docs/app/components/content/ThemeButton.vue
  - packages/docs/components/content/ThemeButton.vue
  - packages/docs/app/components/content/VeeValidateInvisible.vue
  - packages/docs/components/content/PrimaryButton.vue
-->

---
### Requirement: Installation code groups use fenced block syntax

Documentation content SHALL use `:::code-group` (3 colons) with standard fenced code blocks using `[label]` syntax. The old `::code-group` + `::code-block{label="..."}` + `:terminal{content="..."}` pattern SHALL NOT be used.

#### Scenario: Install command code group

- **WHEN** a content file shows package manager install commands
- **THEN** it SHALL use `:::code-group` with ` ```bash [yarn] `, ` ```bash [npm] `, ` ```bash [pnpm] ` fenced blocks


<!-- @trace
source: migrate-docs-docus-v4
updated: 2026-03-10
code:
  - packages/docs/components/content/IndexDemo.vue
  - packages/docs/content/2.components/0.index.md
  - packages/docs/app.config.ts
  - packages/docs/components/content/ChallengeV3Demo.vue
  - packages/docs/app.vue
  - packages/docs/content/2.components/2.challenge-v2.md
  - packages/docs/app/components/content/PrimaryButton.vue
  - packages/docs/app/components/content/CheckboxDemo.vue
  - .vscode/settings.json
  - packages/docs/components/content/ChallengeV2Demo.vue
  - packages/docs/components/content/Mermaid.vue
  - packages/docs/content/index.md
  - packages/docs/layouts/default.vue
  - packages/docs/components/content/VeeValidateInvisible.vue
  - .oxfmtrc.json
  - packages/docs/app/app.config.ts
  - packages/docs/content/0.index.md
  - packages/docs/content/1.guide/1.nuxt.md
  - packages/docs/nuxt.config.ts
  - packages/docs/app/components/content/ChallengeV2Demo.vue
  - packages/docs/app/components/content/ChallengeV3Demo.vue
  - packages/docs/content/2.components/1.checkbox.md
  - packages/docs/content/1.guide/3.enterprise.md
  - packages/docs/content/2.components/3.challenge-v3.md
  - packages/docs/app/components/content/Mermaid.vue
  - packages/vue-recaptcha/src/plugin.ts
  - packages/playground-nuxt/package.json
  - pnpm-workspace.yaml
  - packages/docs/package.json
  - packages/docs/app/components/content/VeeValidateCheckbox.vue
  - packages/docs/content/1.guide/0.index.md
  - packages/playground-vite/package.json
  - packages/docs/.data/content/contents.sqlite
  - packages/vue-recaptcha/src/nuxt.ts
  - packages/docs/components/content/CheckboxDemo.vue
  - packages/docs/components/content/VeeValidateCheckbox.vue
  - packages/vue-recaptcha/package.json
  - packages/docs/content/5.integration/0.vee-validation.md
  - packages/vue-recaptcha/src/types.ts
  - packages/vue-recaptcha/src/nuxt-plugin.ts
  - packages/docs/app/components/content/IndexDemo.vue
  - packages/docs/app/components/content/ThemeButton.vue
  - packages/docs/components/content/ThemeButton.vue
  - packages/docs/app/components/content/VeeValidateInvisible.vue
  - packages/docs/components/content/PrimaryButton.vue
-->

---
### Requirement: Preview and code demos use tabs

Documentation content SHALL use `::tabs` (2 colons) with `:::tabs-item{label="..."}` (3 colons) blocks to display a Preview tab alongside a Code tab. The old `::code-group` with `::code-block{label="Preview" preview}` pattern SHALL NOT be used.

#### Scenario: Component preview with code

- **WHEN** a content file shows a live component preview alongside its source code
- **THEN** it SHALL use `::tabs` containing `:::tabs-item{label="Preview"}` and `:::tabs-item{label="Code"}` blocks


<!-- @trace
source: migrate-docs-docus-v4
updated: 2026-03-10
code:
  - packages/docs/components/content/IndexDemo.vue
  - packages/docs/content/2.components/0.index.md
  - packages/docs/app.config.ts
  - packages/docs/components/content/ChallengeV3Demo.vue
  - packages/docs/app.vue
  - packages/docs/content/2.components/2.challenge-v2.md
  - packages/docs/app/components/content/PrimaryButton.vue
  - packages/docs/app/components/content/CheckboxDemo.vue
  - .vscode/settings.json
  - packages/docs/components/content/ChallengeV2Demo.vue
  - packages/docs/components/content/Mermaid.vue
  - packages/docs/content/index.md
  - packages/docs/layouts/default.vue
  - packages/docs/components/content/VeeValidateInvisible.vue
  - .oxfmtrc.json
  - packages/docs/app/app.config.ts
  - packages/docs/content/0.index.md
  - packages/docs/content/1.guide/1.nuxt.md
  - packages/docs/nuxt.config.ts
  - packages/docs/app/components/content/ChallengeV2Demo.vue
  - packages/docs/app/components/content/ChallengeV3Demo.vue
  - packages/docs/content/2.components/1.checkbox.md
  - packages/docs/content/1.guide/3.enterprise.md
  - packages/docs/content/2.components/3.challenge-v3.md
  - packages/docs/app/components/content/Mermaid.vue
  - packages/vue-recaptcha/src/plugin.ts
  - packages/playground-nuxt/package.json
  - pnpm-workspace.yaml
  - packages/docs/package.json
  - packages/docs/app/components/content/VeeValidateCheckbox.vue
  - packages/docs/content/1.guide/0.index.md
  - packages/playground-vite/package.json
  - packages/docs/.data/content/contents.sqlite
  - packages/vue-recaptcha/src/nuxt.ts
  - packages/docs/components/content/CheckboxDemo.vue
  - packages/docs/components/content/VeeValidateCheckbox.vue
  - packages/vue-recaptcha/package.json
  - packages/docs/content/5.integration/0.vee-validation.md
  - packages/vue-recaptcha/src/types.ts
  - packages/vue-recaptcha/src/nuxt-plugin.ts
  - packages/docs/app/components/content/IndexDemo.vue
  - packages/docs/app/components/content/ThemeButton.vue
  - packages/docs/components/content/ThemeButton.vue
  - packages/docs/app/components/content/VeeValidateInvisible.vue
  - packages/docs/components/content/PrimaryButton.vue
-->

---
### Requirement: Card grids use card-group with frontmatter props

Documentation content SHALL use `:::card-group` (3 colons) containing `::card` (2 colons) blocks with YAML frontmatter inside (delimited by `---`) to set card properties. The old `::card-grid` with `#title`/`#description` named slot syntax SHALL NOT be used.

#### Scenario: Feature card grid

- **WHEN** a content file displays a grid of feature cards
- **THEN** it SHALL use `:::card-group` with `::card\n---\ntitle: ...\n---\n` blocks


<!-- @trace
source: migrate-docs-docus-v4
updated: 2026-03-10
code:
  - packages/docs/components/content/IndexDemo.vue
  - packages/docs/content/2.components/0.index.md
  - packages/docs/app.config.ts
  - packages/docs/components/content/ChallengeV3Demo.vue
  - packages/docs/app.vue
  - packages/docs/content/2.components/2.challenge-v2.md
  - packages/docs/app/components/content/PrimaryButton.vue
  - packages/docs/app/components/content/CheckboxDemo.vue
  - .vscode/settings.json
  - packages/docs/components/content/ChallengeV2Demo.vue
  - packages/docs/components/content/Mermaid.vue
  - packages/docs/content/index.md
  - packages/docs/layouts/default.vue
  - packages/docs/components/content/VeeValidateInvisible.vue
  - .oxfmtrc.json
  - packages/docs/app/app.config.ts
  - packages/docs/content/0.index.md
  - packages/docs/content/1.guide/1.nuxt.md
  - packages/docs/nuxt.config.ts
  - packages/docs/app/components/content/ChallengeV2Demo.vue
  - packages/docs/app/components/content/ChallengeV3Demo.vue
  - packages/docs/content/2.components/1.checkbox.md
  - packages/docs/content/1.guide/3.enterprise.md
  - packages/docs/content/2.components/3.challenge-v3.md
  - packages/docs/app/components/content/Mermaid.vue
  - packages/vue-recaptcha/src/plugin.ts
  - packages/playground-nuxt/package.json
  - pnpm-workspace.yaml
  - packages/docs/package.json
  - packages/docs/app/components/content/VeeValidateCheckbox.vue
  - packages/docs/content/1.guide/0.index.md
  - packages/playground-vite/package.json
  - packages/docs/.data/content/contents.sqlite
  - packages/vue-recaptcha/src/nuxt.ts
  - packages/docs/components/content/CheckboxDemo.vue
  - packages/docs/components/content/VeeValidateCheckbox.vue
  - packages/vue-recaptcha/package.json
  - packages/docs/content/5.integration/0.vee-validation.md
  - packages/vue-recaptcha/src/types.ts
  - packages/vue-recaptcha/src/nuxt-plugin.ts
  - packages/docs/app/components/content/IndexDemo.vue
  - packages/docs/app/components/content/ThemeButton.vue
  - packages/docs/components/content/ThemeButton.vue
  - packages/docs/app/components/content/VeeValidateInvisible.vue
  - packages/docs/components/content/PrimaryButton.vue
-->

---
### Requirement: Navigation links use plain Markdown syntax

Documentation content SHALL use standard Markdown links (`[text](url)`) for in-page navigation. The `:button-link[text]{href="..."}` component SHALL NOT be used.

#### Scenario: Button link replacement

- **WHEN** a content file contains `:button-link[text]{href="url"}`
- **THEN** it SHALL be replaced with `[text](url)`


<!-- @trace
source: migrate-docs-docus-v4
updated: 2026-03-10
code:
  - packages/docs/components/content/IndexDemo.vue
  - packages/docs/content/2.components/0.index.md
  - packages/docs/app.config.ts
  - packages/docs/components/content/ChallengeV3Demo.vue
  - packages/docs/app.vue
  - packages/docs/content/2.components/2.challenge-v2.md
  - packages/docs/app/components/content/PrimaryButton.vue
  - packages/docs/app/components/content/CheckboxDemo.vue
  - .vscode/settings.json
  - packages/docs/components/content/ChallengeV2Demo.vue
  - packages/docs/components/content/Mermaid.vue
  - packages/docs/content/index.md
  - packages/docs/layouts/default.vue
  - packages/docs/components/content/VeeValidateInvisible.vue
  - .oxfmtrc.json
  - packages/docs/app/app.config.ts
  - packages/docs/content/0.index.md
  - packages/docs/content/1.guide/1.nuxt.md
  - packages/docs/nuxt.config.ts
  - packages/docs/app/components/content/ChallengeV2Demo.vue
  - packages/docs/app/components/content/ChallengeV3Demo.vue
  - packages/docs/content/2.components/1.checkbox.md
  - packages/docs/content/1.guide/3.enterprise.md
  - packages/docs/content/2.components/3.challenge-v3.md
  - packages/docs/app/components/content/Mermaid.vue
  - packages/vue-recaptcha/src/plugin.ts
  - packages/playground-nuxt/package.json
  - pnpm-workspace.yaml
  - packages/docs/package.json
  - packages/docs/app/components/content/VeeValidateCheckbox.vue
  - packages/docs/content/1.guide/0.index.md
  - packages/playground-vite/package.json
  - packages/docs/.data/content/contents.sqlite
  - packages/vue-recaptcha/src/nuxt.ts
  - packages/docs/components/content/CheckboxDemo.vue
  - packages/docs/components/content/VeeValidateCheckbox.vue
  - packages/vue-recaptcha/package.json
  - packages/docs/content/5.integration/0.vee-validation.md
  - packages/vue-recaptcha/src/types.ts
  - packages/vue-recaptcha/src/nuxt-plugin.ts
  - packages/docs/app/components/content/IndexDemo.vue
  - packages/docs/app/components/content/ThemeButton.vue
  - packages/docs/components/content/ThemeButton.vue
  - packages/docs/app/components/content/VeeValidateInvisible.vue
  - packages/docs/components/content/PrimaryButton.vue
-->

---
### Requirement: Landing page hero uses correct MDC YAML frontmatter

The `content/index.md` landing page SHALL use a properly formed `::u-page-hero` block with YAML frontmatter for `links` props and named slots (`#title`, `#description`) for content.

#### Scenario: Hero block structure

- **WHEN** the index page is rendered
- **THEN** `::u-page-hero` SHALL contain a `---\nlinks:\n  - ...\n---` frontmatter block and `#title` / `#description` named slot content


<!-- @trace
source: migrate-docs-docus-v4
updated: 2026-03-10
code:
  - packages/docs/components/content/IndexDemo.vue
  - packages/docs/content/2.components/0.index.md
  - packages/docs/app.config.ts
  - packages/docs/components/content/ChallengeV3Demo.vue
  - packages/docs/app.vue
  - packages/docs/content/2.components/2.challenge-v2.md
  - packages/docs/app/components/content/PrimaryButton.vue
  - packages/docs/app/components/content/CheckboxDemo.vue
  - .vscode/settings.json
  - packages/docs/components/content/ChallengeV2Demo.vue
  - packages/docs/components/content/Mermaid.vue
  - packages/docs/content/index.md
  - packages/docs/layouts/default.vue
  - packages/docs/components/content/VeeValidateInvisible.vue
  - .oxfmtrc.json
  - packages/docs/app/app.config.ts
  - packages/docs/content/0.index.md
  - packages/docs/content/1.guide/1.nuxt.md
  - packages/docs/nuxt.config.ts
  - packages/docs/app/components/content/ChallengeV2Demo.vue
  - packages/docs/app/components/content/ChallengeV3Demo.vue
  - packages/docs/content/2.components/1.checkbox.md
  - packages/docs/content/1.guide/3.enterprise.md
  - packages/docs/content/2.components/3.challenge-v3.md
  - packages/docs/app/components/content/Mermaid.vue
  - packages/vue-recaptcha/src/plugin.ts
  - packages/playground-nuxt/package.json
  - pnpm-workspace.yaml
  - packages/docs/package.json
  - packages/docs/app/components/content/VeeValidateCheckbox.vue
  - packages/docs/content/1.guide/0.index.md
  - packages/playground-vite/package.json
  - packages/docs/.data/content/contents.sqlite
  - packages/vue-recaptcha/src/nuxt.ts
  - packages/docs/components/content/CheckboxDemo.vue
  - packages/docs/components/content/VeeValidateCheckbox.vue
  - packages/vue-recaptcha/package.json
  - packages/docs/content/5.integration/0.vee-validation.md
  - packages/vue-recaptcha/src/types.ts
  - packages/vue-recaptcha/src/nuxt-plugin.ts
  - packages/docs/app/components/content/IndexDemo.vue
  - packages/docs/app/components/content/ThemeButton.vue
  - packages/docs/components/content/ThemeButton.vue
  - packages/docs/app/components/content/VeeValidateInvisible.vue
  - packages/docs/components/content/PrimaryButton.vue
-->

---
### Requirement: Markdown files are excluded from OXC format-on-save

The `.vscode/settings.json` SHALL configure `[markdown]` with `"editor.formatOnSave": false` and SHALL NOT include `[markdown]` in the OXC formatter language selector. This prevents MDC component syntax from being reformatted on file save.

#### Scenario: Markdown file save

- **WHEN** a `.md` file is saved in VSCode
- **THEN** the OXC formatter SHALL NOT reformat the file

<!-- @trace
source: migrate-docs-docus-v4
updated: 2026-03-10
code:
  - packages/docs/components/content/IndexDemo.vue
  - packages/docs/content/2.components/0.index.md
  - packages/docs/app.config.ts
  - packages/docs/components/content/ChallengeV3Demo.vue
  - packages/docs/app.vue
  - packages/docs/content/2.components/2.challenge-v2.md
  - packages/docs/app/components/content/PrimaryButton.vue
  - packages/docs/app/components/content/CheckboxDemo.vue
  - .vscode/settings.json
  - packages/docs/components/content/ChallengeV2Demo.vue
  - packages/docs/components/content/Mermaid.vue
  - packages/docs/content/index.md
  - packages/docs/layouts/default.vue
  - packages/docs/components/content/VeeValidateInvisible.vue
  - .oxfmtrc.json
  - packages/docs/app/app.config.ts
  - packages/docs/content/0.index.md
  - packages/docs/content/1.guide/1.nuxt.md
  - packages/docs/nuxt.config.ts
  - packages/docs/app/components/content/ChallengeV2Demo.vue
  - packages/docs/app/components/content/ChallengeV3Demo.vue
  - packages/docs/content/2.components/1.checkbox.md
  - packages/docs/content/1.guide/3.enterprise.md
  - packages/docs/content/2.components/3.challenge-v3.md
  - packages/docs/app/components/content/Mermaid.vue
  - packages/vue-recaptcha/src/plugin.ts
  - packages/playground-nuxt/package.json
  - pnpm-workspace.yaml
  - packages/docs/package.json
  - packages/docs/app/components/content/VeeValidateCheckbox.vue
  - packages/docs/content/1.guide/0.index.md
  - packages/playground-vite/package.json
  - packages/docs/.data/content/contents.sqlite
  - packages/vue-recaptcha/src/nuxt.ts
  - packages/docs/components/content/CheckboxDemo.vue
  - packages/docs/components/content/VeeValidateCheckbox.vue
  - packages/vue-recaptcha/package.json
  - packages/docs/content/5.integration/0.vee-validation.md
  - packages/vue-recaptcha/src/types.ts
  - packages/vue-recaptcha/src/nuxt-plugin.ts
  - packages/docs/app/components/content/IndexDemo.vue
  - packages/docs/app/components/content/ThemeButton.vue
  - packages/docs/components/content/ThemeButton.vue
  - packages/docs/app/components/content/VeeValidateInvisible.vue
  - packages/docs/components/content/PrimaryButton.vue
-->