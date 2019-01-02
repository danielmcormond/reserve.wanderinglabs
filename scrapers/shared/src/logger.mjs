import CloudWatchLogger from "cloudwatch-logger";
import moment from "moment";

const logStreamName = moment().format("YY_MM_DD_HH_mm_ss");
const logGroupName = `${process.env.name}-${process.env.NODE_ENV}`;

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID_WL,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_WL,
  region: process.env.AWS_REGION,
  logGroupName,
  logStreamName
};

const logger = new CloudWatchLogger(config);
export default logger;
