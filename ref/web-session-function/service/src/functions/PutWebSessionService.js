'use strict'

import {s3Service} from './../service/S3Service'
import {responseBuilder} from '../core/Response'
import {extractWebSessionId} from './../functions/ExtractWebSession'
import {HTTP_STATUS} from '../core/HttpStatusCode'

class PutWebSessionService {

  async put(event) {
    try {
      var webSessionId = extractWebSessionId(event)
      if (!event.body) {
        return responseBuilder.buildResponse(HTTP_STATUS.COMMON_JSON_SYNTAX_ERROR, "Request is missing body.")
      }
      const body = JSON.parse(event.body)
      const resp = await s3Service.addToS3(webSessionId, body)
    } catch (error) {
      return responseBuilder.buildResponse(HTTP_STATUS.COMMON_JSON_SYNTAX_ERROR, error.message)
    }

    return responseBuilder.buildCreatedResponse(HTTP_STATUS.COMMON_CREATED)
  }
}

const putWebSessionService = new PutWebSessionService();
export { PutWebSessionService, putWebSessionService }
