#!/usr/bin/env sh

############################################################
# MEVN Setup Helper
# > Help get your development environment up and running 
# > faster
#
# This is not super well tested and might not work perefectly
# however the setup is completely doable by hand.
#
# Outcomes:
# - check node version
# - install deps
# - copy env files
# - update readme name
# - update package name
############################################################

MINIMUM_NODE_VERSION="v14.17.4"
MINIMUM_NPM_VERSION="5"

check_util() {
  $1 --version >> /dev/null 2>&1

  if [ $? -ne 0 ]; then
    echo ">>> $1 not installed."
    echo ">>> Recommended to use nvm."
    echo ">>> https://github.com/nvm-sh/nvm#readme"
    exit 1
  fi
}

echo '
******************************************************
*    __    __     ______     __   __   __   __       *
*   /\ "-./  \   /\  ___\   /\ \ / /  /\ "-.\ \      *
*   \ \ \-./\ \  \ \  __\   \ \ \ /   \ \ \-.  \     *
*    \ \_\ \ \_\  \ \_____\  \ \__|    \ \_\\"\ _\    *
*     \/_/  \/_/   \/_____/   \/_/      \/_/ \/_/    *
*                                                    *
******************************************************
'

echo ">>> Checking Environment..."

check_util node &> /dev/null
check_util npm &> /dev/null

echo ">>> Welcome to the MEVN Setup Script!"
echo ">>> This will walk you through the following:
>>>  - Checking your Node Version
>>>  - Installing Dependencies
>>>  - Setting up env files
>>>  - Updating the package.json

>>> If you'd rather do these by hand feel free to exit
>>> this script and carry on.
"

read -p 'What is your projects name? (default "MEVN Stack") : ' PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then PROJECT_NAME="MEVN STACK"; else echo "Awesome, we'll use '$PROJECT_NAME'"; fi

CURRENT_NODE_VERSION=$(node -v &> /dev/null) 
CURRENT_NPM_VERSION=$(npm -v &> /dev/null) 

echo ">>> Using Node $CURRENT_NODE_VERSION with npm $CURRENT_NPM_VERSION"

if [ "$CURRENT_NODE_VERSION" \< "$MINIMUM_NODE_VERSION" ]; then
  echo ">>> $CURRENT_NODE_VERSION if lower than the recommended"
  echo ">>> minimum version of $MINIMUM_NODE_VERSION."
  exit 1
fi

if [ "$CURRENT_NPM_VERSION" \< "$MINIMUM_NPM_VERSION" ]; then
  echo ">>> $CURRENT_NPM_VERSION if lower than the recommended"
  echo ">>> minimum version of $MINIMUM_NPM_VERSION."
  exit 1
fi

echo ">>> Installing dependencies..."
npm ci
npm ci --prefix client/
echo ">>> Dependencies installed."

echo ">>> Copying example env files..."
cp .env.example .env
echo ">>> Env file setup."

echo ">>> Updating 'name' field of package.json"
sed -i s/"mevn"/${PROJECT_NAME}/ package.json
echo ">>> package.json updated."