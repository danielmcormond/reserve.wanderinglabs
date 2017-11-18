import _ from 'lodash';
import request from 'request-promise';
import Promise from 'bluebird';

export default class Slack {
  static notify(text) {
    console.log(text);
    if (process.env.USER === 'tiwatson') {
      return Promise.resolve();
    }
    const deliverParams = { payload: `{ "text": "RC: ${text}", "channel": "#scraperv2" }` };

    const options = {
      method: 'POST',
      url: process.env.SLACK_HOOK || 'http://example.com',
    };

    return request(_.merge(options, { form: deliverParams }));
  }
}
