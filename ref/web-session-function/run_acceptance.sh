#!/bin/bash
#
# This script is used to run the acceptance tests against the serverless local stack
echo "Starting Serverless Application"

yarn

nohup yarn start > /dev/null 2>&1 &

# Wait for service to start; this is an invalid request which should always return 400 when service is running
RETRY=40
INCREMENT=0
httpStatusCode=500
until [ "$httpStatusCode" -eq 400 ]
do
# Add timeout to exit after N seconds/iterations
    printf '.'
    ((INCREMENT++))
    sleep 1
    httpStatusCode=$(curl --output /dev/null --silent http://localhost:3000/global/web-session/v1/14 --write-out "%{http_code}")
    if [ $INCREMENT -ge $RETRY ]; then echo "WEB SESSION RETRY EXCEEDED" && exit 1; fi;
done

# Execute Acceptance Tests
yarn cucumber

# Capture the PID of the serverless process
read pid <<< $(ps | grep ".bin/serverless offline" | grep -v grep | awk '{print $1}')

# Kill the serverless process
echo "Tearing down Serverless Application [" $pid "]"
kill $pid

