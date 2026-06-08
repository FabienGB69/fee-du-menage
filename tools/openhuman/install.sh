#!/usr/bin/env bash
set -euo pipefail

# OpenHuman desktop installer helper.
# Source: https://github.com/tinyhumansai/openhuman
# Preferred paths use native package managers/signing chains instead of piping
# remote shell scripts directly into bash.

OS="$(uname -s | tr '[:upper:]' '[:lower:]')"

case "$OS" in
  darwin)
    if ! command -v brew >/dev/null 2>&1; then
      echo "Homebrew is required for the recommended macOS install path." >&2
      echo "Install Homebrew first, then re-run: npm run openhuman:install" >&2
      exit 1
    fi
    brew tap tinyhumansai/core
    brew install openhuman
    ;;
  linux)
    if ! command -v apt-get >/dev/null 2>&1; then
      echo "This helper currently supports Debian/Ubuntu via apt." >&2
      echo "For other Linux distributions, download an artifact from the OpenHuman releases page." >&2
      exit 1
    fi

    if [[ "${EUID}" -ne 0 ]]; then
      if ! command -v sudo >/dev/null 2>&1; then
        echo "sudo is required to configure the signed OpenHuman apt repository." >&2
        exit 1
      fi
      SUDO="sudo"
    else
      SUDO=""
    fi

    ${SUDO} apt-get update
    ${SUDO} apt-get install -y --no-install-recommends gnupg2 curl ca-certificates
    ${SUDO} install -d -m 0755 /etc/apt/keyrings
    curl -fsSL https://tinyhumansai.github.io/openhuman/apt/KEY.gpg \
      | ${SUDO} gpg --dearmor -o /etc/apt/keyrings/openhuman.gpg
    echo "deb [signed-by=/etc/apt/keyrings/openhuman.gpg arch=amd64] https://tinyhumansai.github.io/openhuman/apt stable main" \
      | ${SUDO} tee /etc/apt/sources.list.d/openhuman.list >/dev/null
    ${SUDO} apt-get update
    ${SUDO} apt-get install -y openhuman
    ;;
  *)
    echo "Unsupported OS: $OS" >&2
    echo "On Windows, install the signed MSI from the latest OpenHuman release." >&2
    exit 1
    ;;
esac
