---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review, or use the local cached reference if offline:

- Remote URL: `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`
- Local Cache / Fallback: `references/web-interface-guidelines.md`

Use WebFetch or view the local `references/web-interface-guidelines.md` file to retrieve the latest rules. The rules cover layout, typography, touch targets, accessibility, focus states, and performance. Do not state an audit is complete if the guidelines document has not been read.

## Usage

### 1. Planning & Documentation Phase
- Review UI acceptance criteria, accessibility gates, and test plans against the Web Interface Guidelines.
- Ensure all interactive elements specify keyboard navigability, focus styling, proper touch targets (min 44px), and semantic tags.

### 2. Implementation Phase
When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above or read `references/web-interface-guidelines.md`
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the terse `file:line: issue description` format specified in the guidelines

If no files specified, ask the user which files to review.
