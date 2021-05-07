'use strict'
import { expect } from 'chai'
import { getWebSessionService } from '../../../src/functions/GetWebSessionService'
import { s3Service } from '../../../src/service/S3Service'
import sinon from 'sinon'
import Q from 'q'

let sandbox

describe('GetWebSession.js', () => {

    beforeEach(() => {
        global.LOG_LEVEL = 'warn'
        sandbox = sinon.sandbox.create()
    })

    afterEach(() => {
        sandbox.restore()
    })
    
    it('Test valid GET', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        sandbox.stub(s3Service, 'getFromS3').returns(testData)
        const event = { "pathParameters": { "webSessionId": "1414c41c-2a2d-43bb-8140-a36c8b0338b2" } }
        const expectedResponse = {
            statusCode: 200, 
            body: 
            {
                name: 'Test Object'
            }
        }
        const result = await getWebSessionService.get(event)

        expect(result).to.eql(expectedResponse)
    })

    it('Test GET null webSessionId', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        const event = { "pathParameters": { "webSessionId": null } }
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
        const result = await getWebSessionService.get(event)

        expect(result).to.eql(expectedResponse)
    })

    it('Test GET undefined webSessionId', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        const event = { "pathParameters": { "webSessionId": undefined } }
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
        const result = await getWebSessionService.get(event)

        expect(result).to.eql(expectedResponse)
    })

    it('Test GET invalid webSessionId', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        const event = { "pathParameters": { "webSessionId": "1234" } }
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

        const result = await getWebSessionService.get(event)

        expect(result).to.eql(expectedResponse)
    })

    it('Test GET no resource', async () => {
        const defferred = Q.defer()
        const testData = { name: 'Test Object' }
        sandbox.stub(s3Service, 'getFromS3').throws(Error(`S3Service: Unable to retreive 1414c41c-2a2d-43bb-8140-a36c8b0338b2 from S3.`))
        const event = { "pathParameters": { "webSessionId": "1414c41c-2a2d-43bb-8140-a36c8b0338b2" } }
        const expectedBody = {
            "code": "COMMON_URL_NOT_FOUND",
            "message": "URL is not valid",
            "details": {
                "invalid": "S3Service: Unable to retreive 1414c41c-2a2d-43bb-8140-a36c8b0338b2 from S3."
            }
        }
        const expectedResponse = {
            statusCode: 404, 
            "headers": {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(expectedBody)
        }

        const result = await getWebSessionService.get(event)

        expect(result).to.eql(expectedResponse)
    })
})