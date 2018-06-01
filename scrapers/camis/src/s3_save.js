import AWS from 'aws-sdk';
import Promise from 'bluebird';

AWS.config.setPromisesDependency(Promise);

class S3Save {
  constructor(filename) {
    this.filename = filename

    AWS.config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_WL,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_WL,
    };
  }

  do(text) {
    console.log('s3', this.filename, process.env.AWS_BUCKET)
    let s3 = new AWS.S3();
    let params = {
      Bucket: process.env.AWS_BUCKET,
      Key: this.filename,
      Body: text,
      ACL: 'public-read'
    };
    return s3.putObject(params).promise();
  }
}

export { S3Save };
