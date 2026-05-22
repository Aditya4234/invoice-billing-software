#!/bin/sh
set -e

echo "Waiting for MongoDB..."
echo "Connection string: $MONGODB_URI"

# Wait for MongoDB to be ready
for i in $(seq 1 30); do
  if node -e "
    const mongoose = require('mongoose');
    mongoose.connect('$MONGODB_URI', { serverSelectionTimeoutMS: 3000 })
      .then(() => { console.log('MongoDB ready'); process.exit(0); })
      .catch(() => process.exit(1));
  " 2>/dev/null; then
    break
  fi
  echo "Waiting for MongoDB... attempt $i"
  sleep 2
done

echo "Running database seed..."
node dist/seed.js || echo "Seed script failed (server will auto-seed on startup)"

echo "Starting server..."
exec node dist/index.js
