'use strict'
module.exports = require('apickli/apickli-gherkin');

const { Given, Then } = require('cucumber')
const apickli = require('apickli');
const { expect } = require('chai')

Given('the application host is on {string}', function (hostname) {
  this.hostname = hostname;
});

Given('the port is {string}', function (port) {
  this.port = port;
});

Given('the protocol is {string}', function (protocol) {
  this.protocol = protocol;
});

Given('the application is running', function () {
  this.apickli = new apickli.Apickli(this.protocol, `${this.hostname}:${this.port}`);
  this.apickli.addRequestHeader('Cache-Control', 'no-cache');
});

Given('I set body to', function (bodyValue) {
  this.apickli.setRequestBody(bodyValue);
});

Then('response body is', function (expectedBodyString) {
  const expected = JSON.parse(expectedBodyString)
  const actual = JSON.parse(this.apickli.getResponseObject().body)
  return expect(actual).to.eql(expected)
});

Then('response header has a content type of {string}', function (expectedContentType) {
  const actual = JSON.stringify(this.apickli.getResponseObject().headers)
  const expected = "\"content-type\":\"" + expectedContentType + "\""
  return expect(actual).to.include(expected)
});
