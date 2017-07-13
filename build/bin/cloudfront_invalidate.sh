#!/usr/bin/env bash
set -e

CLOUDFRONT_INVALIDATION_PATTERN="/$CDN_URL_SCOPE/*"


echo "Invalidating CloudFront cache for distribution '$CLOUDFRONT_DISTRIBUTION' and pattern '$CLOUDFRONT_INVALIDATION_PATTERN'"

AWS_ACCESS_KEY_ID="$AWS_ACCESS_KEY" \
AWS_SECRET_ACCESS_KEY="$AWS_SECRET_KEY" \
cf-invalidate \
--wait \
-- \
$CLOUDFRONT_DISTRIBUTION \
"$CLOUDFRONT_INVALIDATION_PATTERN"

echo "Invalidation successful!"
