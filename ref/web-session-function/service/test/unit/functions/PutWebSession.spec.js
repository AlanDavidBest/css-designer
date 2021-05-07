'use strict'
import { expect } from 'chai'
import { putWebSessionService } from '../../../src/functions/PutWebSessionService'
import { s3Service } from '../../../src/service/S3Service'
import sinon from 'sinon'
import Q from 'q'

let sandbox

describe('PutWebSession.js', () => {

    beforeEach(() => {
        global.LOG_LEVEL = 'warn'
        sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('Test valid PUT', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        sandbox.stub(s3Service, 'addToS3').returns(defferred.promise)
        const event = { body: '{"data": {"valueOne": "test one"}}', "pathParameters": { "webSessionId": "1414c41c-2a2d-43bb-8140-a36c8b0338b2" } }
        const expectedResponse = {
            statusCode: 201
        }
        defferred.resolve(testData)

        const result = await putWebSessionService.put(event)
        
        expect(result).to.eql(expectedResponse)
    })

    it('Test PUT with missing body', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        sandbox.stub(s3Service, 'addToS3').returns(defferred.promise)
        const event = { "pathParameters": { "webSessionId": "1414c41c-2a2d-43bb-8140-a36c8b0338b2" } }
        const expectedBody = {
            "code": "COMMON_JSON_SYNTAX_ERROR",
            "message": "The request body does not contain valid JSON",
            "details": {
                "invalid": "Request is missing body."
            }
        }
        const expectedResponse = {
            statusCode: 400, 
            "headers": {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(expectedBody)
        }
        defferred.resolve(testData)

        const result = await putWebSessionService.put(event)
        
        expect(result).to.eql(expectedResponse)
    })

    it('Test PUT with invalid body', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        sandbox.stub(s3Service, 'addToS3').returns(defferred.promise)
        const event = { body: '{"data": {"valueOnetest one"}}', "pathParameters": { "webSessionId": "1414c41c-2a2d-43bb-8140-a36c8b0338b2" } }
        const expectedBody = {
            "code": "COMMON_JSON_SYNTAX_ERROR",
            "message": "The request body does not contain valid JSON",
            "details": {
                "invalid": "Unexpected token } in JSON at position 28"
            }
        }
        const expectedResponse = {
            statusCode: 400, 
            "headers": {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(expectedBody)
        }
        defferred.resolve(testData)

        const result = await putWebSessionService.put(event)
        
        expect(result).to.eql(expectedResponse)
    })

    it('Test PUT with missing websessionid null', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        sandbox.stub(s3Service, 'addToS3').returns(defferred.promise)
        const event = { body: '{"data": {"valueOne": "test one"}}', "pathParameters": { "webSessionId": null } }
        const expectedBody = {
            "code": "COMMON_JSON_SYNTAX_ERROR",
            "message": "The request body does not contain valid JSON",
            "details": {
                "invalid": "Web Session Id missing."
            }
        }
        const expectedResponse = {
            statusCode: 400, 
            "headers": {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(expectedBody)
        }
        defferred.resolve(testData)

        const result = await putWebSessionService.put(event)
        
        expect(result).to.eql(expectedResponse)
    })

    it('Test PUT with missing websessionid undefined', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        sandbox.stub(s3Service, 'addToS3').returns(defferred.promise)
        const event = { body: '{"data": {"valueOne": "test one"}}', "pathParameters": { "webSessionId": undefined } }
        const expectedBody = {
            "code": "COMMON_JSON_SYNTAX_ERROR",
            "message": "The request body does not contain valid JSON",
            "details": {
                "invalid": "Web Session Id missing."
            }
        }
        const expectedResponse = {
            statusCode: 400, 
            "headers": {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(expectedBody)
        }
        defferred.resolve(testData)

        const result = await putWebSessionService.put(event)
        
        expect(result).to.eql(expectedResponse)
    })

    it('Test PUT with invalid websessionid ', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        sandbox.stub(s3Service, 'addToS3').returns(defferred.promise)
        const event = { body: '{"data": {"valueOne": "test one"}}', "pathParameters": { "webSessionId": "1234" } }
        const expectedBody = {
            "code": "COMMON_JSON_SYNTAX_ERROR",
            "message": "The request body does not contain valid JSON",
            "details": {
                "invalid": "Web Session Id has an invalid format."
            }
        }
        const expectedResponse = {
            statusCode: 400, 
            "headers": {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(expectedBody)
        }
        defferred.resolve(testData)

        const result = await putWebSessionService.put(event)
        
        expect(result).to.eql(expectedResponse)
    })
})
