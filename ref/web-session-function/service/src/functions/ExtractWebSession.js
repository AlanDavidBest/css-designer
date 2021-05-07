'use strict'

const uuidChecker = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")

const extractWebSessionId = (event) => { 
  const webSessionId = event.pathParameters.webSessionId
  if (webSessionId === null || webSessionId === undefined) {
    throw Error('Web Session Id missing.')
  }

  if (!uuidChecker.test(webSessionId)) {
    throw Error('Web Session Id has an invalid format.')
  }
  
  return webSessionId
}

export {extractWebSessionId}
