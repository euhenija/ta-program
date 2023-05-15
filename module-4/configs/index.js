'use strict';

module.exports.getConfig = (environment) => {
  const config = {
    local: {
      environment,
      baseUrl: 'http://localhost:8080/',
      user: {
        login: 'default',
        password: '1q2w3e',
      },
    },
    prod: {
      environment,
      baseUrl: 'https://rp.epam.com/',
      user: {
        login: 'user',
        password: '1q2w3e',
      },
    },
  };
  return config[`${environment}`];
};
