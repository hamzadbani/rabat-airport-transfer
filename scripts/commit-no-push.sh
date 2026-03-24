#!/usr/bin/env bash
# Commit all changes without pushing. Usage: npm run commit [-- -m "message"]
set -e
git add -A
git commit "$@"
