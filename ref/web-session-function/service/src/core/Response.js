'use strict'

import {HTTP_STATUS} from "./HttpStatusCode";

class ResponseBuilder {
  buildResponse(httpStatus, detailMessage) { 
    var body = {
      code: httpStatus.name,
      message: httpStatus.message
    }

    if (detailMessage) {
      body.details = {
        invalid: detailMessage
      }
    }

    const response = {
      statusCode: httpStatus.returnCode,
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }

    return response;
  }

  buildCreatedResponse(httpStatus) {
    const response = {
      statusCode: httpStatus.returnCode
    }

    return response;
  }
}

const responseBuilder = new ResponseBuilder();
export {ResponseBuilder, responseBuilder}