---
name: spectra-discuss
description: "Have a focused discussion about a topic and reach a conclusion"
license: MIT
compatibility: Requires openspec CLI.
metadata:
  author: spectra
  version: "1.0"
  generatedBy: "Spectra"
---

Have a focused discussion about a topic and reach a conclusion.

**IMPORTANT: Discuss mode is for thinking, not implementing.** You may read files, search code, and investigate the codebase, but you must NEVER write code or implement features. If the user asks you to implement something, remind them to exit discuss mode first (e.g., start a change with `/spectra:propose`). You MAY create OpenSpec artifacts (proposals, designs, specs) if the user asks—that's capturing thinking, not implementing.

**This is a task-oriented discussion.** Every discussion has a topic, works toward a goal, and ends with a clear conclusion. Unlike open-ended exploration, discuss mode converges.

**Input**: The argument after `/spectra:discuss` is the topic. Could be:

- A design question: "should we use WebSockets or SSE?"
- A problem to solve: "the auth system is getting unwieldy"
- A change name: "add-dark-mode" (discuss in context of that change)
- An architecture decision: "how to structure the plugin system"
- A vague idea that needs sharpening: "real-time collaboration"

---

## How to Discuss

**One question at a time.** Don't dump a list of 10 questions. Ask the most important one, listen, then follow up. Let the conversation breathe.

**Propose concrete options.** When exploring approaches, present 2-3 specific options with trade-offs — not abstract possibilities. Use comparison tables when helpful:

```
| Approach      | Pros              | Cons              |
|---------------|-------------------|-------------------|
| WebSockets    | Real-time, bidir  | Complex, stateful |
| SSE           | Simple, HTTP      | One-way only      |
| Polling       | Simplest          | Latency, waste    |
```

**Ground in reality.** Investigate the actual codebase when relevant. Map existing architecture, find integration points, surface hidden complexity. Don't just theorize.

**Visualize freely.** Use ASCII diagrams when they clarify thinking:

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Client  │────▶│  Server  │────▶│    DB    │
└──────────┘     └──────────┘     └──────────┘
```

System diagrams, state machines, data flows, dependency graphs — whatever helps.

**Challenge assumptions.** Including the user's and your own. Ask "do we actually need this?" Apply YAGNI — the simplest solution that works is often the best.

**Be direct.** If you have a recommendation, say it. Don't hedge endlessly. "I'd go with option B because..." is more useful than "all options have merit."

---

## Convergence

Discussions must converge. As the conversation progresses:

1. **Narrow the options** — eliminate approaches that don't fit
2. **Surface the key trade-off** — most decisions come down to one fundamental tension
3. **Make a recommendation** — or help the user make one
4. **State the conclusion clearly** — what was decided, and why

The conclusion should be one of:

- **Design decision**: "We'll use SSE because one-way is sufficient and it's simpler"
- **Direction consensus**: "The auth refactor should split into gateway + provider"
- **Next-step recommendation**: "We need to spike the plugin API first to validate the approach"
- **Explicit deferral**: "We don't have enough info yet. Specifically, we need to know X before deciding"

---

## OpenSpec Awareness

You have full context of the OpenSpec system. Use it naturally.

### Check for context

At the start, quickly check what exists:

```bash
spectra list --json
```

If the user mentioned a specific change name, read its artifacts for context.

### Capture decisions

When decisions are made during discussion, offer to capture them:

| Insight Type               | Where to Capture             |
| -------------------------- | ---------------------------- |
| New requirement discovered | `specs/<capability>/spec.md` |
| Design decision made       | `design.md`                  |
| Scope changed              | `proposal.md`                |
| New work identified        | `tasks.md`                   |

Offer once, then move on. Don't pressure.

### Transition to action

When the discussion converges on building something:

- "Ready to formalize this? `/spectra:propose`"
- Or capture the decision in existing artifacts and continue

---

## Guardrails

- **Don't implement** — Never write code or implement features. Creating OpenSpec artifacts is fine, writing application code is not.
- **Don't leave without a conclusion** — If the user tries to end without a conclusion, summarize where things stand and state what's unresolved.
- **Don't fake understanding** — If something is unclear, dig deeper.
- **Don't overwhelm** — One question at a time, not a barrage.
- **Don't over-engineer** — Challenge complexity. Prefer simpler solutions.
- **Do visualize** — A good diagram is worth many paragraphs.
- **Do explore the codebase** — Ground discussions in reality.
- **Do be opinionated** — Have a recommendation. The user can disagree.
