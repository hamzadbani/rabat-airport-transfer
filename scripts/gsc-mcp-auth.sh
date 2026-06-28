#!/usr/bin/env bash
# One-time Google Search Console OAuth for Cursor MCP.
set -euo pipefail

CONFIG_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/mcp-google-search-console"
OAUTH_FILE="$CONFIG_DIR/oauth_credentials.json"

mkdir -p "$CONFIG_DIR"

if [[ ! -f "$OAUTH_FILE" ]]; then
  echo "Missing OAuth client JSON."
  echo ""
  echo "1. Google Cloud Console → Credentials → OAuth Desktop app → Download JSON"
  echo "2. Save it as:"
  echo "   $OAUTH_FILE"
  echo ""
  echo "Or run:"
  echo "   cp ~/Downloads/client_secret_*.json \"$OAUTH_FILE\""
  exit 1
fi

echo "Opening browser for Search Console read-only access..."
uvx mcp-google-search-console auth

echo ""
echo "Done. Restart Cursor, then ask Agent about https://taxirabatairoport.com/"
