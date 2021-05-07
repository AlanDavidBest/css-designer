#!/bin/bash

yarn
sls deploy -v --alias staging
sleep 10s
sls info -v > deploy_staging.log
