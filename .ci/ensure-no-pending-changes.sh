#!/bin/sh
changes="$(git status --porcelain)"
if [ -z "$changes" ]; then
  echo "✅ No unstaged changes"
  exit 0
fi
echo "❌ There are unstaged changes"
echo "$changes"
exit 1
