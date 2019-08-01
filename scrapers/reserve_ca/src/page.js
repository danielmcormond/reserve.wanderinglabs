import puppeteer from 'puppeteer';

export default class Page {
  async launch() {
    const width = 1920;
    const height = 900;

    const headless = process.env.HEADLESS || false;
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

    console.log('Headless', headless);
    this.page = await this.browser.newPage();
    const version = await this.page.browser().version();
    console.log('Version', version);
  }

  async close() {
    await this.browser.close();
  }

  async search({
    parkId, facilityId, parkName, arrivalDate,
  }) {
    const url = 'https://www.reservecalifornia.com/CaliforniaWebHome/Default.aspx';
    await this.page.goto(url, { waitUntil: 'networkidle2' });
    // await this.page.screenshot({ path: `tmp/${facilityId}_1.png` });

    // hdnsearchplaceid
    await this.page.click('#txtSearchparkautocomplete');
    await this.page.keyboard.type('Emerald Bay SP', { delay: 100 });

    await this.page.screenshot({ path: `tmp/${facilityId}_1.png` });
    // await this.page.type('#txtSearchparkautocomplete', parkName);
    // await this.page.waitFor(5000);
    await this.page.screenshot({ path: `tmp/${facilityId}_2.png` });
    await Promise.all([
      this.page.waitForSelector('.ui-menu-item > a'),
      this.page.click('.ui-menu-item > a'),
    ]);

    // await this.page.evaluate(({ parkId }) => document.querySelectorAll('input[id=hdnsearchplaceid]')[0].value = parkId, {
    //   parkId,
    // })

    await this.page.click('#mainContent_txtArrivalDate');
    await this.page.type('#mainContent_txtArrivalDate', arrivalDate);
    await this.page.screenshot({ path: `tmp/${facilityId}_2.png` });

    await this.page.keyboard.press('Enter');

    await this.page.select('#ddlHomeNights', '1');
    await this.page.keyboard.press('Tab');
    await this.page.keyboard.press('Tab');

    await Promise.all([
      this.page.keyboard.press('Enter'),
      this.page.screenshot({ path: `tmp/${facilityId}_3.png` }),
      this.page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
  }

  async facility({ parkId, facilityId }) {
    // const parkFacilityString = `(${facilityId},${parkId})`;
    // const facility = await this.page.evaluateHandle(
    //   pfs => [...document.querySelectorAll('.col-md-4 > a')].filter(elem => elem.getAttribute('onclick').includes(pfs))[0],
    //   parkFacilityString,
    // );

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
    const width = await this.page.evaluate(() => $(window).width());
    const matchMedia = await this.page.evaluate(() => window.matchMedia('(min-width:1920px)').matches );
    const hdmaximumdate = await this.page.evaluate(() => $("#hdmaximumdate").val());
    const Hidscreenresolution = await this.page.evaluate(() => $("#mainContent_Hidscreenresolution").val());
    console.log({ width, matchMedia, hdmaximumdate, Hidscreenresolution });


    // eslint-disable-next-line no-undef
    await this.page.evaluate(() => fnUnitgridChangeLargesize());
    // this.page.click('#aUnitLarge');
    await this.page.waitFor(1000);
  }

  async gridDate() {
    return this.page.evaluate(
      () => document.querySelectorAll('#mainContent_txtDateRange')[0].value,
    );
  }

  async grids(facilityId) {
    let lastDate = null;
    const resultPairs = {};

    while (true) {
      const dateStart = await this.gridDate();
      console.log('dateStart', lastDate, dateStart);
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

      await this.page.screenshot({
        path: `tmp/${facilityId}_${dateStart.replace(/\//g, '_')}.png`,
      });
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
