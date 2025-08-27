#!/bin/bash
set -e

# Configuration
S3_BUCKET_NAME=${S3_BUCKET_NAME:?Error: S3_BUCKET_NAME is required}
S3_KEY=${S3_KEY:?Error: S3_KEY is required}
CLOUDFRONT_DISTRIBUTION_ID=${CLOUDFRONT_DISTRIBUTION_ID:-"E1BJPACL4CSRN7"}
VITE_API_URL=${VITE_API_URL:-""}

# Ensure S3_KEY doesn't have leading or trailing slashes
S3_KEY=$(echo "$S3_KEY" | sed 's:^/*::' | sed 's:/*$::')

echo "🚀 Starting deployment to S3 bucket: $S3_BUCKET_NAME/$S3_KEY"
if [ -n "$VITE_API_URL" ]; then
  echo "🔗 Using API URL: $VITE_API_URL"
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build the application with base path
echo "🔨 Building application..."
if [ -n "$S3_KEY" ]; then
  # Set base path for Vite build when deploying to a subdirectory
  PUBLIC_URL="/$S3_KEY/" VITE_API_URL="$VITE_API_URL" pnpm build -- --base="/$S3_KEY/"
else
  VITE_API_URL="$VITE_API_URL" pnpm build
fi

# Sync to S3
echo "☁️  Uploading to S3..."
aws s3 sync dist s3://$S3_BUCKET_NAME/$S3_KEY/ \
  --delete \
  --cache-control max-age=31536000,public \
  --exclude index.html

# Upload index.html with no-cache headers
aws s3 cp dist/index.html s3://$S3_BUCKET_NAME/$S3_KEY/index.html \
  --cache-control max-age=0,no-cache,no-store,must-revalidate

# Invalidate CloudFront if configured
if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "🔄 Creating CloudFront invalidation..."
  aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/$S3_KEY/index.html" "/$S3_KEY/" "/$S3_KEY/*" \
    --query 'Invalidation.Id' \
    --output text
fi

echo "✅ Deployment complete! Available at CloudFront distribution: $CLOUDFRONT_DISTRIBUTION_ID/$S3_KEY/"
