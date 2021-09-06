#!/usr/bin/env sh

############################################################
# MEVN Builder Example
# > Example build script
# > Meant to be run in a deployment environment
#
# Outcomes:
# - Client and Server Dependencies Installed
# - Client built - output to dist/ for access from
#   the express server
#
# Areas of Improvement:
# - We don't need to keep the entire client/ dir around
#   after we built, this would be much better handled via
#   some artifact management solution.
# - A container solution is the more modern approach to this
#   hoever this is meant to be a starting point and should
#   pigeonhole the implementer to a single solution
############################################################

# Error Out
set -e

CLIENT_INSTALL_CMD='npm ci --prefix client'
CLIENT_BUILD_CMD='npm run build:client'

SERVER_INSTALL_CMD='npm ci'

echo ">>> Installing client dependencies..."
echo ">>> $CLIENT_INSTALL_CMD"
$CLIENT_INSTALL_CMD
echo ">>> Client dependencies installed."

echo ">>> Installing server dependencies..."
echo ">>> $SERVER_INSTALL_CMD"
$SERVER_INSTALL_CMD
echo ">>> Server dependencies installed."

echo ">>> Compiling client application..."
echo ">>> $CLIENT_BUILD_CMD"
$CLIENT_BUILD_CMD
echo ">>> Client application built."

echo ">>> Application can be run via:"
echo ">>> node src/index.js"
echo ""

echo ">>> Information on best practices running an"
echo ">>> Express application in prodcution can be found:"
echo ">>> http://expressjs.com/en/advanced/best-practice-performance.html"