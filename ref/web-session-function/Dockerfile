
FROM node:8.9.4-alpine

RUN apk add --no-cache \
    bash \
    curl

RUN yarn --version
RUN yarn global add serverless serverless-offline serverless-webpack serverless-s3-local serverless-aws-alias

RUN mkdir /repo
WORKDIR /repo
