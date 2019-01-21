import graylog2 from "graylog2";

const logger = new graylog2.graylog({
  servers: [{ host: process.env.GRAYLOG_IP, port: 12201 }],
  hostname: `scraper-${process.env.NODE_ENV}`,
  facility: process.env.name,
  bufferSize: 1350
});

export default logger;
