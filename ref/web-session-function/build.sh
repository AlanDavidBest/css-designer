#!/bin/bash
#
# This script is meant to be called from a Jenkins build job to run the unit and acceptance tests
#
docker build -t web-session-service .
docker run --rm --mount src="$(pwd)",target=/repo/,type=bind -e NODE_ENV=development -e AWS_ACCESS_KEY_ID=DummyId -e AWS_SECRET_ACCESS_KEY=DummySecretKey web-session-service ./ci/run_tests.sh
docker rmi web-session-service
