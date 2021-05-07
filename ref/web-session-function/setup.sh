#!/bin/bash
#
# This setup file is used to install/use the correct Node.js versions
#
nodeVersion=8.9.4
set -e

if [ -f ~/.nvm/nvm.sh ]; then
    echo "sourcing ~/nvm.sh"
  . ~/.nvm/nvm.sh
fi

if [ -d /opt/nvm ]; then
    echo "sourcing /opt/nvm/nvm.sh"
  . /opt/nvm/nvm.sh
fi

nvm install $nodeVersion
nvm use $nodeVersion
npm config set registry http://registry.npmjs.org/
npm config set strict-ssl false
npm install -g yarn

yarn global add serverless serverless-offline

yarn
