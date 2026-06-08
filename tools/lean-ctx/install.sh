#!/usr/bin/env bash
set -euo pipefail

# LeanCTX installer helper.
# Source: https://github.com/yvgude/lean-ctx
# Prefer package-manager based installs over piping remote scripts into a shell.

if command -v lean-ctx >/dev/null 2>&1; then
  lean-ctx --version
  exit 0
fi

attempted=0

if command -v brew >/dev/null 2>&1; then
  attempted=1
  if brew tap yvgude/lean-ctx && brew install lean-ctx; then
    lean-ctx --version
    exit 0
  fi
fi

if command -v npm >/dev/null 2>&1; then
  attempted=1
  if npm install -g lean-ctx-bin; then
    lean-ctx --version
    exit 0
  fi
fi

if command -v cargo >/dev/null 2>&1; then
  attempted=1
  if cargo install lean-ctx; then
    lean-ctx --version
    exit 0
  fi
fi

if [[ "$attempted" -eq 0 ]]; then
  echo "No supported installer found. Install Homebrew, npm, or Rust/Cargo first." >&2
else
  echo "All available lean-ctx install methods failed." >&2
fi

echo "See https://github.com/yvgude/lean-ctx for release artifacts and manual install options." >&2
exit 1
