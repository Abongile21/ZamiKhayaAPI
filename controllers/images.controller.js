const fileUpload = require('express-fileupload')
const AWS = require('aws-sdk');
require("dotenv").config()
const express = require('express');

const app = express();

app.use(fileUpload())


exports.UploadImage = async (fileImage) => {

    AWS.config.update({
        accessKeyId: process.env.AWS_AKEY,
        secretAccessKey: process.env.AWS_SKEY,
        region: process.env.AWS_REGION
    })

    const s3 = new AWS.S3();

    const fileContent = Buffer.from(fileImage.data, "Binary");

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: fileImage.name,
        Body: fileContent
    }

   return await s3.upload(params).promise()
}