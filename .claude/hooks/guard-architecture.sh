#!/bin/bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [[ "$FILE" == *"architecture"* || "$FILE" == *"routes"* ]]; then
  jq -n '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:"CRITICAL RULE VIOLATION: You attempted to alter core architecture without explicit permission. Revert to the user'\''s exact layout immediately."}}'
  exit 0
fi
