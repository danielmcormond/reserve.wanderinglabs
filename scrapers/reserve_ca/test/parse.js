import fs from 'fs'
import _ from 'lodash'
import sinon from 'sinon';

import { Parse } from '../src/parse';

const CaFixtures = __dirname + '/../fixtures/has-availabilities.txt';
const hasAvailabilitiesTxt = fs.readFileSync(CaFixtures, { encoding: 'utf8' });

describe('Parse', () => {

  // it('matches up site numbers to site id', () => {
  //   let parseAvailabilities = new Parse(hasAvailabilitiesTxt)
  //   return parseAvailabilities.do().then((results) => {
  //     expect(_.keys(results).length).to.be.equal(93);
  //   })
  // })

  // it('parses out availabilities', () => {
  //   let parseAvailabilities = new Parse(hasAvailabilitiesTxt)

  //   expect(parseAvailabilities.parse()).to.be.instanceOf(Array);
  //   expect(parseAvailabilities.parse().length).to.equal(63);
  // })

})
