#!/bin/bash
set -e

MANIFEST="src/manifest.json"
DIST_DIR="dist"
BUMP="${1:-patch}"

# Read current version
CURRENT=$(jq -r '.version' "$MANIFEST")
IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT"

case "$BUMP" in
  major) MAJOR=$((MAJOR + 1)); MINOR=0; PATCH=0 ;;
  minor) MINOR=$((MINOR + 1)); PATCH=0 ;;
  patch) PATCH=$((PATCH + 1)) ;;
  *) echo "Usage: $0 [major|minor|patch]"; exit 1 ;;
esac

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
echo "$CURRENT → $NEW_VERSION"

# Update manifest
jq --arg v "$NEW_VERSION" '.version = $v' "$MANIFEST" > "$MANIFEST.tmp" && mv "$MANIFEST.tmp" "$MANIFEST"

# Create archive
mkdir -p "$DIST_DIR"
ZIP="$DIST_DIR/v$NEW_VERSION.zip"
rm -f "$ZIP"
(cd src && zip -r "../$ZIP" . --exclude "*.zip" --exclude "*.DS_Store")

echo "Created $ZIP"
