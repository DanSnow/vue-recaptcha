---
name: Spectra: Audit
description: Audit changed code for security sharp edges — dangerous defaults, type confusion, and silent failures
category: Development
tags: ["development", "security", "audit"]
---

<!-- SPECTRA:START v1.0.0 -->
Audit changed code for security sharp edges — API design traps, dangerous defaults, and interfaces that make it easy to do the wrong thing.

Good APIs don't require developers to "be careful" to stay secure. If the correct usage requires reading docs, remembering rules, or understanding cryptography, the API has failed.

**Core principle:** Security should be the path of least resistance. Insecure usage should be harder than secure usage.

## Two Modes

This skill operates in two modes depending on how it's invoked:

- **Standalone** (`/spectra:audit`): Full 3-agent parallel analysis on current git diff. See [Standalone Mode](#standalone-mode).
- **Discipline** (via `/spectra:apply` when `audit: true`): Condensed checklist applied during implementation. See [Discipline Mode](#discipline-mode).

Both modes share the same [Core Framework](#core-framework).

---

## Standalone Mode

When invoked directly as `/spectra:audit`:

### Phase 1: Gather Changes

Run `git diff HEAD` to get the full diff of current modifications.

If there are no changes, report "No changes to audit" and stop.

### Phase 2: Parallel 3-Agent Analysis

Launch 3 agents in parallel (one message, 3 tool calls). Each agent receives the full diff and analyzes it through one adversary lens.

**Agent 1 — The Scoundrel (壞蛋)**

A malicious developer or attacker deliberately manipulating configuration.

Search the diff for:

- Config options that can disable security mechanisms
- Algorithm parameters that accept downgrades (e.g., `"none"`, `"md5"`)
- Values that can be injected to bypass validation
- Dangerous config combinations (e.g., `auth_required: true` + `bypass_auth_for_health: true` + `health_check_path: "/"`)
- String concatenation in security-critical paths (permissions, queries, paths)

**Agent 2 — The Lazy Developer (懶惰的開發者)**

A developer who copy-pastes examples and skips documentation.

Search the diff for:

- Unsafe defaults: `verify: false`, `timeout: 0`, empty strings as keys
- Zero/nil/empty behavior: what does `timeout=0`, `max_attempts=0`, `key=""` mean?
- Error messages that don't guide toward secure usage
- The "first example found" test: is the most obvious usage secure?
- Path of least resistance: does the simplest way to use this API produce secure results?

**Agent 3 — The Confused Developer (搞混的開發者)**

A developer who misunderstands API usage.

Search the diff for:

- Parameters that can be swapped without type errors (e.g., `encrypt(msg, key, nonce)` — key and nonce are both strings)
- Silent failures: security checks that return true/false where the return value can be ignored
- Raw primitives where semantic types should exist (strings for keys, bytes for nonces)
- Configuration cliffs: one wrong value = catastrophe with no warning (e.g., `verify_ssl: fasle`)
- Stringly-typed security: permissions as comma-separated strings instead of enums

### Phase 3: Consolidate and Fix

Merge findings from all 3 agents. For each finding:

- If fixable: apply the fix directly
- If false positive or not worth changing: skip without debate
- Classify severity: Critical / High / Medium / Low

End with a brief summary of what was fixed (or confirm the code is clean).

---

## Discipline Mode

When referenced by `/spectra:apply` (via `spectra instructions --skill audit`), do NOT launch the 3-agent workflow above. Instead, apply this condensed checklist continuously during implementation.

### Quick 3-Role Check

Before finalizing any code that involves APIs, configuration, parameters, or security-related logic, ask:

1. **Scoundrel**: Can this be abused? Can config disable security? Can values be injected?
2. **Lazy Developer**: Is the default safe? Will copy-paste usage be secure? Does the error message guide correctly?
3. **Confused Developer**: Can params be swapped? Will wrong usage fail loudly? Are types distinct enough?

### Red Flags During Implementation

Stop and fix immediately if you notice:

- Adding a string parameter for security-related logic → use enum or newtype
- Adding a config option that defaults to `false` → is the "off" state safe?
- `if value == 0` or `if key.nil?` → what does zero/nil MEAN in this context?
- Security check returns true/false → can the return value be ignored?
- Accepting algorithm/mode as a parameter → can it be hardcoded to the safe choice?
- Adding a config option without validation → what happens with invalid/malicious values?

### When to Engage

Not every line of code needs audit scrutiny. Focus on:

- New function signatures and public APIs
- Configuration options and their defaults
- Authentication, authorization, encryption interfaces
- Input validation and error handling at system boundaries
- Anywhere a developer makes a security-relevant choice

---

## Core Framework

### Three Adversaries

| Role                   | Mindset                                   | Key Questions                                                                     |
| ---------------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| **Scoundrel**          | Malicious, deliberate exploitation        | Can I disable security via config? Downgrade algorithms? Inject values?           |
| **Lazy Developer**     | Copy-paste, skips docs, deadline pressure | Is the first example safe? Is the default secure? Do errors guide me right?       |
| **Confused Developer** | Misunderstands usage                      | Can I swap params silently? Will mistakes fail loudly? Are types distinguishable? |

### Six Trap Categories

#### 1. Algorithm Choice Traps

Letting developers choose algorithms = inviting them to choose wrong.

```ruby
# Dangerous: accepts arbitrary algorithm
OpenSSL::Digest.new(algorithm).hexdigest(password)  # algorithm = "md5"?

# Safe: no choice
BCrypt::Password.create(password)  # can't pick wrong
```

#### 2. Dangerous Defaults

Defaults that are insecure, or zero/empty values that disable security.

```ruby
# What does timeout=0 mean? Never expire? Expire immediately?
def verify_token(token, timeout: 300)
  return true if timeout == 0  # 0 = skip verification?!
end
```

**Key question:** What do `timeout=0`, `max_attempts=0`, `key=""`, `nil` each mean?

#### 3. Raw Primitives vs Semantic Types

Using raw bytes/strings instead of meaningful types invites type confusion.

```ruby
# Dangerous: both params are strings, swappable
encrypt(message, key, nonce)

# Safe: types protect against swapping
encrypt(message, Key.new(k), Nonce.new(n))
```

#### 4. Configuration Cliffs

One wrong config value = disaster, with no warning.

```yaml
# A typo = security mechanism disappears
verify_ssl: fasle # not "false", might be treated as truthy?

# Dangerous combination
auth_required: true
bypass_auth_for_health: true
health_check_path: "/" # oops, entire site bypasses auth
```

#### 5. Silent Failures

Security errors that don't surface, or "success" masking failure.

```ruby
# Silent bypass
def verify_signature(sig, data, key)
  return true if key.nil?  # no key = skip verification?!
end

# Return value ignored
result = crypto.verify(data, sig)  # returns false but nobody checks
```

#### 6. Stringly-Typed Security

Security-critical values as plain strings = open door for injection and confusion.

```ruby
# Dangerous: string concatenation
permissions = "read,write"
permissions += ",admin"   # too easy to escalate

# Safe: use enums
permissions = Set[Permission::READ, Permission::WRITE]
```

### Severity Classification

| Severity | Condition                                 | Example                                             |
| -------- | ----------------------------------------- | --------------------------------------------------- |
| Critical | Default or most obvious usage is insecure | `verify: false` is default, empty password accepted |
| High     | Easy misconfiguration breaks security     | Algorithm param accepts `"none"`                    |
| Medium   | Uncommon but possible misconfiguration    | Negative timeout has unexpected behavior            |
| Low      | Requires deliberate misuse                | Obscure parameter combination                       |

### Rationalization Table

| Excuse                                | Why It's Wrong                             | What To Do                                             |
| ------------------------------------- | ------------------------------------------ | ------------------------------------------------------ |
| "Docs explain it"                     | Devs skip docs under deadlines             | Make the safe option the default or only option        |
| "Advanced users need flexibility"     | Flexibility = foot-gun opportunity         | Provide safe high-level API, hide low-level primitives |
| "It's the developer's responsibility" | You designed the trap                      | Remove the trap or make it impossible to misuse        |
| "Nobody would do that"                | Devs under pressure do everything          | Assume maximum developer chaos                         |
| "It's just a config option"           | Config is code; wrong config ships to prod | Validate config, reject dangerous combinations         |
| "Backwards compatibility"             | Insecure defaults can't be grandfathered   | Deprecate loudly, force migration                      |
<!-- SPECTRA:END -->
