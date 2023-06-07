export function getConfig(environment) {
  const config = {
    local: {
      environment,
      baseUrl: 'http://localhost:8080/',
      apiToken: '5bc3a7a8-d037-4571-b24d-e6a100c477a4',
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
}
