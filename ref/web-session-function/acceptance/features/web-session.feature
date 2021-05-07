Feature: user handling
    Background:
        Given the application host is on "localhost"
        And the port is "3000"
        And the protocol is "http"
        And the application is running

    Scenario: Attempt a valid Put
        Given I set body to {"cucumber":"test"}
        When I PUT /global/web-session/v1/1414c41c-2a2d-43bb-8140-a36c8b0338b2
        Then response code should be 201
        And response header has a content type of "application/json"

    Scenario: Attempt a Put with malformed body
        Given I set body to "This is not JSON"
        When I PUT /global/web-session/v1/1414c41c-2a2d-43bb-8140-a36c8b0338b2
        Then response code should be 400
        And response header has a content type of "application/json"
        And response body is
            """
            {
                "code": "COMMON_JSON_SYNTAX_ERROR",
                "message": "The request body does not contain valid JSON",
                "details":
                {
                    "invalid": "Unexpected token T in JSON at position 0"
                }
            }
            """

    Scenario: Attempt a Put without body
        When I PUT /global/web-session/v1/1414c41c-2a2d-43bb-8140-a36c8b0338b2
        Then response code should be 400
        And response header has a content type of "application/json"
        And response body is
            """
            {
                "code": "COMMON_JSON_SYNTAX_ERROR",
                "message": "The request body does not contain valid JSON",
                "details":
                {
                    "invalid": "Request is missing body."
                }
            }
            """

    Scenario: Attempt a Put with invalid web session id
        When I PUT /global/web-session/v1/1414c41c-2a2d-43bb-8140
        Then response code should be 400
        And response header has a content type of "application/json"
        And response body is
            """
            {
                "code": "COMMON_JSON_SYNTAX_ERROR",
                "message": "The request body does not contain valid JSON",
                "details":
                {
                    "invalid": "Web Session Id has an invalid format."
                }
            }
            """

    Scenario: Attempt a Put with a missing web session id
        When I PUT /global/web-session/v1/
        Then response code should be 404
        And response body is
            """
            {
                "statusCode": 404,
                "error": "Serverless-offline: route not found.",
                "currentRoute": "put - /global/web-session/v1",
                "existingRoutes": [ 
                    "get - /global/web-session/v1/{webSessionId}",
                    "put - /global/web-session/v1/{webSessionId}"
                ]
            }
            """

    Scenario: Attempt a Get with invalid web session id
        When I GET /global/web-session/v1/1414c41c-2a2d-43bb-8140
        Then response code should be 400
        And response header has a content type of "application/json"
        And response body is
            """
            {
                "code": "COMMON_JSON_SYNTAX_ERROR",
                "message": "The request body does not contain valid JSON",
                "details":
                {
                    "invalid": "Web Session Id has an invalid format."
                }
            }
            """

    Scenario: Attempt a valid Get
        Given I set body to 
        """
            {
                "ppcUuid":"159edc61-0bb9-44e0-9ace-4b3a4c4404ed",
                "ppcKeywordId":"s7zQxZ6t0",
                "ppcCreativeId":"197787654377",
                "ppcKeywordText":"dsa",
                "ppcMatchType":"b",
                "ppcDevice":"m",
                "ppcTrackerId":"nixe9oroo0",
                "deviceType": "Mobile"
            }
        """
        And I PUT /global/web-session/v1/1414c41c-2a2d-43bb-8140-a36c8b0338b2
        When I GET /global/web-session/v1/1414c41c-2a2d-43bb-8140-a36c8b0338b2
        Then response code should be 200
        And response header has a content type of "application/json"
        And response body is
        """
            {
                "ppcUuid":"159edc61-0bb9-44e0-9ace-4b3a4c4404ed",
                "ppcKeywordId":"s7zQxZ6t0",
                "ppcCreativeId":"197787654377",
                "ppcKeywordText":"dsa",
                "ppcMatchType":"b",
                "ppcDevice":"m",
                "ppcTrackerId":"nixe9oroo0",
                "deviceType": "Mobile"
            }
        """

    Scenario: Attempt a Get for missing data
        When I GET /global/web-session/v1/1414c41c-2a2d-43bb-8140-a36c8b0338b5
        Then response code should be 404
        And response header has a content type of "application/json"
        And response body is
            """
            {
                "code": "COMMON_URL_NOT_FOUND",
                "message": "URL is not valid",
                "details":
                {
                    "invalid": "The specified key does not exist"
                }
            }
            """

    Scenario: Attempt a Get with a missing web session id
        When I GET /global/web-session/v1/
        Then response code should be 404
        And response body is
            """
            {
                "statusCode": 404,
                "error": "Serverless-offline: route not found.",
                "currentRoute": "get - /global/web-session/v1",
                "existingRoutes": [ 
                    "get - /global/web-session/v1/{webSessionId}",
                    "put - /global/web-session/v1/{webSessionId}"
                ]
            }
            """
