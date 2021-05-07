'use strict'

import {s3Service} from './../service/S3Service'
import {responseBuilder} from '../core/Response'
import {extractWebSessionId} from './../functions/ExtractWebSession'
import {HTTP_STATUS } from '../core/HttpStatusCode'

class GetWebSessionService {

  async get(event) {
    try {
      var webSessionId = extractWebSessionId(event)
      var s3Object = ""
      try {
        s3Object = await s3Service.getFromS3(webSessionId)
      } catch (error) {
        return responseBuilder.buildResponse(HTTP_STATUS.COMMON_URL_NOT_FOUND, error.message)
      }
      return {
              statusCode: 200,
              body: s3Object
             }
    } catch (error) {
      return responseBuilder.buildResponse(HTTP_STATUS.COMMON_JSON_SYNTAX_ERROR, error.message)
    }
  }

}

const getWebSessionService = new GetWebSessionService();
export {GetWebSessionService, getWebSessionService}
