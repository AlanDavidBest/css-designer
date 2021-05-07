'use strict'

import Q from 'q'

/** 
 * S3Dao provides functionality to interact with S3.
*/
class S3Dao {

    /**
     * Get the object from S3 of the provided name.
     * @param {String} key The name of the S3 object to retreive. 
     * @return {Promise} s3Object associated to the provided key.
     * @throws {Promise.reject} Thrown if there is an error retreiving the S3 Object.
     */
    get(key) {
        const fullKey = process.env.S3_ROOT_KEY + key
        const defferred = Q.defer()
        s3.getObject({
            Bucket: process.env.BUCKET,
            Key: fullKey
        }, (error, data) => {
            if (error) defferred.reject(error)
            else defferred.resolve(data)
        })
        return defferred.promise
    }

    /**
     * Put an object into S3 .
     * @param {String} key The name of the S3 object to create/update.
     * @param {Object} body The body to place into S3. 
     * @return {Promise} s3Object response.
     * @throws {Promise.reject} Thrown if there is an error adding the Object to S3.
     */
    put(key, body) {
        const defferred = Q.defer()
        const fullKey = process.env.S3_ROOT_KEY + key
        console.log("Bucket: " + process.env.BUCKET)
        console.log("FullKey: " + fullKey)
        console.log("Body: " + JSON.stringify(body))
        s3.putObject({
            Bucket: process.env.BUCKET,
            Key: fullKey,
            Body: JSON.stringify(body)
        }, (error, data) => {
            if (error) {
                defferred.reject(error)
            } else {
                defferred.resolve(data)
            }
        })
        return defferred.promise
    }
}

const s3Dao = new S3Dao()
export {s3Dao, S3Dao}
