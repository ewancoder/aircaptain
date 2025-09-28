#!/usr/bin/env bash
# This script will read secrets.env file and export all variables.

set -euo pipefail

# This file should exist, otherwise it should fail.
# Export all environment variables from this file.
set -a
. /run/secrets/secrets.env
set +a

# Execute the original Dockerfile CMD
exec "$@"
