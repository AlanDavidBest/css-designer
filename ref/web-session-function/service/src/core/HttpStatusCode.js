'use strict'

const HTTP_STATUS = {
    COMMON_OK : Object.freeze({
        name: "COMMON_OK",
        returnCode: 200,
        message: "OK"
    }),
    COMMON_CREATED : Object.freeze({
        name: "COMMON_CREATED",
        returnCode: 201,
        message: "CREATED"
    }),
    COMMON_JSON_SYNTAX_ERROR : Object.freeze({
        name: "COMMON_JSON_SYNTAX_ERROR",
        returnCode: 400,
        message: "The request body does not contain valid JSON"
    }),
    COMMON_MISSING_HEADER : Object.freeze({
        name: "COMMON_MISSING_HEADER",
        returnCode: 400,
        message: "The header has missing mandatory fields"
    }),
    COMMON_NOT_AUTHENTICATED : Object.freeze({
        name: "COMMON_NOT_AUTHENTICATED",
        returnCode: 401,
        message: "The client is not authenticated or authentication failed"
    }),
    COMMON_AUTHORIZATION_FAILED : Object.freeze({
        name: "COMMON_AUTHORIZATION_FAILED",
        returnCode: 403,
        message: "Read-only properties are not allowed for create or update operations"
    }),
    COMMON_URL_NOT_FOUND : Object.freeze({
        name: "COMMON_URL_NOT_FOUND",
        returnCode: 404,
        message: "URL is not valid"
    }),
    COMMON_METHOD_NOT_ALLOWED : Object.freeze({
        name: "COMMON_METHOD_NOT_ALLOWED",
        returnCode: 405,
        message: ""
    }),
    COMMON_SERVICE_ERROR: Object.freeze({
        name: "COMMON_SERVICE_ERROR",
        returnCode: 500,
        message: "There was an unexpected server error while processing the request."
    })
}

Object.freeze(HTTP_STATUS)

module.exports.HTTP_STATUS = HTTP_STATUS