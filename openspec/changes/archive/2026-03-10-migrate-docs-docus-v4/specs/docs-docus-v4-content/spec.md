## ADDED Requirements

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

### Requirement: Installation code groups use fenced block syntax

Documentation content SHALL use `:::code-group` (3 colons) with standard fenced code blocks using `[label]` syntax. The old `::code-group` + `::code-block{label="..."}` + `:terminal{content="..."}` pattern SHALL NOT be used.

#### Scenario: Install command code group

- **WHEN** a content file shows package manager install commands
- **THEN** it SHALL use `:::code-group` with ` ```bash [yarn] `, ` ```bash [npm] `, ` ```bash [pnpm] ` fenced blocks

### Requirement: Preview and code demos use tabs

Documentation content SHALL use `::tabs` (2 colons) with `:::tabs-item{label="..."}` (3 colons) blocks to display a Preview tab alongside a Code tab. The old `::code-group` with `::code-block{label="Preview" preview}` pattern SHALL NOT be used.

#### Scenario: Component preview with code

- **WHEN** a content file shows a live component preview alongside its source code
- **THEN** it SHALL use `::tabs` containing `:::tabs-item{label="Preview"}` and `:::tabs-item{label="Code"}` blocks

### Requirement: Card grids use card-group with frontmatter props

Documentation content SHALL use `:::card-group` (3 colons) containing `::card` (2 colons) blocks with YAML frontmatter inside (delimited by `---`) to set card properties. The old `::card-grid` with `#title`/`#description` named slot syntax SHALL NOT be used.

#### Scenario: Feature card grid

- **WHEN** a content file displays a grid of feature cards
- **THEN** it SHALL use `:::card-group` with `::card\n---\ntitle: ...\n---\n` blocks

### Requirement: Navigation links use plain Markdown syntax

Documentation content SHALL use standard Markdown links (`[text](url)`) for in-page navigation. The `:button-link[text]{href="..."}` component SHALL NOT be used.

#### Scenario: Button link replacement

- **WHEN** a content file contains `:button-link[text]{href="url"}`
- **THEN** it SHALL be replaced with `[text](url)`

### Requirement: Landing page hero uses correct MDC YAML frontmatter

The `content/index.md` landing page SHALL use a properly formed `::u-page-hero` block with YAML frontmatter for `links` props and named slots (`#title`, `#description`) for content.

#### Scenario: Hero block structure

- **WHEN** the index page is rendered
- **THEN** `::u-page-hero` SHALL contain a `---\nlinks:\n  - ...\n---` frontmatter block and `#title` / `#description` named slot content

### Requirement: Markdown files are excluded from OXC format-on-save

The `.vscode/settings.json` SHALL configure `[markdown]` with `"editor.formatOnSave": false` and SHALL NOT include `[markdown]` in the OXC formatter language selector. This prevents MDC component syntax from being reformatted on file save.

#### Scenario: Markdown file save

- **WHEN** a `.md` file is saved in VSCode
- **THEN** the OXC formatter SHALL NOT reformat the file
