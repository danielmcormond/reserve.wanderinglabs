import puppeteer from 'puppeteer';

export default class Page {
  async launch() {
    const width = 1920;
    const height = 900;

    const headless = process.env.HEADLESS || true;
    this.browser = await puppeteer.launch({
      args: [
        // Required for Docker version of Puppeteer
        '--no-sandbox',
        '--disable-setuid-sandbox',
        // This will write shared memory files into /tmp instead of /dev/shm,
        // because Docker’s default for /dev/shm is 64MB
        '--disable-dev-shm-usage',
        `--window-size=${width},${height}`,
      ],
      defaultViewport: { width, height, deviceScaleFactor: 1 },
      headless,
    });

    this.page = await this.browser.newPage();
    // const version = await this.page.browser().version();
  }

  async close() {
    await this.browser.close();
  }

  async search({ parkName, arrivalDate }) {
    await this.page.setRequestInterception(true);
    this.page.on('request', (interceptedRequest) => {
      const reqUrl = interceptedRequest.url();

      // const postData = interceptedRequest.postData();
      // if (reqUrl.includes('Facilities')) {
      //   console.log({ reqUrl, postData });
      // }

      if (
        reqUrl.includes('AdvanceMapImageGenerator')
        || reqUrl.includes('cali-content.usedirect.com/images')
        || reqUrl.includes('cali-content.usedirect.com/Images')
        || reqUrl.includes('cali-content.usedirect.com/themes')
        || reqUrl.includes('cali-content.usedirect.com/CommonThemes')
        || reqUrl.includes('fonts.googleapis.com')
        || reqUrl.endsWith('.png')
        || reqUrl.includes('bam.nr-data.net')
        || reqUrl.includes('gstatic')
        || reqUrl.includes('google.com/recaptcha')
        || reqUrl.includes('google-analytics.com')
        || reqUrl.includes('apis.google.com')
        || reqUrl.includes('bootstrapcdn')
        || reqUrl.includes('CaliforniaWebHome/images')
        || reqUrl.includes('CaliforniaWebHome/styles')
        || reqUrl.endsWith('.css')
      ) {
        interceptedRequest.abort();
      } else {
        interceptedRequest.continue();
      }
    });

    const url = 'https://www.reservecalifornia.com/CaliforniaWebHome/Default.aspx';
    await this.page.goto(url, { waitUntil: 'networkidle2' });
    await this.page.type('#txtSearchparkautocomplete', parkName);
    await Promise.all([
      this.page.waitFor(1000),
      await this.page.keyboard.press('ArrowDown'),
      await this.page.keyboard.press('Enter'),
    ]);

    await this.page.click('#mainContent_txtArrivalDate');
    await this.page.type('#mainContent_txtArrivalDate', arrivalDate);

    await this.page.keyboard.press('Enter');

    await this.page.select('#ddlHomeNights', '1');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');

    await Promise.all([
      this.page.keyboard.press('Enter'),
      this.page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
  }

  async facility({ parkId, facilityId }) {
    await Promise.all([
      // eslint-disable-next-line no-shadow, no-undef
      this.page.evaluate(({ facilityId, parkId }) => fnGotoUnitlevel(facilityId, parkId), {
        facilityId,
        parkId,
      }),
      this.page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
  }

  async gridExpand() {
    // eslint-disable-next-line no-undef
    await this.page.evaluate(() => fnUnitgridChangeLargesize());
    // this.page.click('#aUnitLarge');
    await this.page.waitFor(1000);
  }

  async gridDate() {
    return this.page.evaluate(
      // eslint-disable-next-line no-undef
      () => document.querySelectorAll('#mainContent_txtDateRange')[0].value,
    );
  }

  async grids() {
    let lastDate = null;
    const resultPairs = {};

    while (true) {
      const dateStart = await this.gridDate();
      // console.log('dateStart', lastDate, dateStart);
      if (dateStart === lastDate) {
        break;
      }
      lastDate = dateStart;
      const pageAvails = await this.grid();
      pageAvails.forEach((availability) => {
        resultPairs[availability[1]] = resultPairs[availability[1]] || [];
        if (resultPairs[availability[1]].indexOf(availability[0]) < 0) {
          resultPairs[availability[1]].push(availability[0]);
        }
      });

      // await this.page.screenshot({
      //   path: `tmp/${facilityId}_${dateStart.replace(/\//g, '_')}.png`,
      // });
      await this.page.evaluate(() => fnNextDays());
      await this.page.waitFor(1000);
    }
    return Promise.resolve(resultPairs);
  }

  async grid() {
    return this.page.evaluate(() => [...document.querySelectorAll('.blue_brd_box')].reduce((avails, elem) => {
      const onclick = elem.getAttribute('onclick');
      if (onclick.includes('is_available=true')) {
        const unit = onclick.match(/unit_id=(.*?)\&/)[1];
        const day = onclick.match(/arrival_date=(.*?)\s/)[1];
        avails.push([unit, day]);
      }
      return avails;
    }, []));
  }
}
