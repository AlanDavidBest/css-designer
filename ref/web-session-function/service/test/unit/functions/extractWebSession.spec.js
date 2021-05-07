'use strict'
import {expect} from 'chai'
import {extractWebSessionId} from '../../../src/functions/ExtractWebSession.js'

describe('ExtractWebSession.js', (done) => {
    it('Test Valid webSessionId', () => {
        global.LOG_LEVEL = 'warn'
        const expected = "1c3cb210-43e4-11e8-842f-0ed5f89f718b"
        const event = {pathParameters:{webSessionId:'1c3cb210-43e4-11e8-842f-0ed5f89f718b'}}
        
        const actual = extractWebSessionId(event)

        expect(actual, expected)

    })

    it('Test missing websessionid null', async () => {

        global.LOG_LEVEL = 'warn'
        const expected = 'Web Session Id missing.'
        const event = {pathParameters:{webSessionId:null}}

        var actual = function() {extractWebSessionId(event)}

        expect(actual.message, expected)

    })

    it('Test missing websessionid undefined', async () => {
        global.LOG_LEVEL = 'warn'
        const expected = 'Web Session Id missing.'
        const event = {pathParameters:{webSessionId:undefined}}

        var actual = function() {extractWebSessionId(event)}

        expect(actual.message, expected)
    })

    it('Test invalid websessionid ', async () => {
        global.LOG_LEVEL = 'warn'
        const expected = 'Web Session Id has an invalid format.'
        const event = {pathParameters:{webSessionId:"1234"}}

        var actual = function() {extractWebSessionId(event)}

        expect(actual.message, expected)
    })
})