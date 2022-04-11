const express = require('express');
const aws = require('aws-sdk');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = 'us-west-2';

router.get('/sign-s3', requireAuth, asyncHandler( async (req, res, next) => {
  console.log('signing...');
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };
    
  s3.getSignedUrl('putObject', s3Params, (err,data) => {
    if( err ){
      console.log(err);
      return next(err);
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    res.json(returnData); 
  })
}));

module.exports = router;
