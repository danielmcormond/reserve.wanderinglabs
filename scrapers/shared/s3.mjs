import AWS from 'aws-sdk';

export default class S3 {
  constructor() {
    AWS.config.credentials = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID_WL,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_WL,
    };
    this.connection = new AWS.S3();
    this.bucket = process.env.AWS_BUCKET;
  }

  async put({ key, body }) {
    const params = {
      Bucket: this.bucket,
      Key: key,
      Body: body,
      ACL: 'public-read',
      ContentType: 'application/javascript',
    };
    return this.connection.putObject(params).promise();
    // await this.connection
    //   .putObject(params)
    //   .promise()
    //   .then(() => {
    //     console.log("s3Put COMPLETE", filename);
    //     return Promise.resolve();
    //   });
  }
}
