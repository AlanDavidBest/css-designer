'use strict'

import {s3Dao} from './../dao/S3Dao'

/** 
 * S3Service provides the ability to acceess and manipulate S3 Objects. 
*/
class S3Service {

    /**
     * Get the obnject associated with the provided key from S3.
     * @param {String} key The path of the object to get from the S3 bucket.
     * @return {String} s3Object The s3Object associated with the provided key. 
     * @throws Error If there is a problem retreiving the S3Object.
     */
    async getFromS3(key) {
        const s3Response = await s3Dao.get(key)
        if (s3Response && s3Response.Body) {
            return s3Response.Body.toString()
        } else {
            throw Error(`S3Service: Unable to retreive ${key} from S3.`, s3Response)
        }
    }

    /**
     * Add/Update an object to S3.
     * @param {String} key The key of the S3Object to create or update.
     * @param {Object} body The body to add.
     * @return {String} s3Response The s3Response. 
     * @throws Error If there is a problem adding the S3Object. 
     */
    async addToS3(key, body) {
        const s3Response = await s3Dao.put(key, body)
        if (s3Response && s3Response.ETag) {
            return s3Response
        } else {
            throw Error(`S3Service: Unable to add ${key} to S3.`, s3Response)
        }
    }
}

const s3Service = new S3Service()
export {S3Service, s3Service}