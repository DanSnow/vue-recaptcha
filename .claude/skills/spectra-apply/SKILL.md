---
name: spectra-apply
description: "Implement or resume tasks from an OpenSpec change"
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: spectra
  version: "1.0"
  generatedBy: "Spectra"
---

Implement tasks from an OpenSpec change.

**Input**: Optionally specify a change name (e.g., `/spectra:apply add-auth`). If omitted, check if it can be inferred from conversation context. If vague or ambiguous you MUST prompt for available changes.

**Task tracking is file-based only.** The tasks file's markdown checkboxes (`- [ ]` / `- [x]`) are the single source of truth for progress. Do NOT use any external task management system, built-in task tracker, or todo tool. When a task is done, edit the checkbox in the tasks file — that is the only way to record progress.

**Prerequisites**: This skill requires the `spectra` CLI. If any `spectra` command fails with "command not found" or similar, report the error and STOP.

**Steps**

1. **Select the change**

   If a name is provided, use it. Otherwise:
   - Infer from conversation context if the user mentioned a change
   - Auto-select if only one active change exists
   - If ambiguous, run `spectra list --json` to get available changes and use the **AskUserQuestion tool** to let the user select

   Always announce: "Using change: <name>" and how to override (e.g., `/spectra:apply <other>`).

   After selecting the change, mark it as in-progress:

   ```bash
   spectra in-progress add "<name>"
   ```

   This is a silent operation — do not show the output to the user.

2. **Check status to understand the schema**

   ```bash
   spectra status --change "<name>" --json 2>/dev/null
   ```

   **If the command fails**: show the error and STOP.

   **If the command succeeds**, check whether the change is parked (status can succeed even for parked changes):

   ```bash
   spectra list --parked --json
   ```

   Look for the change name in the `parked` array of the JSON output.
   - **If the change IS in the parked list** (it's parked):
     Inform the user that this change is currently shelved ("暫存" in the app).
     Use the **AskUserQuestion tool** to ask whether to continue.
     Use the app's own terminology — in Chinese locales, park = 暫存.
     Two options:
     - **Continue**: Un-shelve the change and proceed with apply
     - **Cancel**: Stop the workflow

     If the user chooses to continue:

     ```bash
     spectra unpark "<name>"
     ```

     Then re-run `spectra status --change "<name>" --json` and continue normally.

     If there is no AskUserQuestion tool available (non-Claude-Code environment):
     Inform the user that the change is shelved and they need to un-shelve it in Spectra first.
     STOP.

   - **If the change is NOT in the parked list**: proceed normally.

   Parse the JSON to understand:
   - `schemaName`: The workflow being used (e.g., "spec-driven")
   - Which artifact contains the tasks (typically "tasks" for spec-driven, check status for others)

3. **Get apply instructions**

   ```bash
   spectra instructions apply --change "<name>" --json
   ```

   This returns:
   - Context file paths (varies by schema)
   - Progress (total, complete, remaining)
   - Task list with status
   - Dynamic instruction based on current state

   **Handle states:**
   - If `state: "blocked"` (missing artifacts): show message, suggest using `/spectra:propose` to create the change artifacts first
   - If `state: "all_done"`: congratulate, suggest archive
   - Otherwise: proceed to implementation

4. **Read context files**

   Read the files listed in `contextFiles` from the apply instructions output.
   The files depend on the schema being used:
   - **spec-driven**: proposal, specs, design, tasks
   - Other schemas: follow the contextFiles from CLI output

5. **Check project preferences**

   Read `openspec/config.yaml` in the project root.
   If `tdd: true` is set, apply TDD discipline throughout implementation:
   - For each task, write a failing test FIRST, then implement to make it pass
   - Fetch TDD instructions by running `spectra instructions --skill tdd`, then follow the Red-Green-Refactor cycle
   - For bug fixes, reproduce the bug with a failing test before fixing

   If `audit: true` is set, apply sharp-edges discipline throughout implementation:
   - When designing APIs or interfaces, evaluate through 3 adversary lenses (Scoundrel, Lazy Developer, Confused Developer)
   - When adding configuration options, verify defaults are secure and zero/empty values are safe
   - When accepting parameters, check for type confusion and silent failures
   - Fetch audit instructions by running `spectra instructions --skill audit`, follow the discipline checklist (not the standalone 3-agent workflow)

   If `parallel_tasks: true` is set, check whether consecutive pending tasks have `[P]` markers (format: `- [ ] [P] Task description`). You SHALL dispatch consecutive `[P]` tasks as parallel agents. Only fall back to sequential when tasks have a data dependency (one task's output is another's input) or when tasks modify overlapping regions of the same file. Targeting the same file alone is NOT a reason to skip parallel dispatch — if the modified regions are disjoint, dispatch in parallel. If the environment does not support parallel execution, ignore `[P]` markers and execute tasks sequentially.

6. **Show current progress**

   Display:
   - Schema being used
   - Progress: "N/M tasks complete"
   - Remaining tasks overview
   - Dynamic instruction from CLI

7. **Implement tasks (loop until done or blocked)**

   **Reminder: Track progress by editing checkboxes in the tasks file only. Do not use any built-in task tracker.**

   For each pending task:
   - Show which task is being worked on
   - Make the code changes required
   - Keep changes minimal and focused
   - Mark task complete in the tasks file: `- [ ]` → `- [x]`
   - Continue to next task

   **Parallel task dispatch**: When consecutive `[P]`-marked tasks are found and `parallel_tasks: true` is configured (see Step 5), dispatch them as parallel agents in a single message. If any `[P]` task fails, pause and report.

   **Pause if:**
   - Task is unclear → ask for clarification
   - Implementation reveals a design issue → suggest updating artifacts
   - Error or blocker encountered → report and wait for guidance
   - User interrupts

8. **Final check**

   After completing all tasks, re-run:

   ```bash
   spectra instructions apply --change "<name>" --json
   ```

   Confirm `state: "all_done"`. If not, review remaining tasks and complete them.

9. **On completion or pause, show status**

   Display:
   - Tasks completed this session
   - Overall progress: "N/M tasks complete"
   - If all done: suggest archive
   - If paused: explain why and wait for guidance

**Output During Implementation**

```
## Implementing: <change-name> (schema: <schema-name>)

Working on task 3/7: <task description>
[...implementation happening...]
✓ Task complete

Working on task 4/7: <task description>
[...implementation happening...]
✓ Task complete
```

**Output On Completion**

```
## Implementation Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 7/7 tasks complete ✓

### Completed This Session
- [x] Task 1
- [x] Task 2
...

All tasks complete! You can archive this change with `/spectra:archive`.
```

**Output On Pause (Issue Encountered)**

```
## Implementation Paused

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 4/7 tasks complete

### Issue Encountered
<description of the issue>

**Options:**
1. <option 1>
2. <option 2>
3. Other approach

What would you like to do?
```

**Guardrails**

- Keep going through tasks until done or blocked
- Always read context files before starting (from the apply instructions output)
- If task is ambiguous, pause and ask before implementing
- If implementation reveals issues, pause and suggest artifact updates
- Keep code changes minimal and scoped to each task
- Update task checkbox immediately after completing each task
- Pause on errors, blockers, or unclear requirements - don't guess
- Use contextFiles from CLI output, don't assume specific file names
- **No external task tracking** — do not use any built-in task management, todo list, or progress tracking tool; the tasks file is the only system
- If **AskUserQuestion tool** is not available, ask the same questions as plain text and wait for the user's response

**Fluid Workflow Integration**

This skill supports the "actions on a change" model:

- **Can be invoked anytime**: Before all artifacts are done (if tasks exist), after partial implementation, interleaved with other actions
- **Allows artifact updates**: If implementation reveals design issues, suggest updating artifacts - not phase-locked, work fluidly
