#!/bin/bash
# Ralph Loop for opencode - iterates until PLAN.md tasks complete
# Usage: ./scripts/opencode-loop.sh [-m model] [max_iterations]
#
# Examples:
#   ./scripts/opencode-loop.sh                           # default model, 10 iterations
#   ./scripts/opencode-loop.sh 20                        # default model, 20 iterations
#   ./scripts/opencode-loop.sh -m anthropic/claude-sonnet-4-20250514 10
#   ./scripts/opencode-loop.sh -m openai/gpt-4o 5
#
# Based on Geoffrey Huntley's Ralph Wiggum technique:
# https://dev.to/sivarampg/the-ralph-wiggum-approach-running-ai-coding-agents-for-hours-not-minutes-57c1

set -e

cd "$(dirname "$0")/.."

# Parse arguments
MODEL=""
while getopts "m:" opt; do
  case $opt in
    m) MODEL="$OPTARG" ;;
    *) echo "Usage: $0 [-m model] [max_iterations]"; exit 1 ;;
  esac
done
shift $((OPTIND-1))

MAX_ITERATIONS=${1:-10}
ITERATION=0
PROMPT_FILE="PROMPT.md"

# Build opencode command
OPENCODE_CMD="opencode run"
if [ -n "$MODEL" ]; then
  OPENCODE_CMD="$OPENCODE_CMD -m $MODEL"
fi

# Create PROMPT.md if it doesn't exist
if [ ! -f "$PROMPT_FILE" ]; then
  cat > "$PROMPT_FILE" << 'EOF'
Read PLAN.md and continue working on the next incomplete task (marked with ⏳).

After completing a task:
1. Run `bun run tsc --noEmit` to verify no type errors
2. Update PLAN.md to mark the task as ✅
3. If all tasks are complete, say "ALL_TASKS_COMPLETE"

Current focus: Get the landing page rendering at localhost:3000/
EOF
  echo "Created $PROMPT_FILE - edit it to customize the task"
fi

echo "=== Ralph Loop for OpenCode ==="
echo "Plan: PLAN.md"
echo "Prompt: $PROMPT_FILE"
echo "Model: ${MODEL:-default}"
echo "Max iterations: $MAX_ITERATIONS"
echo ""

# Check if all tasks are complete
check_complete() {
  # No pending tasks (⏳) in PLAN.md means we're done
  if ! grep -q "⏳" PLAN.md 2>/dev/null; then
    return 0
  fi
  return 1
}

# Main loop
while [ $ITERATION -lt $MAX_ITERATIONS ]; do
  ITERATION=$((ITERATION + 1))
  echo ""
  echo "=== Iteration $ITERATION/$MAX_ITERATIONS ==="
  echo ""

  # Check if already complete
  if check_complete; then
    echo "All tasks complete!"
    exit 0
  fi

  # Show current status
  echo "Pending tasks:"
  grep "⏳" PLAN.md 2>/dev/null || echo "  (none found)"
  echo ""

  # Run opencode with the prompt
  # Uses 'opencode run' to execute non-interactively
  $OPENCODE_CMD "$(cat "$PROMPT_FILE")" 2>&1 || {
    echo "OpenCode exited with error, continuing..."
  }

  # Check for completion signal in output
  if check_complete; then
    echo ""
    echo "=== All tasks complete! ==="
    exit 0
  fi

  # Brief pause between iterations
  sleep 2
done

echo ""
echo "=== Max iterations ($MAX_ITERATIONS) reached ==="
echo "Remaining tasks:"
grep "⏳" PLAN.md 2>/dev/null || echo "  All done!"
exit 1
