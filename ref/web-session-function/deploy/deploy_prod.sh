#!/bin/bash

yarn
sls deploy -v --alias prod
sleep 10s
sls info -v
