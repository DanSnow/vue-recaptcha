---
name: Spectra: Ingest
description: Update an existing OpenSpec change from a plan file or conversation context
category: Workflow
tags: ["workflow", "import", "plan", "claude"]
---

<!-- SPECTRA:START v1.0.0 -->
Update an existing OpenSpec change — from a Claude Code plan file or conversation context.

**Claude Code only.** This skill can read plan files from `~/.claude/plans/` or use conversation context to update artifacts.

**Prerequisites**: This skill requires the `spectra` CLI. If any `spectra` command fails with "command not found" or similar, report the error and STOP.

**Input**: Optionally specify a plan file path or name.

- `/spectra:ingest ~/.claude/plans/agile-discovering-rocket.md`
- `/spectra:ingest agile-discovering-rocket`
- `/spectra:ingest` (use conversation context or auto-detect plan file)

**Steps**

1. **Locate the requirement source**

   a. **Argument provided** → treat as plan file reference (prepend `~/.claude/plans/` and append `.md` if needed)
   - If the file exists → use it as the plan file source, proceed to Step 2
   - If the file does NOT exist → report the error and **stop**

   b. **No argument, plan file detectable**:
   - Check conversation context for plan file path (plan mode system messages include the path like `~/.claude/plans/<name>.md`)
   - If found and the file exists → use the **AskUserQuestion tool** to ask:
     - Option 1: Use the plan file
     - Option 2: Use conversation context
   - If the user picks plan file → proceed to Step 2
   - If the user picks conversation context → skip Step 2, go to Step 3

   c. **No argument, no plan file detectable**:
   - Check `~/.claude/plans/` for recent files
   - If recent files exist → list 5 most recent with the **AskUserQuestion tool**, include "Use conversation context" as an additional option
   - If the user picks a file → proceed to Step 2
   - If the user picks conversation context → skip Step 2, go to Step 3

   d. **Conversation context fallback** (no plan files found at all):
   - Use conversation context to update artifacts
   - If conversation context is insufficient, use the **AskUserQuestion tool** to get more details
   - Warn: "No plan file found. Using conversation context."

2. **Parse the plan structure** (skip if using conversation context)

   Claude Code plan files typically contain:
   - **Title** (`# ...`) — the high-level goal
   - **Context** section — background, motivation, current state
   - **Stages/Steps** — numbered implementation stages with goals and file lists
   - **Files involved** — list of files to modify/create
   - **Verification** section — how to test the changes

   Extract:
   - `plan_title`: from the H1 heading
   - `plan_context`: from the Context section
   - `plan_stages`: each numbered stage with its goal and file list
   - `plan_files`: all file paths mentioned
   - `plan_verification`: verification steps

3. **Check for active changes** (REQUIRED — ingest only updates existing changes)

   ```bash
   spectra list --json
   ```

   Parse the JSON output to get the list of active changes.
   - If one active change exists → use the **AskUserQuestion tool** to confirm updating it
   - If multiple active changes exist → use the **AskUserQuestion tool** to let user pick which one to update
   - If no active changes → tell the user: "No active change found. Use `/spectra:propose` first to create one." and **stop**

4. **Select the change**

   After selecting the change, check if it is parked:

   ```bash
   spectra list --parked --json
   ```

   If the selected change appears in the `parked` array:
   - Inform the user that this change is currently shelved (暫存)
   - Use **AskUserQuestion tool** to ask: continue (un-shelve) or cancel
   - If continue: run `spectra unpark "<name>"` then proceed
   - If cancel: stop the workflow

   Read existing artifacts for context before updating.

5. **Update artifacts**

   For each artifact, get instructions first:

   ```bash
   spectra instructions <artifact-id> --change "<name>" --json
   ```

   Use the `template` from instructions as the output structure. Apply `context` and `rules` as constraints but do NOT copy them into the file.

   The instructions JSON includes `locale` — the language to write artifacts in. If present, you MUST write the artifact content in that language. Exception: spec files (specs/\*/\*.md) MUST always be written in English regardless of locale, because they use normative language (SHALL/MUST).

   **Plan-to-Artifact Mapping** (when using a plan file):

   | Plan Section       | Artifact         | How to Map                                        |
   | ------------------ | ---------------- | ------------------------------------------------- |
   | Title              | Change name      | Convert to kebab-case                             |
   | Context            | proposal: Why    | Direct content transfer                           |
   | Stages overview    | proposal: What   | Summarize all stages                              |
   | Individual stages  | tasks.md groups  | One stage = one `##` heading, sub-items = `- [ ]` |
   | File paths         | proposal: Impact | Affected code list                                |
   | Verification steps | tasks.md         | Final verification task group                     |

   **Context-to-Artifact Mapping** (when using conversation context):

   | Conversation Element | Artifact         | How to Map                         |
   | -------------------- | ---------------- | ---------------------------------- |
   | Goal / requirement   | proposal: Why    | Extract motivation from discussion |
   | Discussed approach   | proposal: What   | Summarize agreed approach          |
   | Mentioned files      | proposal: Impact | Affected code list                 |
   | Discussion phases    | tasks.md groups  | One topic = one `##` heading       |

   **When updating an existing change:**
   - Merge new context into existing proposal (don't replace)
   - Add new tasks from plan stages or conversation, **preserve completed `[x]` items**
   - **Preserve existing `[P]` markers** on tasks that still qualify
   - Do NOT remove existing content

   **Parallel task markers (`[P]`)**: When creating or updating the **tasks** artifact, first read `openspec/config.yaml`. If `parallel_tasks: true` is set, add `[P]` markers to new tasks that can be executed in parallel. Format: `- [ ] [P] Task description`. A task qualifies for `[P]` if it targets different files from other pending tasks AND has no dependency on incomplete tasks in the same group. When `parallel_tasks` is not enabled, do NOT add `[P]` markers — but still preserve any existing `[P]` markers already in the file.

   After creating each artifact, re-check status:

   ```bash
   spectra status --change "<name>" --json
   ```

   Continue until all `applyRequires` artifacts are complete. Show progress: "✓ Created <artifact-id>"

6. **Analyze-Fix Loop** (max 2 iterations)

   ```bash
   spectra analyze <name> --json
   ```

   1. Filter findings to **Critical and Warning only** (ignore Suggestion)
   2. If no Critical/Warning findings → show "Artifacts look consistent ✓" and proceed
   3. If Critical/Warning findings exist:
      a. Show: "Found N issue(s), fixing... (attempt M/2)"
      b. Fix each finding in the affected artifact
      c. Re-run `spectra analyze <name> --json`
      d. Repeat up to 2 total iterations
   4. After 2 attempts, if findings remain:
      - Show remaining findings as a summary
      - Proceed normally (do NOT block)

7. **Validation**

   ```bash
   spectra validate "<name>"
   ```

   If validation fails, fix errors and re-validate.

8. **Summary and next steps**

   Show:
   - Source used: plan file (`<path>`) or conversation context
   - Change name and location
   - Artifacts created/updated
   - Validation result

   Use **AskUserQuestion tool** to confirm the workflow is complete. This ensures the workflow stops even when auto-accept is enabled. Provide exactly these options:
   - **First option (will be auto-selected)**: "Done" — End the ingest workflow. Inform the user they can run `/spectra:apply <change-name>` when ready.
   - **Second option**: "Apply" — Invoke `/spectra:apply <change-name>` to start implementation.

   If **AskUserQuestion tool** is not available, display the summary and inform the user to run `/spectra:apply <change-name>` when ready. Then STOP — do not continue.

   **After the user responds**, if they chose "Done", the workflow is OVER. If they chose "Apply", invoke `/spectra:apply <change-name>` to begin implementation.

**Guardrails**

- **NEVER** modify the original plan file in `~/.claude/plans/`
- **NEVER** write application code — this skill only creates/updates OpenSpec artifacts
- **NEVER** create new changes — ingest only updates existing changes. If no active change exists, direct user to `/spectra:propose`
- When updating existing changes, **preserve all completed tasks** (`[x]`) — never revert progress
- If the source content is too brief to fill all artifact sections, use the **AskUserQuestion tool** to get more details rather than inventing content
- If `spectra` CLI is not available, report the error and stop
- Verify each artifact file exists after writing before proceeding to next
- **NEVER** skip the artifact workflow to write code directly
- If **AskUserQuestion tool** is not available, ask the same questions as plain text and wait for the user's response
<!-- SPECTRA:END -->
