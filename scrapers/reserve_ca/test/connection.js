import fs from 'fs'
import _ from 'lodash'
import sinon from 'sinon';

import { Connection } from '../src/connection';
import { Parse } from '../src/parse';

describe('Connection', () => {

  it('matches up site numbers to site id', () => {
    let connection = new Connection()
    return connection.setSession().then((session) => {
      return connection.grid().then((gresults) => {
        // console.log('grid', gresults.body.d);
        var result_string = gresults.body.d;
        return new Parse(result_string).do().then((matches) => {
          //console.log('matches', matches);

          return connection.nextDate().then((unused) => {
            console.log('NextDate', unused.body);

            return connection.grid().then((gresults) => {
              var result_string = gresults.body.d;
              return new Parse(result_string).do().then((matches) => {
                //console.log('matches 2', matches);

                expect(_.keys(session).length).to.be.equal(1);
              })
            })
          })
        })
      })
    })
  })

  // it('parses out availabilities', () => {
  //   let parseAvailabilities = new Parse(hasAvailabilitiesTxt)

  //   expect(parseAvailabilities.parse()).to.be.instanceOf(Array);
  //   expect(parseAvailabilities.parse().length).to.equal(63);
  // })

})
