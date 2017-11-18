
import index from './../src/index';
import event from './event.json';

/**
 * Mock a Lambda event
 */

const context = {
  fail: e => e,
  succeed: e => e
};

index.handler(event, context, (e, m) => {

});
