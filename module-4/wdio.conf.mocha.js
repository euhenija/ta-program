const { parentConfig } = require('./wdio.conf');
console.log(parentConfig.parentConfig);

exports.config = {
  ...parentConfig,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
