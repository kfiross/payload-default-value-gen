#!/usr/bin/env bash

# Get the package version from package.json
PACKAGE_VERSION=$(node -p -e "require('./package.json').version || ''")

# Check if PACKAGE_VERSION is empty
if [ -z "$PACKAGE_VERSION" ]; then
  echo "Error: Failed to retrieve version from package.json"
  exit 1
fi

# Run git-cliff with the correct tag
bun x git-cliff -o './CHANGELOG.md' --tag "$PACKAGE_VERSION"
