export async function createDashboard(httpClient, name) {
  const reqBody = {
    description: `${name} dashboard description`,
    name,
    share: true,
  };
  return await httpClient.post('api/v1/default_personal/dashboard', reqBody);
}
