#!/usr/bin/env bash
set -e

function cf_invalidate() {
  local CLOUDFRONT_INVALIDATION_PATTERN="$1"
  local CHALK="`yarn bin`/chalk"
  $CHALK --no-stdin -t "{blue Creating CloudFront invalidation for distribution '$CLOUDFRONT_DISTRIBUTION' and pattern '$CLOUDFRONT_INVALIDATION_PATTERN'}"

  AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
  AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
  cf-invalidate \
  -- \
  $CLOUDFRONT_DISTRIBUTION \
  "$CLOUDFRONT_INVALIDATION_PATTERN"

  $CHALK --no-stdin -t "{blue Invalidation created successfully!}"
}
