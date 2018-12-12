import CloudWatchLogger from 'cloudwatch-logger';
import moment from 'moment';

const streamName = moment().format('YY_MM_DD_HH_mm_ss');

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_WL,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_WL,
  region: process.env.AWS_REGION,
  logGroupName: process.env.AWS_LOG_GROUP,
  logStreamName: streamName,
};

console.log('yup', config)
const logger = new CloudWatchLogger(config);
export default logger;
