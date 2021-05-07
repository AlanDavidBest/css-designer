'use strict'

import {s3Service} from './../service/S3Service'
import {responseBuilder} from '../core/Response'
import {putWebSessionService} from './../functions/PutWebSessionService'
import {getWebSessionService} from './../functions/GetWebSessionService'
import {HTTP_STATUS} from '../core/HttpStatusCode';

const putWebSession = (event, context, callback) => {
  putWebSessionService.put(event)
      .then( (response)  => {
        callback(null, response)
      })
      .catch((error) => {
        callback(null, responseBuilder.buildResponse(HTTP_STATUS.COMMON_SERVICE_ERROR))
        })
  }
  
const getWebSession = (event, context, callback) => {
  getWebSessionService.get(event)
      .then( (response)  => {
          callback(null, response)
      })
      .catch((error) => {
        callback(null, responseBuilder.buildResponse(HTTP_STATUS.COMMON_SERVICE_ERROR))
        })
  }

export {getWebSession, putWebSession}
