const { parentConfig } = require('./wdio.conf');

exports.config = {
  ...parentConfig,
  framework: 'jasmine',
  jasmineOpts: {
    defaultTimeoutInterval: 60000,
  },
};
