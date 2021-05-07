'use strict'
import {expect, should, assert} from 'chai'
import {getWebSession, putWebSession} from '../../../src/handler/Handler'
import {s3Service} from '../../../src/service/S3Service'
import sinon from 'sinon'
import Q from 'q'
import { putWebSessionService } from '../../../src/functions/PutWebSessionService';
import { getWebSessionService } from '../../../src/functions/GetWebSessionService';

let sandbox

describe('Handler.js', () => {

    beforeEach(()=> {
        global.LOG_LEVEL = 'warn'
        sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('Test PUT valid', async () => {
        const mockServiceDeferred = Q.defer()
        const handlerDeferred = Q.defer()
        const expectedOKResponse = {
            statusCode: 201
        }
        sandbox.stub(putWebSessionService, 'put').returns(mockServiceDeferred.promise)
        mockServiceDeferred.resolve(expectedOKResponse)
        const event = { body:'{"data": {"valueOne": "test one"}}', "pathParameters" : {"webSessionId" : "1414c41c-2a2d-43bb-8140-a36c8b0338b2"} }
        const context = {}
        const callback = (context, response) => handlerDeferred.resolve(response)
        const expectedResponse = {
            statusCode: 201
        }
        
        putWebSession(event, context, callback)

        return handlerDeferred.promise.then((response) => {
            expect(response).to.eql(expectedResponse)
        })
    })

    it('Test PUT 400 error', async () => {
        const mockServiceDeferred = Q.defer()
        const handlerDeferred = Q.defer()
        const expectedBadResponse = {
            statusCode: 400, 
            body: 
            {
                code: "COMMON_JSON_SYNTAX_ERROR",
                details: {
                    invalid: "Web Session Id missing."
                },
                message: "The request body does not contain valid JSON"
            }
        }
        sandbox.stub(putWebSessionService, 'put').returns(mockServiceDeferred.promise)
        mockServiceDeferred.resolve(expectedBadResponse)
        const event = { "pathParameters": { "webSessionId": null } }
        const context = {}
        const callback = (context, response) => handlerDeferred.resolve(response)
        const expectedResponse = {
            statusCode: 400, 
            body: 
            {
                code: "COMMON_JSON_SYNTAX_ERROR",
                details: {
                    invalid: "Web Session Id missing."
                },
                message: "The request body does not contain valid JSON"
            }
        }
        
        putWebSession(event, context, callback)

        return handlerDeferred.promise.then((response) => {
            expect(response).to.eql(expectedResponse)
        })
    })

    it('Test PUT 500 error', async () => {
        const mockServiceDeferred = Q.defer()
        const handlerDeferred = Q.defer()
        sandbox.stub(putWebSessionService, 'put').returns(mockServiceDeferred.promise)
        mockServiceDeferred.reject()
        const event = {}
        const context = {}
        const callback = (context, response) => handlerDeferred.resolve(response)
        const expectedBody = {
            "code": "COMMON_SERVICE_ERROR",
            "message": "There was an unexpected server error while processing the request."
        }
        const expectedResponse = {
            statusCode: 500, 
            "headers": {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(expectedBody)
        }
        
        putWebSession(event, context, callback)

        return handlerDeferred.promise.then((response) => {
            expect(response).to.eql(expectedResponse)
        })
    })

    it('Test GET valid', async () => {
        const mockServiceDeferred = Q.defer()
        const handlerDeferred = Q.defer()
        const expectedOKResponse = {
            statusCode: 200, 
            body: 
            {
                name: 'Test Object'
            }
        }
        sandbox.stub(getWebSessionService, 'get').returns(mockServiceDeferred.promise)
        mockServiceDeferred.resolve(expectedOKResponse)
        const event = { "pathParameters": { "webSessionId": "1414c41c-2a2d-43bb-8140-a36c8b0338b2" } }
        const context = {}
        const callback = (context, response) => handlerDeferred.resolve(response)
        const expectedResponse = {
            statusCode: 200, 
            body: 
            {
                name: 'Test Object'
            }
        }
        
        getWebSession(event, context, callback)

        return handlerDeferred.promise.then((response) => {
            expect(response).to.eql(expectedResponse)
        })
    })

    it('Test GET 400 error', async () => {
        const mockServiceDeferred = Q.defer()
        const handlerDeferred = Q.defer()
        const expectedBadResponse = {
            statusCode: 400, 
            body: 
            {
                code: 'COMMON_JSON_SYNTAX_ERROR', 
                message: "The request body does not contain valid JSON",
                details:
                { 
                    invalid : "Request is missing body." 
                }
            }
        }
        sandbox.stub(putWebSessionService, 'put').returns(mockServiceDeferred.promise)
        mockServiceDeferred.resolve(expectedBadResponse)
        const event = { "pathParameters": {"webSessionId" : "1414c41c-2a2d-43bb-8140-a36c8b0338b2"} }
        const context = {}
        const callback = (context, response) => handlerDeferred.resolve(response)
        const expectedResponse = {
            statusCode: 400, 
            body: 
            {
                code: 'COMMON_JSON_SYNTAX_ERROR', 
                message: "The request body does not contain valid JSON",
                details:
                { 
                    invalid : "Request is missing body." 
                }
            }
        }
        
        putWebSession(event, context, callback)

        return handlerDeferred.promise.then((response) => {
            expect(response).to.eql(expectedResponse)
        })
    })

    it('Test GET 404 error', async () => {
        const mockServiceDeferred = Q.defer()
        const handlerDeferred = Q.defer()
        const expectedBadResponse = {
            statusCode: 404, 
            body: 
            {
                code: "COMMON_URL_NOT_FOUND",
                details: {
                    invalid: "S3Service: Unable to retreive 1414c41c-2a2d-43bb-8140-a36c8b0338b2 from S3."
                },
                message: "URL is not valid"
            }
        }
        sandbox.stub(putWebSessionService, 'put').returns(mockServiceDeferred.promise)
        mockServiceDeferred.resolve(expectedBadResponse)
        const event = { "pathParameters": {"webSessionId" : "1414c41c-2a2d-43bb-8140-a36c8b0338b2"} }
        const context = {}
        const callback = (context, response) => handlerDeferred.resolve(response)
        const expectedResponse = {
            statusCode: 404, 
            body: 
            {
                code: "COMMON_URL_NOT_FOUND",
                details: {
                    invalid: "S3Service: Unable to retreive 1414c41c-2a2d-43bb-8140-a36c8b0338b2 from S3."
                },
                message: "URL is not valid"
            }
        }
        
        putWebSession(event, context, callback)

        return handlerDeferred.promise.then((response) => {
            expect(response).to.eql(expectedResponse)
        })
    })

    it('Test PUT 500 error', async () => {
        const mockServiceDeferred = Q.defer()
        const handlerDeferred = Q.defer()
        sandbox.stub(getWebSessionService, 'get').returns(mockServiceDeferred.promise)
        mockServiceDeferred.reject()
        const event = {}
        const context = {}
        const callback = (context, response) => handlerDeferred.resolve(response)
        const expectedBody = {
            "code": "COMMON_SERVICE_ERROR",
            "message": "There was an unexpected server error while processing the request."
        }
        const expectedResponse = {
            statusCode: 500, 
            "headers": {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(expectedBody)
        }
        
        getWebSession(event, context, callback)

        return handlerDeferred.promise.then((response) => {
            expect(response).to.eql(expectedResponse)
        })
    })
})