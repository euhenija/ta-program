'use strict';

module.exports.getConfig = () => {
  const environment = process.env.ENVIRONMENT || 'local';
  const { LOCAL_USER_LOGIN, LOCAL_USER_PASSWORD, WEB_USER_LOGIN, WEB_USER_PASSWORD } = process.env;
  const config = {
    local: {
      environment,
      baseUrl: 'http://localhost:8080/ui/#login',
      user: {
        login: LOCAL_USER_LOGIN,
        password: LOCAL_USER_PASSWORD,
      },
    },
    web: {
      environment,
      baseUrl: 'https://rp.epam.com/ui/#login',
      user: {
        login: WEB_USER_LOGIN,
        password: WEB_USER_PASSWORD,
      },
    },
  };
  return config[`${environment}`];
};
