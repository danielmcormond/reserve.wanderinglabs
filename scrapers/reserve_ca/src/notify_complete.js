import rp from 'request-promise';
import Promise from 'bluebird';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.32 Safari/537.36',
};

class NotifyComplete {
  constructor(facilityId) {
    this.facilityId = facilityId;
    this.rp = rp.defaults({ headers, followRedirect: false });
    this.base = process.env.RESERVE_API_URL;
  }

  post(runId, hash) {
    const url = `${this.base}/facilities/${this.facilityId}/availabilities/import`
    const options = {
      url: url,
      method: 'POST',
      form: {
        import: runId,
        hash
      }
    };
    return this.rp(options);
  }
}

export { NotifyComplete };
